import { useCallback, useState } from 'react';
import { useImageUpload } from '../hooks/useImageUpload';
import type { UploadResponse } from '../services/imageUpload';

interface ImageUploadProps {
	onUploadComplete: (images: UploadResponse[]) => void;
	multiple?: boolean;
	maxFiles?: number;
	acceptedTypes?: string[];
	maxSizeInMB?: number;
	className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	                                                        onUploadComplete,
	                                                        multiple = false,
	                                                        maxFiles = 5,
	                                                        acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
	                                                        maxSizeInMB = 10,
	                                                        className = '',
                                                        }) => {
	const { uploadImage, uploadMultipleImages, uploading, error, clearError } = useImageUpload();
	const [dragActive, setDragActive] = useState(false);
	const [previews, setPreviews] = useState<string[]>([]);

	const validateFile = (file: File): string | null => {
		if (!acceptedTypes.includes(file.type)) {
			return `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`;
		}

		if (file.size > maxSizeInMB * 1024 * 1024) {
			return `File size must be less than ${maxSizeInMB}MB`;
		}

		return null;
	};

	const handleFiles = useCallback(async (files: FileList) => {
		const fileArray = Array.from(files);

		// Validate files
		for (const file of fileArray) {
			const validationError = validateFile(file);
			if (validationError) {
				alert(validationError);
				return;
			}
		}

		if (multiple && fileArray.length > maxFiles) {
			alert(`You can only upload up to ${maxFiles} files at once`);
			return;
		}

		// Create previews
		const previewUrls = fileArray.map(file => URL.createObjectURL(file));
		setPreviews(previewUrls);

		try {
			let results: UploadResponse[];

			if (multiple && fileArray.length > 1) {
				results = await uploadMultipleImages(fileArray);
			} else {
				const result = await uploadImage(fileArray[0]);
				results = result ? [result] : [];
			}

			if (results.length > 0) {
				onUploadComplete(results);
			}
		} catch (err) {
			console.error('Upload failed:', err);
		} finally {
			// Clean up previews
			previewUrls.forEach(url => URL.revokeObjectURL(url));
			setPreviews([]);
		}
	}, [multiple, maxFiles, uploadImage, uploadMultipleImages, onUploadComplete]);

	const handleDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
		}
	}, [handleFiles]);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			handleFiles(e.target.files);
		}
	}, [handleFiles]);

	return (
		<div className={`w-full ${className}`}>
			<div
				className={`
          relative border-2 border-dashed rounded-lg p-6 text-center
          transition-colors duration-200 ease-in-out cursor-pointer
          ${dragActive
					? 'border-primary bg-primary/10'
					: 'border-gray-300 dark:border-gray-600 hover:border-primary'
				}
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<input
					type="file"
					multiple={multiple}
					accept={acceptedTypes.join(',')}
					onChange={handleInputChange}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					disabled={uploading}
				/>

				<div className="space-y-4">
					<div className="mx-auto w-12 h-12 text-gray-400">
						<svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					<div>
						<p className="text-lg font-medium text-gray-900 dark:text-gray-100">
							{uploading ? 'Uploading...' : 'Upload Images'}
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Drag and drop or click to browse
						</p>
						<p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
							{acceptedTypes.join(', ')} up to {maxSizeInMB}MB
							{multiple && ` (max ${maxFiles} files)`}
						</p>
					</div>
				</div>

				{uploading && (
					<div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-lg">
						<div className="flex items-center space-x-2">
							<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
							<span className="text-sm font-medium">Uploading...</span>
						</div>
					</div>
				)}
			</div>

			{/* Error Display */}
			{error && (
				<div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-md">
					<div className="flex">
						<div className="ml-3">
							<p className="text-sm text-error-700">
								{error}
							</p>
							<button
								onClick={clearError}
								className="mt-2 text-xs text-error-600 hover:text-error-500 underline"
							>
								Dismiss
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Preview Images */}
			{previews.length > 0 && (
				<div className="mt-4">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{previews.map((preview, index) => (
							<div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
								<img
									src={preview}
									alt={`Preview ${index + 1}`}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
