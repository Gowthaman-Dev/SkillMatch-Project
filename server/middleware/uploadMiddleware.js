import multer from "multer";
import path from "path";
import fs from "fs";

const folders = ["uploads", "uploads/profiles", "uploads/banners", "uploads/resumes"];
folders.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilePhoto") cb(null, "uploads/profiles/");
    else if (file.fieldname === "bannerImage") cb(null, "uploads/banners/");
    else cb(null, "uploads/resumes/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".pdf" || ext === ".doc" || ext === ".docx") cb(null, true);
    else cb(new Error("Only PDF, DOC, DOCX allowed"), false);
  } else {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export default upload;