import { CollectionManager } from '@/components/admin/CollectionManager';

export const metadata = { title: 'Process — Admin' };

export default async function Page() {
  return <CollectionManager resource="process_steps" />;
}
