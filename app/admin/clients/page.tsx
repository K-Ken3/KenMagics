import { CollectionManager } from '@/components/admin/CollectionManager';

export const metadata = { title: 'Clients — Admin' };

export default async function Page() {
  return <CollectionManager resource="clients" />;
}
