/**
 * Extracts the current slug from the pathname
 * @param pathname - The current pathname from usePathname()
 * @returns The slug string or 'default' if no slug
 */
export function getCurrentSlug(pathname: string): string {
  const segments = pathname.replace(/^\/+/, '').split('/');
  const slug = segments[0];

  if (!slug || slug === '') {
    return 'default';
  }

  return slug;
}
