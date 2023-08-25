import { getCollection } from 'sveltefirets';
import { limit, orderBy } from 'firebase/firestore';
import type { IMessage } from '$lib/message.interface';
import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
  const messages = await getCollection<IMessage>(`messages`, [
    limit(5),
    orderBy('updatedAt', 'desc'),
  ]);
  return { messages };
}