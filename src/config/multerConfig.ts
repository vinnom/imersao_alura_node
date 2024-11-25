import multer, { Multer } from "multer";

/**
 * Configures multer for file uploads.
 *
 * @returns {Multer} The multer middleware instance.
 */
const upload = (): Multer => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    return multer({ storage });
};

export default upload;
