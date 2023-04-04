const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const uuid = require('uuid').v4;
const fse = require('fs-extra');

const { AppError } = require('../utils');

class ImageService {
    static upload(name) {
      console.log('444444444444444444');
    const multerStorage = multer.memoryStorage();
    
    const multerFilter = (req, file, callbackFn) => {
      // 'image/cdhjsakcbjsda' 'document/dbhsajvds'
      console.log(file.mimetype);
      console.log('fffffffffffffffffff');
      if (file.mimetype.startsWith('image/')) {
        console.log(name);
         callbackFn(null, true);
      } else {
        console.log('ggggggggggggggggg');
        callbackFn(new AppError(400, 'Upload images only..'), false);
      }
      };
     /* console.log('rrrrrrrrrrrrrrrrrrr');
      console.log(multerStorage);  
      console.log(multerFilter);  
      console.log(name); */  
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$');
    const fileName = `${uuid()}.jpg`;
    const fullFilePath = path.join(process.cwd(), 'public/avatars', ...pathSegments);
    // console.log(fullFilePath);
    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer) 
      .resize(options || { heigh: 500, width: 500 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;