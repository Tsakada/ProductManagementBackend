// export const uploadFileMiddleware = async ({ req }: { req: express.Request }, res: any, next: any) => {
//     import { RequestHandler } from 'express';
//     import multer from 'multer';

//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'uploads/');
//         },
//         filename: function (req, file, cb) {
//             cb(null, Date.now() + '-' + file.originalname);
//         }
//     });

//     const upload = multer({ storage: storage });

//     export const uploadMiddleware: RequestHandler = upload.array('files');
// }