import { $session } from '../session/model'

export const $user = $session.map((session) => session?.user)
