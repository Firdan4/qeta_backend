import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = "uploads/";

    if (file.mimetype.startsWith("video/")) {
      folder += "videos";
    } else if (file.mimetype.startsWith("audio/")) {
      folder += "audios";
    } else if (file.mimetype.startsWith("image/")) {
      if (file.fieldname === "profile") {
        folder += "images/profiles";
      } else {
        folder += "images";
      }
    }

    cb(null, folder);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const fileFilter = async (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|mkv|webm|mp3|wav/;

  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, GIF, MP4, MKV, WEBM, MP3, and WAV files are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Max file size 100MB
});

export default upload;
