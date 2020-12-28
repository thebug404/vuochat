// Import module
import cloudinary from "cloudinary";

// Import environments
import { environments } from "./environments";

cloudinary.v2.config({ 
    cloud_name: environments.CLOUDINARY_NAME, 
    api_key: environments.CLOUDINARY_API_KEY, 
    api_secret: environments.CLOUDINARY_API_SECRET 
});

export default cloudinary.v2;
