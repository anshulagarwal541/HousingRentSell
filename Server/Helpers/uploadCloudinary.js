const { images, houses } = require('./house.js')
const { storage, cloudinary } = require('../Cloudinary/index.js');

const uploadImages = async () => {
    const cloudinaryImages = await Promise.all(images.map(async (image) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image, {
                folder: 'houseRentSell'
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            });
        });
    }));
}

uploadImages();