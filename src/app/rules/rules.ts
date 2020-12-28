import { error, IErrorMessage } from "../messages/messages";

export interface IRules {
     regex: RegExp;
     data: IErrorMessage
}

export const rules: Record<string, IRules> = {
     name: {
          regex: /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/,
          data: error.nameInvalid
     },

     username: {
          regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{7,10}$/,
          data: error.usernameInvalid
     },

     password: {
          regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/,
          data: error.passwordInvalid
     }
};
