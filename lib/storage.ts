import { supabase } from '@/lib/supabase';

export const PROGRESS_PHOTOS_BUCKET = 'progress-photos';

export function progressPhotoStoragePath(userId: string, photoId: string): string {
  return `${userId}/${photoId}.jpg`;
}

export async function createProgressPhotoSignedUrl(
  storagePath: string,
  expiresInSeconds = 60,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(PROGRESS_PHOTOS_BUCKET)
    .createSignedUrl(storagePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    throw new Error('Unable to display this photo.');
  }

  return data.signedUrl;
}
