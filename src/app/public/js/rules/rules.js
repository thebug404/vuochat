export const rules = {
     name: {
          regex: /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/,
          msgFail: "El nombre es invalido."
     },

     username: {
          regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{7,10}$/,
          msgFail: "El nombre de usuario debe contener al menos una mayuscula, una minuscula, un numero y contener entre 7 y 10 caracateres."
     },

     password: {
          regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/,
          msgFail: "La contraseña debe contener al meno una mayuscula, una minuscula, un numero y ser mayor a 8 caracteres."
     }
};
