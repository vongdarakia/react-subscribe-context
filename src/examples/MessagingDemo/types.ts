export interface User {
    id: string;
    name: string;
}

export interface MessageInfo {
    content: string;
    dateSeen?: string;
    dateSent: string;
    dateDelivered?: string;
    id: string;
    senderName: string;
    receiverName: string;
    status: "sent" | "delivered" | "seen";
}
