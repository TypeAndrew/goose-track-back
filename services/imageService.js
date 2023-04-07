const multer = require('multer');
 const sharp = require('sharp');
// const Jimp = require("jimp");
const path = require('path');
const uuid = require('uuid').v4;
const fse = require('fs-extra');

const { AppError } = require('../utils');

class ImageService {
    static upload(name) {

    const multerStorage = multer.memoryStorage();
    
    const multerFilter = (req, file, callbackFn) => {

      if (file.mimetype.startsWith('image/')) {
        console.log(name);
         callbackFn(null, true);
      } else {

        callbackFn(new AppError(400, 'Upload images only..'), false);
      }
      };
   
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {

    const fileName = `${uuid()}.jpg`;
    const fullFilePath = path.join(process.cwd(), 'public/avatars', ...pathSegments);
   
    await fse.ensureDir(fullFilePath);
     await sharp(file.buffer) 
      .resize(options || { heigh: 500, width: 500 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName)); 

    // open a file called "lenna.png"
   /* await Jimp.read(path.join(fullFilePath, fileName), (err, fullFilePath) => {
      if (err) throw err;
      fullFilePath
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(path.join(fullFilePath, fileName)); // save
    }); */
    
    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;