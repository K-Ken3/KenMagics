import { revalidatePath, revalidateTag } from 'next/cache';

/** Call after any admin mutation so public pages update immediately. */
export function revalidatePortfolio() {
  revalidateTag('portfolio');
  revalidatePath('/');
  revalidatePath('/work', 'layout');
}
