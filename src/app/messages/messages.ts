export interface IErrorMessage {
    message: string;
    status: string;
    field: string;
}

export const error = {
    usernameExist: {
        message: "El nombre de usuario ya existe, pruebe con otro.",
        status: "danger",
        field: "username"
    },

    usernameNotExist: {
        message: "El nombre de usuario no existe, si el error continua, cree una cuenta",
        status: "danger",
        field: "username"
    },

    passwordIncorrect: {
        message: "La contraseña es incorrecta.",
        status: "danger",
        field: "password"
    },

    usernameInvalid: {
        message: "Debe contener una mayuscula, una minuscula, un numero y como minimo 7 caractes y un maximo de 10.",
        status: "danger",
        field: "username"
    },

    passwordInvalid: {
        message: "La contraseña debe contener una mayuscula, una minucula, un numero, un simbolo y al menos 8 caracteres. No debe contener espacios en blanco.",
        status: "danger",
        field: "password"
    },

    nameInvalid: {
        message: "El nombre es invalido.",
        status: "danger",
        field: "name"
    }
};
