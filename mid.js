module.exports.abc = (req,res,next)=>{
    const storage = multer.diskStorage({
  
        destination: function (req, file, cb) {
          cb(null, "./labeled_image/${name}/");
        },
        filename: function (req, file, cb) {
          cb(
            null,
            "1" +        path.extname(file.originalname)
          );
        },
      });
      
      const upload = multer({ storage: storage });
      next();
}