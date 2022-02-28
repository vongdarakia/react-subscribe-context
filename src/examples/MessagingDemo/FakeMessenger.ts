import axios from "axios";
import { EventEmitter } from "events";
import { MessageInfo } from "examples/MessagingDemo/types";

interface SendMessageArgs {
    text: string;
    senderId: string;
    receiverId: string;
}

interface MessageCache {
    [receiverId: string]: MessageInfo[];
}

export interface Quote {
    text: string;
    author: string;
}

export interface Conversation {
    name: string;
    firstMessage?: string;
}

let quotes: Quote[] = [];
const quotesByName: { [name: string]: Quote[] } = {};
const messageCache: MessageCache = {};
const emitter = new EventEmitter();

export class FakeMessenger {
    // sendMessage
    static async sendMessage({
        receiverId,
        senderId,
        text,
    }: SendMessageArgs): Promise<MessageInfo> {
        const dateSent = new Date().toISOString();
        const messageInfo: MessageInfo = {
            content: text,
            dateSent,
            id: `${senderId}${dateSent}`,
            senderId: senderId,
            status: "sent",
        };

        if (messageCache[receiverId]) {
            messageCache[receiverId].push(messageInfo);
        } else {
            messageCache[receiverId] = [messageInfo];
        }
        // this.emitter

        return messageInfo;
    }

    static async getMessages(contactId: string): Promise<MessageInfo[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(messageCache[contactId] || []);
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

                        delete quotesByName["null"];

                        // resolve(response.data);
                    } catch (err) {
                        reject(err);
                    }
                }

                const contactNames = Object.keys(quotesByName);

                resolve(
                    contactNames.map(
                        (name): Conversation => ({
                            name,
                            firstMessage:
                                messageCache[name] && messageCache[name][0]
                                    ? messageCache[name][0].content
                                    : undefined,
                        })
                    )
                );
            }, Math.floor(Math.random() * 1000));
        });
    }
    // broadcastMessage
}
