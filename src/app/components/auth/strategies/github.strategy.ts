// Import module
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

// Import environments
import { environments } from "../../../config/environments";

// Import user repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

// Import serialization
import "../helpers/serialize.helper";

// Imports schema
import { schemas } from "../config/schema";

// Create new strategy
const strategy = new GithubStrategy(
    {
        clientID: environments.GITHUB_CLIENT_ID || "",
        clientSecret: environments.GITHUB_CLIENT_SECRET || "",
        callbackURL: environments.GITHUB_CALLBACK_URL || ""
    },

    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        // Search user in the database
        const user = await userRepository.findByOauthId(profile.id);
        
        // User exist
        if (user) return done(null, user);

        // User does not exist
        const newUser = await userRepository.schema({
            name: profile.displayName,
            username: profile.username,
            oauthId: profile.id,
            picture: profile._json.avatar_url,
            provider: profile.provider
        }).save();

        done(null, newUser);
    }
);

// Use strategy
passport.use(schemas.github.name, strategy);
