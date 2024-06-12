export interface MessageInterface {
  senderUid: string,
  content: string,
  timeStamp: String,
  status: 'Sent' | 'Received' | 'Read',
}
