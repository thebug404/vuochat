// Imports modules
import express from "express";

export class AuthController {
     /**
      * Method in charge of closing the session of the current user.
      * @param req 
      * @param res 
      */
     public logout(req: express.Request, res: express.Response): void {
          // Close session
          req.logOut();

          // Redirec to login page
          res.status(200).json({
               text: "Successfully"
          });
     }
}
