export interface MessageInterface {
  senderUid: string,
  content: string,
  timeStamp: Date,
  status: 'Sent' | 'Received' | 'Read',
}
