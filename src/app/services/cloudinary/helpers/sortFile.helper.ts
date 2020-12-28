// Import module
import path from "path";

// Import interface
import { IFile } from "../interfaces/cloudinaty.interface";

export function sortFile(file: any): IFile {
    const property = path.parse(file.public_id);

    return {
        id: file.asset_id,
        name: property.name,
        size: file.bytes,
        url: file.secure_url,
        format: file.format,
        created_at: file.created_at,
        root: file.public_id
    }
}
