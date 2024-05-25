export interface FrameSocketInterface {
  typeOf: 'userLogIn' | 'userLogOut' | 'messageReceived';
  content: string | FrameMessageSocketInterface;
}

export interface FrameMessageSocketInterface {
  chatUID: string;
  userSenderUID: string;
  content: string;
}
