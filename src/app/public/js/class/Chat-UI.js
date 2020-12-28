export class ChatUI {
     /**
      * 
      * @param {string} user_id 
      */
     constructor(user_id) {
          this.section = document.getElementById("box-messages");
          this.receiver_id = document.getElementById("to").value;
          this.user_id = user_id;
     }

     /**
     * 
     * @param {{
     *   from: string,
     *   to: string,
     *   message: string,
     *   created_at: number
     * }} data 
     */
     createElement(data) {
          const element = document.createElement("div");
          const color = (data.from == this.user_id) ? "bg-purple text-white" : "";
          const justify = (data.from = this.user_id) ? "justify-content-end" : "";
          element.className = "col-12 py-2";

          element.innerHTML = `
               <div class="row ${ justify }">
                    <div class="col-12 col-sm-6 col-md-8 col-xl-4">
                         <div class="card ${ color } border-0 shadow">
                              <div class="card-body p-3">
                                   <p class="m-0">${ data.message }</p>
                              </div>
                         </div>
                         <small class="text-muted text-center">${ new Date(data.created_at) }</small>
                    </div>
               </div>
          `;

          return element;
     }

     /**
      * 
      * @param {{
      *   from: string,
      *   to: string,
      *   message: string,
      *   created_at: number
      * }} message 
      */
     writeElementDOM(message) {
          const participates = [message.from, message.to];

          if (participates.includes(this.receiver_id)) {
               const element = this.createElement(message);
               this.section.appendChild(element);

               this.scrollAutomatic();
          };
     }
     
     scrollAutomatic() {
          this.section.scrollTop = this.section.scrollHeight;
     }
};
