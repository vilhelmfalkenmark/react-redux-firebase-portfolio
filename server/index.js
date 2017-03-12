const express = require('express');
const multer = require('multer');
const	bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;
const request = require("request-promise");
const del = require("del");
const app = express();
const fs = require('fs');

// SÄTT GRUNDMAPP
// let rootFolder;
// if(process.env.NODE_ENV==="production") {
//   rootFolder = "./build";
// } else {
//   rootFolder = "./public";
// }
// let rootFolder = "../build";
let rootFolder = './frontend/build';

const router = express.Router();
router.use(function(req, res, next) {
    next();
});
app.use('/api', router);

/////////////// ENDAST FÖR PRODUKTION ///////////////
// app.use(express.static(path.resolve(__dirname, '../frontend/build')));
//
// app.get('*', function (req, res) {
//  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// });

//////////////////////////////////////////
// API FÖR BILDHANTERING
//////////////////////////////////////////
const imageFolder = rootFolder+"/uploads";


// Kolla om mappen finns annars skapa den
if (!fs.existsSync(imageFolder)){
    fs.mkdirSync(imageFolder);
}

var allImages = [];

 //////////////////////////////////////////
 // LADDA UPP BILDER
 //////////////////////////////////////////
 var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, imageFolder)
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname)
   }
 })
 var upload = multer({ storage: storage }).single("image");
 app.post('/',upload, function(req,res){
 	res.status(204).end();
 });

 //////////////////////////////////////////
 // HÄMTA ALLA BILDER
 //////////////////////////////////////////
 router.get('/images/fetch-all', function(req, res) {
      fs.readdir(imageFolder, (err, files) => {
        files.forEach(file => {
         if(file !== ".DS_Store") {
          allImages.push(file)
         }
        });
        callback();
      })
      const callback = () => {
       if (allImages.length !== 0) {
        allImages = allImages.filter( (i) => i != ".DS_Store");
        allImages = allImages.filter( (i,pos) => allImages.indexOf(i) === pos )
       }
       return res.json({ images: allImages });
      }
 });
 //////////////////////////////////////////
 // RADERA BILD
//////////////////////////////////////////
router.get('/images/delete-image', (req, res) => {
 console.log(req.query);
 				del([imageFolder+"/"+req.query.image]).then(paths => {
      allImages = allImages.filter( (file) => file !== req.query.image)
      callback();
    })
    const callback = () => res.json({ images: allImages, deleted: true });
});


app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
