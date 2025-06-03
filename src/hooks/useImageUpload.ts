import { useState, useCallback } from 'react';
import { ImageUploadService } from '../services/imageUpload';
import type { UploadResponse } from '../services/imageUpload';

interface UseImageUploadResult {
	uploadImage: (file: File) => Promise<UploadResponse | null>;
	uploadMultipleImages: (files: File[]) => Promise<UploadResponse[]>;
	uploading: boolean;
	error: string | null;
	clearError: () => void;
}

export const useImageUpload = (): UseImageUploadResult => {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const uploadService = ImageUploadService.getInstance();

	const uploadImage = useCallback(async (file: File): Promise<UploadResponse | null> => {
		setUploading(true);
		setError(null);

		try {
			const result = await uploadService.uploadImage(file);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Upload failed';
			setError(errorMessage);
			return null;
		} finally {
			setUploading(false);
		}
	}, [uploadService]);

	const uploadMultipleImages = useCallback(async (files: File[]): Promise<UploadResponse[]> => {
		setUploading(true);
		setError(null);

		try {
			const results = await uploadService.uploadMultipleImages(files);
			return results;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Upload failed';
			setError(errorMessage);
			return [];
		} finally {
			setUploading(false);
		}
	}, [uploadService]);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return {
		uploadImage,
		uploadMultipleImages,
		uploading,
		error,
		clearError,
	};
};
