import { createUserStore, firebaseConfig, type IBaseUser } from 'sveltefirets'
export interface IUser extends IBaseUser {
	theme: string // whatever custom properties your project has
}
export const user = createUserStore<IUser>({
	userKey: `${firebaseConfig.projectId}_firebase_user`,
	log: true,
})
