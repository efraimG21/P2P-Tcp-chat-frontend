import {UserInterface} from "./user-interface";

export interface FrameSocketInterface {
  typeOf: 'userLogIn' | 'userLogOut' | 'sendMessage' | 'messageReceived' | 'messageRead';
  content: string | FrameMessageSocketInterface | UserInterface;
}

export interface FrameMessageSocketInterface {
  chatUID: string;
  uidReceived: string;
  content: string;
}
