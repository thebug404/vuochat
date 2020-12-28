// Imports modules
import upload from "express-fileupload";
import session from "express-session";
import flash from "connect-flash";
import SocketIO from "socket.io";
import passport from "passport";
import express from "express";
import morgan from "morgan";
import path from "path";
import http from "http";

// Import environments
import { environments } from "./config/environments";

// Import server routes.
import { IndexRoutes } from "./routes/index.routes";

// Import strategies
import "./components/auth/strategies/strategies";

// Import Sockets
import { messageSocket } from "./sockets/message.sockets";

export class Vuochat {
    private app: express.Express;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);

        this.settings();
        this.middlewares();
        this.routes();
        this.sockets();
        this.staticFiles();
    }

    /**
     * Method responsible for server configurations.
     */
    private settings(): void {
        this.app.set("view engine", "ejs");
    }

    /**
     * Method responsible for executing all global middlewares.
     */
    private middlewares(): void {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: "vuochat-nodejs-app",
            resave: false,
            saveUninitialized: true
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(upload());
        this.app.use(flash());
    }

    /**
     * Responsible method of recording all the routes of our components.
     */
    private routes(): void {
        const { admin } = new IndexRoutes(express());
        this.app.use(admin);
    }

    /**
     * Method responsible for executing the sockets.
     */
    private sockets(): void {
        const socket = new SocketIO.Server(this.server);
        messageSocket(socket);
    }

    /**
     * Responsible method of serving files.
     */
    private staticFiles(): void {
        const root: string = path.join(__dirname, "public");
        console.log(root);
        this.app.use(express.static(root));
    }

    /**
     * Responsible method of starting our server.
     */
    start(): void {
        const port = environments.PORT;
        const msg = `App execute in port:${ port }`;

        this.server.listen(port, () => console.log(msg));
    }
};
