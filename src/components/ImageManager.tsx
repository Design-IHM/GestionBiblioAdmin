import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { ImageGallery } from './ImageGallery';
import type { UploadResponse } from '../services/imageUpload';
import { ImageUploadService } from '../services/imageUpload';

export const ImageManager: React.FC = () => {
	const [uploadedImages, setUploadedImages] = useState<UploadResponse[]>([]);

	const handleUploadComplete = (newImages: UploadResponse[]) => {
		setUploadedImages(prev => [...prev, ...newImages]);
	};

	const handleDelete = async (publicId: string) => {
		if (confirm('Are you sure you want to delete this image?')) {
			const uploadService = ImageUploadService.getInstance();
			const success = await uploadService.deleteImage(publicId);

			if (success) {
				setUploadedImages(prev => prev.filter(img => img.public_id !== publicId));
			} else {
				alert('Failed to delete image. Please try again.');
			}
		}
	};

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
					Upload Images
				</h2>
				<ImageUpload
					onUploadComplete={handleUploadComplete}
					multiple={true}
					maxFiles={10}
					maxSizeInMB={5}
				/>
			</div>

			<div>
				<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
					Uploaded Images ({uploadedImages.length})
				</h2>
				<ImageGallery
					images={uploadedImages}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
};
