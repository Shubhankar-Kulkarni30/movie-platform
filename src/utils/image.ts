export const imageUrl = (path: string) =>
  path ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${path}` : '';
