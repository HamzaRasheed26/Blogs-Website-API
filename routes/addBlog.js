const express = require("express");
const router = express.Router();
const multer = require("multer");
const {connection} = require("../database/sql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("blogCoverImage"), (req, res, next) => {
  const tilte = req.body.blogTitle;
  const author = req.body.authorName;
  const coverImage = req.file.filename;
  const content = req.query.text;

  const data = {
    title: tilte,
    author: author,
    content: content,
    coverImage: coverImage,
    date: new Date().toLocaleDateString(),
  };
  console.log(data);

  connection.query("Insert into Blog SET ?", data, (err, result) => {
    if (err) throw err;
    else {
      console.log("Data inserted successfully");
      res.redirect("https://hmzdev-blogswebsite.netlify.app/");
    }
  });
});

module.exports = router;
