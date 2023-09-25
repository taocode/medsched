// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true

import { getCollection } from 'sveltefirets'
// import { limit, orderBy } from 'firebase/firestore'
// import type { IMessage } from '$lib/message.interface'
import type { PageLoad } from './$types'
export const load: PageLoad = async () => {
	const recipients = await getCollection(`recipients`)
	const medications = await getCollection(`medications`)
	// console.log('loaded', {recipients})
	return { recipients, medications }
}
// collectionStore(firestore,'recipients')
