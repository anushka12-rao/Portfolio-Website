import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import { logger } from '../utils/logger.js';

export const uploadImage = async (file, req) => {
  if (!file) throw new Error('No image file provided');

  if (isCloudinaryConfigured && file.buffer) {
    // Upload buffer to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio-cms', resource_type: 'image' },
        (error, result) => {
          if (error) {
            logger.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result.secure_url);
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  // Fallback: Local disk storage
  const protocol = req.protocol;
  const host = req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${file.filename}`;
  return fileUrl;
};
