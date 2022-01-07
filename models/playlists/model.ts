import { createEffect, createStore } from 'effector'

import { spotifyApi } from 'api/spotifyApi'

import { PlaylistObjectSimplified } from 'globals/spotify'

export const getPlaylistsFx = createEffect(() => spotifyApi.getUserPlaylists())

export const $playlists = createStore<PlaylistObjectSimplified[]>([])

$playlists.on(getPlaylistsFx.doneData, (_, data) => data.body.items)
