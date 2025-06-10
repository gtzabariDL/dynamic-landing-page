// Base path for GitHub Pages deployment
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '';

/**
 * Gets the correct image path for static assets in production with basePath
 * @param imagePath - The image path (e.g., '/logo.svg')
 * @returns The correct path with basePath applied in production
 */
export function getImagePath(imagePath: string): string {
  // If the path already starts with the basePath, don't add it again
  if (BASE_PATH && imagePath.startsWith(BASE_PATH)) {
    return imagePath;
  }

  // If it's an absolute path starting with /, add basePath
  if (imagePath.startsWith('/')) {
    return `${BASE_PATH}${imagePath}`;
  }

  // If it's a relative path, return as is
  return imagePath;
}

// Export the base path for use in static contexts
export const getBasePath = () => BASE_PATH;
