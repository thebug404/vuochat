// Import module
import bcrypt from "bcryptjs";

export class EncryptHelper {
    /**
     * Responsible method of encrypting passwords.
     * @param password 
     */
    async encryptPassword(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    /**
     * Responsible method of verifying passwords.
     * @param password 
     * @param passwordDB 
     */
    async comparePassword(password: string, passwordDB: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordDB);
    }
};
