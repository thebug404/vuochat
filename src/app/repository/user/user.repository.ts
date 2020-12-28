// Import user model
import { models } from "../../database/mongodb/mongodb";

// Import interface
import { IUser } from "./user.interface";

export class UserRepository {
    /**
     * Create a schema a user
     * @param user 
     */
    schema(user: IUser) {
        return new models.User(user);
    }

    /**
     * Search the user by _id
     * @param _id 
     */
    async findById(_id: string) {
        return await models.User.findById(_id);
    }

    /**
     * Search user by oauthId
     * @param oauthId 
     */
    async findByOauthId(oauthId: string) {
        return await models.User.findOne({ oauthId });
    }

    /**
     * Method in charge of updating the status of notifications.
     * @param _id 
     * @param notification 
     */
    async updateStatusNotification(_id: string, notification: string) {
        return await models.User.updateOne({ _id }, {
            $set: { notification }
        });
    }

    /**
     * Search user by >> username <<
     * @param username 
     */
    async findByUsername(username: string) {
        return await models.User.findOne({ username });
    }

    /**
     * Method that gets less than specified users.
     * @param _id 
     * @param limit 
     * @param page 
     */
    async getUsersLessTo(_id: string, limit: number = 50, page: number = 1) {
        return  await models.User.paginate(
            // Query
            { _id: { $nin: [_id] } },

            // Options
            { limit, page }
        );
    }
};
