// Import module
import uuid from "uniqid";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// Import schemas
import { schemas } from "../config/schema";

// Import encrypt helper
import { EncryptHelper } from "../../../helpers/encrypt.helper";
const encryptHelper = new EncryptHelper();

// Import user repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

// Import serialization
import "../helpers/serialize.helper";

// Create strategy: Login strategy
const loginStrategy = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },

    async (username, password, done) => {
        // Search user
        const user = await userRepository.findByUsername(username);
        done(null, user);
    }
);

// Create strategy: Register strategy
const registerStrategy = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },

    async (req, username, password, done) => {
        // Add picture
        const picture = `https://ui-avatars.com/api/?name=${ req.body.name }&background=random&format=svg&size=80`

        // Encrypt password
        password = await encryptHelper.encryptPassword(password);

        // Save user in the database
        const newUser = await userRepository.schema({
            name: req.body.name,
            provider: "local",
            oauthId: uuid(),
            username,
            password,
            picture
        }).save();

        done(null, newUser);
    }
);

// Use strategy
passport.use(schemas.local.registerName, registerStrategy);
passport.use(schemas.local.loginName, loginStrategy);
