// multerConfig.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "SchoolBus", // Specify a folder in Cloudinary
    format: async (req, file) => file.mimetype.split("/")[1], // Dynamically determine format
    public_id: (req, file) => file.originalname.split(".")[0], // Set public_id to the file name without extension
  },
});

const upload = multer({ storage: storage });

export default upload;
