import { CollectionManager } from '@/components/admin/CollectionManager';

export const metadata = { title: 'Testimonials — Admin' };

export default async function Page() {
  return <CollectionManager resource="testimonials" />;
}
