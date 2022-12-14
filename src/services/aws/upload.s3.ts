import aws from "aws-sdk"
import { Request } from "express"
import multer from "multer"
import multers3 from "multer-s3"

/**
 * Todo Neeed Test di function work or not
 * AWS CONFIG 
*/
let config = {
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID as string,
    accessKeyId: process.env.AWS_SECRET_KEY as string,
    region: process.env.AWS_REGION_NAME as string,
    bucket: process.env.AWS_BUCKET_NAME as string,
}

const s3 = new aws.S3()

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true)
    } else {
        cb(new Error("Invalid File Type"), false)
    }
}

const upload = multer({
    fileFilter,
    storage: multers3({
      acl: 'public-read',
      s3,
      bucket: config.bucket,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  });
  
  module.exports = upload;


