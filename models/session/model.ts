import { signInFx } from 'api'
import { spotifyApi, SpotifyGate } from 'api/spotifyApi'
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from 'effector'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

import { getPlaylistsFx } from '../playlists'

// export const sessionDomain = createDomain(createDomain'sessionDomain')
export const onPageLoaded = createEvent()

export const getSessionFx = createEffect<
  Parameters<typeof getSession>[0],
  Session | null
>()

getSessionFx.use((context) => {
  return getSession(context)
})

export const $session = createStore<Session | null>(null)

$session.on(getSessionFx.doneData, (_, data) => data)

// export const $isAuthenticated = $session.map((data) => data !== null)
export const $userToken = $session.map((data) => data?.user?.accessToken)

export const setTokenFx = attach({
  source: $session,
  effect: (session) => {
    if (session?.user?.accessToken) {
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  },
})

forward({
  from: SpotifyGate.open,
  to: onPageLoaded,
})

guard({
  source: $session,
  clock: onPageLoaded,
  filter: (data) => {
    return !data
  },
  target: signInFx,
})

guard({
  clock: onPageLoaded,
  filter: $userToken.map((token) => !token),
  target: getSessionFx,
})

forward({
  from: $session,
  to: getPlaylistsFx,
})

guard({
  source: $userToken,
  clock: [$userToken, onPageLoaded],
  filter: (token): token is string => !!token,
  target: setTokenFx,
})
