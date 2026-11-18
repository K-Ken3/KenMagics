import { CollectionManager } from '@/components/admin/CollectionManager';

export const metadata = { title: 'Services — Admin' };

export default async function Page() {
  return <CollectionManager resource="services" />;
}
