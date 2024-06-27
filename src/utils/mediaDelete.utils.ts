import fs from 'fs';
import path from 'path';
import Print from './print';

export const deleteMedia = (filepath: string): Promise<boolean> => {
    const imagePath = path.join(__dirname, '../', '../').concat(filepath);

    return new Promise((resolve, reject) => {
        fs.unlink(imagePath, (error) => {
            if (error) {
                Print.error(error.message);
                resolve(false); // Resolve with false if there's an error
            } else {
                resolve(true); // Resolve with true if the file was successfully deleted
            }
        });
    });
};
