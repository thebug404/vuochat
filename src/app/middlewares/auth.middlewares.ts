// Import module
import express from "express";

// Import user repository
import { UserRepository } from "../repository/user/user.repository";
const userRepository = new UserRepository();

// Import encrypt
import { EncryptHelper } from "../helpers/encrypt.helper";
const encryptHelper = new EncryptHelper();

// Import message
import { error } from "../messages/messages";

export class AuthMiddleware {
    /**
     * Method in charge of verifying if the user's credentials are correct.
     * @param req 
     * @param res 
     * @param next 
     */
    async beforeLogin(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        // Verify user existence
        const user = await userRepository.findByUsername(req.body.username);
        
        if (!user) {
            const { usernameNotExist } = error;
            req.flash("text", usernameNotExist.message);
            req.flash("status", usernameNotExist.status);
            req.flash("field", usernameNotExist.field);
            
            return res.redirect("/login");
        }

        // Verify password
        const result = await encryptHelper.comparePassword(req.body.password, user.password || "");

        if (!result) {
            const { passwordIncorrect } = error;

            req.flash("text", passwordIncorrect.message);
            req.flash("status", passwordIncorrect.status);
            req.flash("field", passwordIncorrect.field);

            res.redirect("/login");
        } else {
            next();
        }
    }

    /**
     * Method in charge of verifying if the user's record already exists.
     * @param req 
     * @param res 
     * @param next 
     */
    async beforeRegister(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userRepository.findByUsername(req.body.username);

        if (user) {
            const { usernameExist } = error;

            req.flash("text", usernameExist.message);
            req.flash("status", usernameExist.status);
            req.flash("field", usernameExist.field);

            res.redirect("/register");
        } else {
            next();
        }
    }

    /**
     * Method in charge of verifying if the user is authenticated.
     * @param req 
     * @param res 
     * @param next 
     */
    public isLogged(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        req.isAuthenticated() ? next() : res.redirect("/login");
    }

    /**
     * Method in charge of verifying if the user is not authenticated.
     * @param req 
     * @param res 
     * @param next 
     */
    public isNotLoggedIn(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        req.isAuthenticated() ? res.redirect("/profile") : next();
    }
};
