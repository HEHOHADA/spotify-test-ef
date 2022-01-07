import { signInFx } from 'api'
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

import { spotifyApi, SpotifyGate } from 'api/spotifyApi'

import { getPlaylistsFx } from '../playlists'

// export const sessionDomain = createDomain('sessionDomain')
export const onPageLoaded = createEvent()

forward({
  from: SpotifyGate.open,
  to: onPageLoaded,
})

export const $session = createStore<Session | null>(null)

guard({
  source: $session,
  clock: onPageLoaded,
  filter: (data) => !data,
  target: signInFx,
})

export const getSessionFx = createEffect<
  Parameters<typeof getSession>[0],
  Session | null
>()

getSessionFx.use(getSession)

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

guard({
  source: $userToken,
  clock: [$userToken, onPageLoaded],
  filter: (token): token is string => !!token,
  target: setTokenFx,
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
