import { cloudinaryConfig } from '../config/cloudinary';

export interface UploadResponse {
	public_id: string;
	secure_url: string;
	width: number;
	height: number;
	format: string;
	bytes: number;
	created_at: string;
}

export interface UploadError {
	message: string;
	error: any;
}

export class ImageUploadService {
	private static instance: ImageUploadService;

	public static getInstance(): ImageUploadService {
		if (!ImageUploadService.instance) {
			ImageUploadService.instance = new ImageUploadService();
		}
		return ImageUploadService.instance;
	}

	async uploadImage(file: File): Promise<UploadResponse> {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', cloudinaryConfig.uploadPreset);
		formData.append('cloud_name', cloudinaryConfig.cloudName);

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || 'Upload failed');
			}

			const data = await response.json();
			return data as UploadResponse;
		} catch (error) {
			console.error('Image upload error:', error);
			throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	async uploadMultipleImages(files: File[]): Promise<UploadResponse[]> {
		const uploadPromises = files.map(file => this.uploadImage(file));
		return Promise.all(uploadPromises);
	}

	async deleteImage(publicId: string): Promise<boolean> {
		try {
			// Note: For security, deletion should typically be done server-side
			// This is a client-side example that requires an unsigned delete preset
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						public_id: publicId,
						api_key: cloudinaryConfig.apiKey,
					}),
				}
			);

			const result = await response.json();
			return result.result === 'ok';
		} catch (error) {
			console.error('Image deletion error:', error);
			return false;
		}
	}
}
