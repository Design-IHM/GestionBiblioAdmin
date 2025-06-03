import { useState } from 'react';
import { buildCloudinaryUrl } from '../config/cloudinary';
import type { UploadResponse } from '../services/imageUpload';

interface ImageGalleryProps {
	images: UploadResponse[];
	onDelete?: (publicId: string) => void;
	className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
	                                                          images,
	                                                          onDelete,
	                                                          className = '',
                                                          }) => {
	const [selectedImage, setSelectedImage] = useState<UploadResponse | null>(null);

	if (images.length === 0) {
		return (
			<div className={`text-center py-8 text-gray-500 dark:text-gray-400 ${className}`}>
				No images uploaded yet
			</div>
		);
	}

	return (
		<>
			<div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ${className}`}>
				{images.map((image) => (
					<div key={image.public_id} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
						<img
							src={buildCloudinaryUrl(image.public_id, {
								width: 200,
								height: 200,
								crop: 'fill',
								quality: 'auto',
								format: 'auto'
							})}
							alt={`Uploaded image ${image.public_id}`}
							className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
							onClick={() => setSelectedImage(image)}
						/>

						{/* Overlay with actions */}
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center">
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
								<button
									onClick={() => setSelectedImage(image)}
									className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
									title="View full size"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								</button>

								{onDelete && (
									<button
										onClick={() => onDelete(image.public_id)}
										className="p-2 bg-error-500 rounded-full text-white hover:bg-error-600 transition-colors"
										title="Delete image"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal for full-size image */}
			{selectedImage && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
					onClick={() => setSelectedImage(null)}
				>
					<div className="relative max-w-4xl max-h-full">
						<img
							src={buildCloudinaryUrl(selectedImage.public_id, {
								width: 1200,
								quality: 'auto',
								format: 'auto'
							})}
							alt={`Full size ${selectedImage.public_id}`}
							className="max-w-full max-h-full object-contain"
						/>
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			)}
		</>
	);
};
