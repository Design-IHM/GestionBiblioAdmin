// In any component or function in your app:

import { imageUploadHelpers } from '../services/imageUpload';

// 1. Quick upload single image
export const saveProfilePicture = async (file: File) => {
	const imageUrl = await imageUploadHelpers.uploadImage(file, 'avatars');
	if (imageUrl) {
		// Save imageUrl to your Firebase/database
		console.log('Profile picture URL:', imageUrl);
	}
};

// 2. Quick upload multiple images
export const saveProductImages = async (files: File[]) => {
	const imageUrls = await imageUploadHelpers.uploadImages(files, 'products');
	// Save imageUrls array to your Firebase/database
	console.log('Product image URLs:', imageUrls);
};

// 3. Get optimized image URL
export const getOptimizedUrl = (publicId: string) => {
	return imageUploadHelpers.getOptimizedImageUrl(publicId, 'thumbnail');
};

// 4. Get custom transformed image URL
export const getCustomUrl = (publicId: string) => {
	return imageUploadHelpers.getImageUrl(publicId, {
		width: 400,
		height: 300,
		crop: 'fill',
		quality: 'auto'
	});
};

// 5. Delete image
export const removeImage = async (publicId: string) => {
	const success = await imageUploadHelpers.deleteImage(publicId);
	if (success) {
		console.log('Image deleted successfully');
	}
};
