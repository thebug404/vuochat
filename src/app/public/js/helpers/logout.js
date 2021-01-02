export async function logout() {
     caches.delete("VUOCHAT_CACHE").then(async value => {
          await fetch("/auth/logout", {
               method: "POST",
               body: JSON.stringify({}),
               headers: {
                    "Content-Type": "application/json"
               }
          });

          // history.pushState({ name: "Home" }, "Vuochat", "/");
          localStorage.clear();
          window.location.href = "/";
     });

}