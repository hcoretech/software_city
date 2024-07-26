// "use server"
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import mongoose from "mongoose";
// import GridFs


// Create storage engine

  const mongodbUrl =process.env.MONGODB_URL
  

  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const filename = file.originalname
        const fileInfo = {
          filename: filename,
          bucketName: "load",
        };
        resolve(fileInfo);

      });
    },
  });

export const upload = multer({storage});
 
