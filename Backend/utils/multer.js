const multer = require("multer")
const path = require("path")

//? For upload the Image
const uploadImage = multer({
  storage: multer.diskStorage({}),
  avatar: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type not supported"), false);
      console.log(`cd > ${cb}`);
    }
    cb(null, true);
  },
  limits: { fileSize: 5000000 },
});

module.exports = uploadImage