export interface IUseMessagesReturn {
    sendMessageInConversation: (value: string) => Promise<void>;
    getMessages: () => Promise<void>;
}