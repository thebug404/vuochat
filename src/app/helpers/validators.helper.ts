import { IErrorMessage } from "../messages/messages";
import { rules } from "../rules/rules";

export interface IValidate {
     field: string;
     value: string;
}

export class Validators {
     /**
      * Responsible method of validating the user's fields.
      * @param items 
      */
     validate(items: IValidate[]): IErrorMessage | undefined {
          let error: IErrorMessage | undefined = undefined;

          for (let item of items) {
               const result = rules[item.field].regex.test(item.value);
               if (!result) {
                    error = rules[item.field].data;
                    return error;
               }
          }
     }
};
