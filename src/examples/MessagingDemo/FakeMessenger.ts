import axios from "axios";
import { EVT_MESSAGE_FROM_FRIEND } from "constants/event-names";
import { EventEmitter } from "events";
import { MessageInfo } from "examples/MessagingDemo/types";

interface SendMessageArgs {
    text: string;
    senderName: string;
    receiverName: string;
}

interface SendFakeMessageToUserArgs {
    authorName: string;
    text?: string;
    userName: string;
}

interface ConversationByReceiver {
    [receiverName: string]: MessageInfo[];
}

export interface Quote {
    text: string;
    author: string;
}

export interface Conversation {
    name: string;
    recentMessage?: MessageInfo;
}

let quotes: Quote[] = [];
// let numAuthors = 0;
let quotesByName: { [name: string]: Quote[] } = {};
const conversationByReceiver: ConversationByReceiver = {};
const usedQuotesCache: { [key: string]: { [index: number]: true } } = {};
const emitter = new EventEmitter();

export class FakeMessenger {
    // sendMessage
    static async sendMessage({
        receiverName,
        senderName,
        text,
    }: SendMessageArgs): Promise<MessageInfo> {
        const dateSent = new Date().toISOString();
        const messageInfo: MessageInfo = {
            content: text,
            dateSent,
            id: `${senderName}${dateSent}`,
            senderName,
            receiverName,
            status: "sent",
        };

        if (conversationByReceiver[receiverName]) {
            conversationByReceiver[receiverName].push(messageInfo);
        } else {
            conversationByReceiver[receiverName] = [messageInfo];
        }

        console.log("huh!?");
        FakeMessenger.sendFakeMessageToUser({ authorName: receiverName, userName: senderName });

        return messageInfo;
    }

    static async getMessages(contactName: string): Promise<MessageInfo[]> {
        console.log("grabbing messages");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    conversationByReceiver[contactName]
                        ? conversationByReceiver[contactName].slice(0)
                        : []
                );
            }, Math.floor(Math.random() * 1000));
        });
    }

    static async getConversations(): Promise<Conversation[]> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (quotes.length === 0) {
                    // contactNames = Object.keys(quotesByName);
                    // return resolve(quotesByName);

                    try {
                        const response = await axios.get("https://type.fit/api/quotes");

                        quotes = response.data;

                        console.log(quotes);

                        quotes.forEach((quote) => {
                            if (quotesByName[quote.author]) {
                                quotesByName[quote.author].push(quote);
                            } else {
                                quotesByName[quote.author] = [quote];
                            }
                        });

                        quotes.sort((a, b) => {
                            const [aLength, bLength] = [
                                quotesByName[a.author] ? quotesByName[a.author].length : 0,
                                quotesByName[b.author] ? quotesByName[b.author].length : 0,
                            ];

                            if (aLength === bLength) {
                                return 0;
                            }

                            return aLength > bLength ? -1 : 1;
                        });

                        quotesByName = quotes.reduce((acc, quote) => {
                            acc[quote.author] = quotesByName[quote.author];

                            return acc;
                        }, {} as typeof quotesByName);

                        delete quotesByName["null"];

                        // conversations
                        // numAuthors = Object.keys(quotesByName).length;
                        // resolve(response.data);
                    } catch (err) {
                        reject(err);
                    }
                }

                const contactNames = Object.keys(quotesByName);
                const conversations = contactNames.map(
                    (name): Conversation => ({
                        name,
                        recentMessage:
                            conversationByReceiver[name] &&
                            conversationByReceiver[name][conversationByReceiver[name].length - 1]
                                ? conversationByReceiver[name][
                                      conversationByReceiver[name].length - 1
                                  ]
                                : undefined,
                    })
                );

                conversations.sort((a, b) => {
                    if (a.recentMessage === b.recentMessage) {
                        return 0;
                    }

                    if (a.recentMessage && b.recentMessage) {
                        if (a.recentMessage?.dateSent > b.recentMessage?.dateSent) {
                            return -1;
                        }
                        if (a.recentMessage?.dateSent < b.recentMessage?.dateSent) {
                            return 1;
                        }
                    }

                    return a.recentMessage ? -1 : 1;
                });

                // console.log(conversationByReceiver[contactNames[0]]);
                resolve(conversations);
            }, Math.floor(Math.random() * 1000));
        });
    }

    static getRandomQuote(authorName: string): string {
        console.log("quote from", authorName);
        let randomQuoteIndex = Math.floor(Math.random() * quotesByName[authorName].length);
        let randomQuote = quotesByName[authorName][randomQuoteIndex].text;
        const usedUpAllQuotes =
            usedQuotesCache[authorName] &&
            Object.keys(usedQuotesCache[authorName]).length >= quotesByName[authorName].length;

        if (usedUpAllQuotes) {
            console.log("used up quotes", quotesByName[authorName].length);
            delete usedQuotesCache[authorName];
        }

        while (usedQuotesCache[authorName] && usedQuotesCache[authorName][randomQuoteIndex]) {
            randomQuoteIndex = Math.floor(Math.random() * quotesByName[authorName].length);
            randomQuote = quotesByName[authorName][randomQuoteIndex].text;
        }

        usedQuotesCache[authorName] = { ...usedQuotesCache[authorName], [randomQuoteIndex]: true };

        return randomQuote;
    }

    static async sendFakeMessageToUser({
        authorName,
        text,
        userName,
    }: SendFakeMessageToUserArgs): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomQuote = !!text ? text : FakeMessenger.getRandomQuote(authorName);
                const dateSent = new Date().toISOString();
                const messageInfo: MessageInfo = {
                    content: randomQuote,
                    dateSent,
                    id: `${authorName}${dateSent}`,
                    senderName: authorName,
                    receiverName: userName,
                    status: "sent",
                };

                console.log("message generated", messageInfo);

                if (conversationByReceiver[authorName]) {
                    conversationByReceiver[authorName].push(messageInfo);
                } else {
                    conversationByReceiver[authorName] = [messageInfo];
                }
                emitter.emit(EVT_MESSAGE_FROM_FRIEND, messageInfo);
                resolve();
            }, Math.floor(1000 + Math.random() * 2000));
        });
    }

    static getEmitter() {
        return emitter;
    }
    // broadcastMessage
}
