import  {v2 as cloudinary} from "cloudinary";
import cloudStorage from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new cloudStorage({
    cloudinary : cloudinary,
    params: {
        folder:'user-images',
        allowed_formats: ['jpg','png','jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

export const upload = multer({storage:storage});
export default upload;