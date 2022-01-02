import { createEffect } from 'effector'
import { signIn } from 'next-auth/react'

import { spotifyApi } from './spotifyApi'

export const signInFx = createEffect({
  async handler() {
    signIn()
  },
})

export const getTrackFx = createEffect({
  async handler({ currentId }: { songId?: string; currentId: string | null }) {
    return spotifyApi.getTrack(currentId!).then((res) => res.body)
  },
})

export const playSongByUrlFx = createEffect({
  async handler(url: string) {
    spotifyApi.play({
      uris: [url],
    })
  },
})

export const getPlaylistByIdFx = createEffect({
  async handler(id: string) {
    return spotifyApi.getPlaylist(id).then((data) => data.body)
  },
})

export const getMyCurrentPlayingTrackFx = createEffect({
  async handler() {
    return spotifyApi.getMyCurrentPlayingTrack().then((data) => data.body)
  },
})

export const getMyCurrentPlaybackStateFx = createEffect({
  async handler() {
    return spotifyApi.getMyCurrentPlaybackState().then((data) => data.body)
  },
})

export const setVolumeFx = createEffect((volume: number) => {
  return spotifyApi.setVolume(volume)
})

export const playSongFx = createEffect(() => {
  spotifyApi.play()
})

export const pauseSongFx = createEffect(() => {
  spotifyApi.pause()
})
