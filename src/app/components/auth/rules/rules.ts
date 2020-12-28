// Import modules
import express from "express";

// Imports Validators
import { Validators } from "../../../helpers/validators.helper";
const validators = new Validators();

export class RulesAuthComponent {
     /**
      * Middleware responsible for validating user data when trying to register.
      * @param req 
      * @param res 
      * @param next 
      */
     verifyFieldsRegister(
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
     ) {
          const error = validators.validate([
               { field: "name", value: req.body.name },
               { field: "username", value: req.body.username },
               { field: "password", value: req.body.password }
          ]);

          if (error) {
               req.flash("text", error.message);
               req.flash("status", error.status);
               req.flash("field", error.field);

               return res.redirect("/register");
          }

          next();
     }
}
