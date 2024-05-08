import { HttpException, HttpStatus } from '@nestjs/common';

type MessageType = 'popup' | 'toast';

export class PpdmHttpException extends HttpException {
  messageType: MessageType;

  constructor(message: string, messageType: MessageType = 'popup') {
    super(message, HttpStatus.BAD_REQUEST);
    this.messageType = messageType;
  }

  public getMessageType(): MessageType {
    return this.messageType;
  }
}
