import { getDocument } from 'sveltefirets'
// import { limit, orderBy } from 'firebase/firestore'
// import type { IMessage } from '$lib/message.interface';
import type { PageLoad } from './$types'
export const load: PageLoad = async ({url}) => {
  // pl.search
  const id = url.searchParams.get('id')
  const recipient = await getDocument(`recipients/${id}`)
  console.log(`looking up: ${id}`)
  // console.log(recipient)
  return { recipient }
}