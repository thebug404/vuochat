// Import module
import passport from "passport";

// Import user interface
import { IUserMongo } from "../../../repository/user/user.interface";

// Import repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

/**
 * Serialize user
*/
passport.serializeUser((user: IUserMongo, done) => {
    done(null, user._id);
});

/**
 * Deserialize user
*/
passport.deserializeUser(async (id: string, done) => {
    const user = await userRepository.findById(id);
    done(null, user);
});
