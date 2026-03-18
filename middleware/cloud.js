import { v2 as cloudinary } from "cloudinary";
// CHANGE THIS LINE: Remove the curly braces
import CloudinaryStorage from "multer-storage-cloudinary"; 
import multer from "multer";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// If 'CloudinaryStorage' is the default export, we call it directly:
const storage = new CloudinaryStorage({
    cloudinary: { v2 : cloudinary},
    params: {
        folder: "user-pictures",
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

export const upload = multer({ storage: storage });
export default upload;