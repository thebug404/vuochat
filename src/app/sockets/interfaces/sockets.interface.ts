import { IMessage } from "../../repository/message/message.interface";

export interface IMessageParams extends IMessage {
     participates: string[];
}
