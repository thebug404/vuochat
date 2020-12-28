// Import module
import uuid from "uniqid";
import path from "path";

// Import interface
import { IFile, IParamsUplaodFile } from "./interfaces/cloudinaty.interface";

// Import sort
import { sortFile } from "./helpers/sortFile.helper";

// Import cloudinary config
import cloudinary from "../../config/cloudinary";

export class FileCloudinaryService {
    readonly CLOUD_NAME = "vuochat";

    async uploadFile(data: IParamsUplaodFile): Promise<IFile> {
        const file = path.parse(data.file.name);
        const filename: string = data.hash ? uuid() : file.name;
        const folder = `${ this.CLOUD_NAME }/${ data.folder }`;
        
        return new Promise((resolve, reject) => {
            cloudinary
            .uploader
            .upload_stream(
                {
                    public_id: filename,
                    resource_type: "auto",
                    folder
                },

                (err, result) => {
                    return result ? resolve(sortFile(result)) : reject(err);
                }
            )
            .end(data.file.data);
        });
    }
};
