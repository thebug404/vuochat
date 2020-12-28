// Import modules
import express from "express";

export class HomeControllerComponent {
    /**
     * Controller in charge of showing the start of our app.
    */
    public index(req: express.Request, res: express.Response): void {
        res.render("index");
    }

    /**
     * Controller in charge of displaying the registration form.
    */
   public register(req: express.Request, res: express.Response): void {
       res.render("auth/register", {
           message: {
               text: req.flash("text"),
               status: req.flash("status"),
               field: req.flash("field")
           }
       });
   }

    /**
     * Controller in charge of displaying the login form.
    */
    public login(req: express.Request, res: express.Response): void {
        res.render("auth/login", {
            message: {
                text: req.flash("text"),
                status: req.flash("status"),
                field: req.flash("field")
            }
        });
    }
}
