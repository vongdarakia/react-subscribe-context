import axios from "axios";
import { EVT_MESSAGE_FROM_FRIEND, EVT_MESSAGE_READ_BY_FRIEND } from "constants/event-names";
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
    messageToRead?: MessageInfo;
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
    numUnreadMessages: number;
    recentMessage?: MessageInfo;
}

let quotes: Quote[] = [];
let quotesByName: { [name: string]: Quote[] } = {};
let isPopularModeOn = false;
const conversationByReceiver: ConversationByReceiver = {};
const usedQuotesCache: { [key: string]: { [index: number]: true } } = {};
const emitter = new EventEmitter();

export class FakeMessenger {
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

        FakeMessenger.sendFakeMessageToUser({
            authorName: receiverName,
            userName: senderName,
            messageToRead: messageInfo,
        });

        return messageInfo;
    }

    static async getMessages(contactName: string): Promise<MessageInfo[]> {
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

    static async getConversations(senderName: string): Promise<Conversation[]> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (quotes.length === 0) {
                    try {
                        const response = await axios.get("https://type.fit/api/quotes");

                        quotes = response.data;

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
                    } catch (err) {
                        reject(err);
                    }
                }

                const contactNames = Object.keys(quotesByName);
                const conversations = contactNames.map(
                    (name): Conversation => ({
                        name,
                        numUnreadMessages: conversationByReceiver[name]
                            ? conversationByReceiver[name].reduce(
                                  (acc, c) =>
                                      c.status !== "seen" && c.senderName !== senderName
                                          ? acc + 1
                                          : acc,
                                  0
                              )
                            : 0,
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

                resolve(conversations);
            }, Math.floor(Math.random() * 1000));
        });
    }

    static getRandomQuote(authorName: string): string {
        let randomQuoteIndex = Math.floor(Math.random() * quotesByName[authorName].length);
        let randomQuote = quotesByName[authorName][randomQuoteIndex].text;
        const usedUpAllQuotes =
            usedQuotesCache[authorName] &&
            Object.keys(usedQuotesCache[authorName]).length >= quotesByName[authorName].length;

        if (usedUpAllQuotes) {
            delete usedQuotesCache[authorName];
        }

        while (usedQuotesCache[authorName] && usedQuotesCache[authorName][randomQuoteIndex]) {
            randomQuoteIndex = Math.floor(Math.random() * quotesByName[authorName].length);
            randomQuote = quotesByName[authorName][randomQuoteIndex].text;
        }

        usedQuotesCache[authorName] = { ...usedQuotesCache[authorName], [randomQuoteIndex]: true };

        return randomQuote;
    }

    static async simulateReceiverReadMessage(messageToRead: MessageInfo): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const readMessage: MessageInfo = { ...messageToRead, status: "seen" };

                const dbMessageInfo = conversationByReceiver[messageToRead.receiverName].find(
                    (messageInfo) => {
                        return messageInfo.id === messageToRead.id;
                    }
                );

                if (dbMessageInfo) {
                    dbMessageInfo.status = "seen";
                    emitter.emit(EVT_MESSAGE_READ_BY_FRIEND, readMessage);
                } else {
                    console.error("Couldn't read message", messageToRead);
                }
                resolve();
            }, Math.floor(Math.random() * 500 + 500));
        });
    }

    static async userReadMessages(friendName: string) {
        if (conversationByReceiver[friendName]) {
            conversationByReceiver[friendName] = conversationByReceiver[friendName].map(
                (messageInfo) => {
                    if (messageInfo.status !== "seen" && messageInfo.senderName === friendName) {
                        return { ...messageInfo, status: "seen" };
                    }
                    return messageInfo;
                }
            );
        }
    }

    static async sendFakeMessageToUser({
        authorName,
        text,
        userName,
        messageToRead,
    }: SendFakeMessageToUserArgs): Promise<void> {
        if (messageToRead) {
            await FakeMessenger.simulateReceiverReadMessage(messageToRead);
        }

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

                if (conversationByReceiver[authorName]) {
                    conversationByReceiver[authorName].push(messageInfo);
                } else {
                    conversationByReceiver[authorName] = [messageInfo];
                }
                emitter.emit(EVT_MESSAGE_FROM_FRIEND, messageInfo);
                resolve();
            }, Math.floor(1000 + Math.random() * 1000));
        });
    }

    static async simulatePopularMode(userName: string, numMessagesToSend = 25) {
        if (!isPopularModeOn) {
            const authors = Object.keys(quotesByName);
            let counter = 0;

            let intervalId = setInterval(() => {
                const authorName = authors[Math.floor(Math.random() * authors.length)];
                FakeMessenger.sendFakeMessageToUser({ authorName, userName });

                if (counter++ === numMessagesToSend) {
                    clearInterval(intervalId);
                    isPopularModeOn = false;
                }
            }, 500);

            isPopularModeOn = true;
        }
    }

    static createMessage() {}

    static getEmitter() {
        return emitter;
    }
}
