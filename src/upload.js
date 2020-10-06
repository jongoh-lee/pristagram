import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "foodinside-image",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  }),
  // 이미지 필터 적용 시 fileFilter:
});

export const uploadMiddleware = upload.array("file");

export const uploadController = (req, res) => {
  const {
    files
  } = req;
  console.log(files)
  let location = files.map(el => (
    {
        url: el.location
    }
  ))
  res.json({ location });
};