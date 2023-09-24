import type { IUser } from '$lib/user'
import type { LayoutServerLoad } from './$types'

export const prerender = true

export const load: LayoutServerLoad = async ({ cookies, request }) => {
	return {
		user: JSON.parse(cookies.get('user') || null) as IUser,
		// brief for demonstration - it's best to use a try-catch block in actual usage
	}
}
