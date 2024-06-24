import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';

const uploadsDirectory = 'public/uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check if the uploads directory exists, create it if it doesn't
        if (!fs.existsSync(uploadsDirectory)) {
            fs.mkdirSync(uploadsDirectory, { recursive: true });
        }
        cb(null, uploadsDirectory);
    },
    filename: (_req, file, cb) => {
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + file.mimetype.split('/').pop()
        cb(null, fileName)
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // limit file size to 10MB
    },
})
export default upload
