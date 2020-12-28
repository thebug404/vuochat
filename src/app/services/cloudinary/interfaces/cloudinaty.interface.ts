// Import module
import { UploadedFile } from "express-fileupload";

export interface IParamsUplaodFile {
    file: UploadedFile;
    folder: string;
    hash?: boolean;
};

export interface IFile {
    id: string;
    name: string;
    size: string;
    url: string;
    format: string;
    created_at: string;
    root: string;
}
