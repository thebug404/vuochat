// Import module
import express from "express";

// Import server routes
import { HomeRoutesComponent } from "../components/home/home.routes";
import { AuthRoutesComponent } from "../components/auth/auth.routes";
import { ProfileRoutesComponent } from "../components/profile/profile.routes";
import { NotificationRoutesComponent } from "../components/notification/notification.routes";

const serverRoutes: express.Router[] = [
    new HomeRoutesComponent(express()).router,
    new AuthRoutesComponent(express()).router,
    new ProfileRoutesComponent(express()).router,
    new NotificationRoutesComponent(express()).router
];

export class IndexRoutes {
    constructor(public admin: express.Express) {
        this.executeRoutes();
    }

    /**
     * Method in charge of executing all the routes of our 
     * components in a polymorphic way.
     */
    private executeRoutes(): void {
        for (let route of serverRoutes) {
            this.admin.use(route);
        }
    }
};
