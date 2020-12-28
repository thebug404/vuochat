export class PanelUI {
     constructor() {
          this.section = document.getElementById("panel-chats");
     }

     /**
      * Method responsible for creating a new element
      * @param {{
      *   _id: string;
      *   name: string;
      *   picture: string;
      *   username: string;
      * }} participate 
      * 
      * @param {{
      *   message: string;
      *   created_at: number;
      * }} message 
      */
     createElement(participate, message) {
          const element = document.createElement("a");
          element.className = "navbar-item d-block w-100 text-decoration-none text-white";
          element.href = `/profile/chat/${ participate._id }`;
          element.id = participate._id;

          element.innerHTML = `
          <div class="d-flex">
               <img src="${ participate.picture }" alt="${ participate.name }" width="50px" height="50px" class="rounded-circle" style="object-fit: cover;">
               <div class="mx-2">
                    <p class="m-0 p-0">
                         <strong>${ participate.name }</strong>
                    </p>
                    <small>${ message.message }</small>
               </div>
          </div>
          <hr>
          `;

          return element;
     }

     /**
      * Method responsible for painting the item in the list
      * @param {{
      *   _id: string;
      *   name: string;
      *   picture: string;
      *   username: string;
      * }} participate 
      * 
      * @param {{
      *   message: string;
      *   created_at: number;
      * }} message 
      */
     writeElementDOM(participate, message) {
          // Remove element
          this.removeElement(participate._id);

          // Create new element
          const element = this.createElement(participate, message);

          // Insert top element list
          this.section.insertAdjacentElement("afterbegin", element);
     }

     /**
      * Responsible method of removing item if it already exists
      * @param {string} id 
      */
     removeElement(id) {
          const element = document.getElementById(id);
          if (element) element.remove();
     }
}
