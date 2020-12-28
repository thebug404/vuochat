// Import module
import express from "express";

// Import Auth Middleware
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
const authMiddleware = new AuthMiddleware();

// Import Home controller
import { HomeControllerComponent } from "./home.controller";
const homeController = new HomeControllerComponent();

export class HomeRoutesComponent {
    constructor(public router: express.Router) {
        this.index();
        this.register();
        this.login();
    }

    /**
     * Show home page.
    */
    private index(): void {
        this.router.get(
            "/",
            authMiddleware.isNotLoggedIn,
            homeController.index
        );
    }

    /**
     *  Show login page
    */
    private register(): void {
        this.router.get(
            "/register",
            authMiddleware.isNotLoggedIn,
            homeController.register
        );
    }

    /**
     *  Show login page
    */
   private login(): void {
       this.router.get(
           "/login",
           authMiddleware.isNotLoggedIn,
           homeController.login
        );
   }
}
