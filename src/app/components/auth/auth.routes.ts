// Import module
import express from "express";
import passport from "passport";

// Import strategy
import { schemas } from "./config/schema";

// Import middlewares
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
const authMiddleware = new AuthMiddleware();

// Import rules
import { RulesAuthComponent } from "./rules/rules";
const rulesAuth = new RulesAuthComponent();

// Import constroller
import { AuthController } from "./auth.controller";
const authController = new AuthController();

export class AuthRoutesComponent {
    constructor(public router: express.Router) {
        this.local();
        this.google();
        this.twitter();
        this.github();
        this.facebook();
        this.logout();
    }

    /**
     * Method in charge of registering the authentication routes locally.
     */
    private local(): void {
        const { local } = schemas;

        this.router.post(
            "/auth/register",
            [authMiddleware.beforeRegister, rulesAuth.verifyFieldsRegister],
            passport.authenticate(local.registerName, {
                successRedirect: "/profile",
                failureRedirect: "/register"
            })
        );

        this.router.post(
            "/auth/login",
            [authMiddleware.beforeLogin],
            passport.authenticate(local.loginName, {
                successRedirect: "/profile",
                failureRedirect: "/login"
            })
        );
    }

    /**
     * Method in charge of registering the authentication routes with Google.
     */
    private google(): void {
        const { google } = schemas;

        this.router.get(
            "/auth/google",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(google.name, {
                scope: google.scope
            })
        );

        this.router.get(
            "/auth/google/callback",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(google.name, {
                successRedirect: "/profile",
                failureRedirect: "/login"
            })
        );
    }

    /**
     * Method in charge of registering the authentication routes with Twitter.
     */
    private twitter(): void {
        const { twitter } = schemas;

        this.router.get(
            "/auth/twitter",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(twitter.name)
        );

        this.router.get(
            "/auth/twitter/callback",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(twitter.name, {
                successRedirect: "/profile",
                failureRedirect: "/login"
            })
        );
    }

    /**
     * Method in charge of registering the authentication routes with Github.
     */
    private github(): void {
        const { github } = schemas;

        this.router.get(
            "/auth/github",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(github.name, {
                scope: github.scope
            })
        );

        this.router.get(
            "/auth/github/callback",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(
                github.name, {
                successRedirect: "/profile",
                failureRedirect: "/login"
            })
        );
    }

    /**
     * Method responsible for registering authentication routes with Facebook.
     */
    private facebook(): void {
        const { facebook } = schemas;

        this.router.get(
            "/auth/facebook",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(facebook.name, {
                scope: facebook.scope
            })
        );

        this.router.get(
            "/auth/facebook/callback",
            [authMiddleware.isNotLoggedIn],
            passport.authenticate(facebook.name, {
                successRedirect: "/profile",
                failureRedirect: "/login"
            })
        );
    }

    /**
     * Method in charge of closing the user's session.
     */
    private logout(): void {
        this.router.post("/auth/logout", authController.logout)
    }
};
