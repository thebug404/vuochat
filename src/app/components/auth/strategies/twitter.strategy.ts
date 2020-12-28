// Import module
import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";

// Import environments
import { environments } from "../../../config/environments";

// Import schemas
import { schemas } from "../config/schema";

// Import user repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

// Import serialize
import "../helpers/serialize.helper";

// Create strategy
const strategy = new TwitterStrategy(
    {
        consumerKey: environments.TWITTER_API_KEY || "",
        consumerSecret: environments.TWITTER_API_SECRET  || "",
        callbackURL: environments.TWITTER_CALLBACK_URL || ""
    },

    async (access_token, refresh_token, profile, done) => {
        // Search user in the database
        const user = await userRepository.findByOauthId(profile.id);
        
        // Use exist
       if (user) return done(null, user);

       // User does not exist
        const newUser = await userRepository.schema({
            name: profile.displayName,
            provider: profile.provider,
            oauthId: profile.id,
            picture: profile._json.profile_image_url_https,
            username: profile.username
        }).save();

        done(null, newUser);
    }
);

// Use strategy
passport.use(schemas.twitter.name, strategy);
