const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const faceapi = require('face-api.js')
// const abc = require('./script');
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
const mime = require('mime');

app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  console.log(abc.result);
 res.send('hii')
});

app.get('/search', (req, res) => {
  res.render('products/search')
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.body.folderName;
    const dir = `./labeled_images/${folderName}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "image1") {
      cb(null, "1" + path.extname(file.originalname));
    } else if (file.fieldname === "image2") {
      cb(null, "2" + path.extname(file.originalname));
    } else {
      cb(new Error("Invalid field name"));
    }
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }]), (req, res) => {
  if (!req.files || !req.files["image1"] || !req.files["image2"]) {
    res.status(500).send("Error uploading files");
  } else {
    console.log(`File ${req.files["image1"][0].filename} uploaded successfully`);
    console.log(`File ${req.files["image2"][0].filename} uploaded successfully`);
    res.send("Files uploaded successfully");
  }
});




app.listen(5000, () => {
  console.log("5000");
});
