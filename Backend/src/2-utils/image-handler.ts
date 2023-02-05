import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import path from "path";
import fs from "fs";

// Save new image:
async function saveImage(native: string, image: UploadedFile): Promise<string> {

    // Create unique image name:
    const uniqueImageName = createImageName(image.name);

    // Create absolute path:
    const absolutePath = native + uniqueImageName;

    // Save to disk:
    await image.mv(absolutePath); // mv = move

    // Return new name:
    return uniqueImageName;

}

// Update existing image:
async function updateImage(native: string, image: UploadedFile, existingImageName: string): Promise<string> {

    // Delete existing image:
    await deleteImage(native, existingImageName);

    // Save new image to disk:
    const uniqueImageName = await saveImage(native, image);

    // Return unique name:
    return uniqueImageName;

}

async function deleteImage(native: string, existingImageName: string): Promise<void> {
    try {

        // If no image sent:
        if(!existingImageName) return;

        // Delete image from disk:
        await fsPromises.unlink(native + existingImageName);
    }
    catch(err: any) {
        console.error(err.message);
    }
}

function createImageName(originalImageName: string): string {
    
    // Take original name's extension:
    const extension = originalImageName.substring(originalImageName.lastIndexOf("."));

    // Create unique name including original extension (v4 = 36 chars uuid):
    const uniqueImageName = uuid() + extension;

    // Return unique name:
    return uniqueImageName;
}

function getAbsolutePath(fileName: string, imageName: string): string {
    let absolutePath = path.join(__dirname, "..", "1-assets","images", fileName, imageName);
    if(!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "1-assets","images", "notFound", "notFound.png");
    }
    return absolutePath;
}

export default {
    saveImage,
    updateImage,
    deleteImage,
    getAbsolutePath
}