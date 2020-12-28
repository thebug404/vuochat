// Import module
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

// Import environment
import { environments } from "../../../config/environments";

// Import user repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

// Import schemas
import { schemas } from "../config/schema";

// Import serialization
import "../helpers/serialize.helper";

// Create strategy
const strategy = new FacebookStrategy(
    {
        clientID: environments.FACEBOOK_CLIENT_ID || "",
        clientSecret: environments.FACEBOOK_CLIENT_SECRET || "",
        callbackURL: environments.FACEBOOK_CALLBACK_URL || "",
        profileFields: ['id', 'photos', 'name', 'displayName', 'gender', 'profileUrl', 'email']
    },

    async (access_token, refresh_token, profile, done) => {
        // Search user in the database
        const user = await userRepository.findByOauthId(profile.id);
        
        // User exist
        if (user) return done(null, user);

        // User does not exist
        const newUser = await userRepository.schema({
            name: profile.displayName,
            provider: profile.provider,
            oauthId: profile.id,
            picture: profile._json.picture.data.url,
            username: profile._json.first_name
        }).save();

        done(null, newUser);
    }
);

// Use strategy
passport.use(schemas.facebook.name, strategy);
