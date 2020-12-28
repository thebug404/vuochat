import { rules } from "../rules/rules";

export class ValidateInput {
     /**
      * Method in charge of validating the text boxes in real time.
      * @param {NodeListOf<HTMLInputElement>} inputs 
      */
     validate(inputs) {
          inputs.forEach(input => {
               input.addEventListener("input", () => {
                    const result = rules[input.name].regex.test(input.value);
                    const message = rules[input.name].msgFail;
                    this.writeMessage(input, result, message);
               });

               input.addEventListener("blur", e => {
                    const result = rules[input.name].regex.test(input.value);
                    const message = rules[input.name].msgFail;
                    this.writeMessage(input, result, message);
               });
          });
     }

     /**
      * Responsible method of painting the messages on the form.
      * @param {HTMLInputElement} input 
      * @param {boolean} result 
      * @param {string} message
      */
     writeMessage(input, result, message) {
          const boxMessage = input.nextElementSibling;
          boxMessage.classList.remove("text-muted");

          if (result) {
               input.classList.remove("is-invalid");
               boxMessage.classList.remove("invalid-feedback");

               input.classList.add("is-valid");
               boxMessage.classList.add("valid-feedback");
               boxMessage.textContent = "Campo completado";
          } else {
               input.classList.remove("is-valid");
               boxMessage.classList.remove("valid-feedback");

               input.classList.add("is-invalid");
               boxMessage.classList.add("invalid-feedback");
               boxMessage.textContent = message;
          }
     }
}