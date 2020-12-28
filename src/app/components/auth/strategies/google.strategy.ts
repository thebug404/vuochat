// Imports modules
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Import environments
import { environments } from "../../../config/environments";

// Import config
import { schemas } from "../config/schema";

// Import user repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

// Import serialization
import "../helpers/serialize.helper";

// Create new strategy
const strategy = new GoogleStrategy(
    {
        clientID: environments.GOOGLE_CLIENT_ID || "",
        clientSecret: environments.GOOGLE_CLIENT_SECRET || "",
        callbackURL: environments.GOOGLE_CALLBACK_URL || ""
    },

    async (access_token, refresh_token, profile, done) => {
        const user = await userRepository.findByOauthId(profile.id);

        // User exists
        if (user) return done(undefined, user);

        /**
         * User does not exist
         * Create a new user and save in the database
        */
        const newUser = await userRepository.schema({
            name: profile.displayName,
            provider: profile.provider,
            username: profile._json.email,
            picture: profile._json.picture,
            oauthId: profile.id
        }).save();

        done(undefined, newUser);
    }
);

// Use strategy
passport.use(schemas.google.name, strategy);
