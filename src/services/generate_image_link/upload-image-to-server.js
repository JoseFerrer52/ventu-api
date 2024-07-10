import { imagekit } from "./generate-image-link-connection.js";
import { CONFIG } from "../../config.js";
import path from "path"
import fs from "fs"


async function uploadImageToServer(file) {

    const imagePath = path.join(CONFIG.app.imagePath.path , file.filename);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    try {
        const uploadResponse = await imagekit.upload({
            file: base64Image ,
            fileName: file.filename,
            folder: 'Files_Ventu',
        });

        console.log(uploadResponse.url);
        return uploadResponse.url;
    } catch (error) {
        console.error(error);
    }
}

export {uploadImageToServer}


// function uploadImageToServer (file){

//     const uploadResponse = imagekit.upload({
//         file: `./${file.destination}/${file.filename}`,
//         fileName: file.filename,
//         path : '/Files_Ventu',
//         urlEndpoint : "https://ik.imagekit.io/kz1hforrr",
//     }).then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.log(error);
//     })
// }