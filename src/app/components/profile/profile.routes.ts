// Import module
import express from "express";

// Import >> Auth Middleware <<
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
const authMiddleware = new AuthMiddleware();

// Import >> Profile Controller <<
import { ProfileControllerComponent } from "./profile.controller";
const profileController = new ProfileControllerComponent();

export class ProfileRoutesComponent {
    constructor(public router: express.Router) {
        this.profile();
        this.users();
        this.chat();
    }

    /**
     * Method that records the dashboard path of the authenticated user.
     */
    private profile(): void {
        this.router.get(
            "/profile",
            authMiddleware.isLogged,
            profileController.dashboard
        );
    }

    /**
     * Method that registers the route that shows registered users.
     */
    private users(): void {
        this.router.get(
            "/profile/users",
            [authMiddleware.isLogged],
            profileController.users
        );
    }

    /**
     * Method that records the path that the chat shows.
     */
    private chat(): void {
        this.router.get(
            "/profile/chat/:id",
            [authMiddleware.isLogged],
            profileController.chat
        );
    }
}
