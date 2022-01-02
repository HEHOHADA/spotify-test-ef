import { spotifyApi } from 'api/spotifyApi'
import { createEffect, createStore } from 'effector'
import { PlaylistObjectSimplified } from 'globals/spotify'

export const getPlaylistsFx = createEffect({
  async handler() {
    return spotifyApi.getUserPlaylists()
  },
})

export const $playlists = createStore<PlaylistObjectSimplified[]>([])

$playlists.on(getPlaylistsFx.doneData, (_, data) => data.body.items)
