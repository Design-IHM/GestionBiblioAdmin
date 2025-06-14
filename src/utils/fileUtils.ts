// src/utils/fileUtils.ts

/**
 * Sanitizes a string to be used as a valid filename by removing or replacing
 * characters that are typically not allowed in file systems.
 *
 * @param filename - The desired filename, e.g., "My Thesis Title / 2024".
 * @returns A sanitized string, e.g., "My Thesis Title - 2024".
 */
export const sanitizeFilename = (filename: string): string => {
	if (!filename) {
		return 'download';
	}
	// Replaces characters that are invalid in Windows, macOS, and Linux filenames.
	return filename.replace(/[/\\?%*:|"<>]/g, '-');
};