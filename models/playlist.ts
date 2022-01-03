import { getPlaylistByIdFx } from 'api'
import { createEvent, createStore, forward, sample } from 'effector'

import { shuffle } from 'ui/helpers'

import { SinglePlaylistResponse } from 'globals/spotify'

import { colors } from '../pages/_app'

export const setPlayListId = createEvent<string>()

export const $playlistId = createStore('0RrrIZP9lmVCaTaWV5d75c').on(
  setPlayListId,
  (_, id) => id,
)

export const $playlist = createStore<SinglePlaylistResponse | null>(null)

export const $playlistTracks = $playlist.map((p) => p?.tracks.items || [])

$playlist.on(getPlaylistByIdFx.doneData, (_, data) => data)

export const $color = createStore<string>(colors[0])

forward({
  from: $playlistId,
  to: getPlaylistByIdFx,
})

sample({
  source: $color,
  clock: $playlistId,
  fn: () => {
    return shuffle(colors).pop() as string
  },
  target: $color,
})
