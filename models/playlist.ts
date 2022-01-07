import { getPlaylistByIdFx } from 'api'
import { createEvent, createStore, forward, sample } from 'effector'

import { colors } from 'ui/components/Center/colors'
import { shuffle } from 'ui/helpers'

import { SinglePlaylistResponse } from 'globals/spotify'

export const setPlayListId = createEvent<string>()

export const $playlistId = createStore('0RrrIZP9lmVCaTaWV5d75c').on(
  setPlayListId,
  (_, id) => id,
)

forward({
  from: $playlistId,
  to: getPlaylistByIdFx,
})

export const $playlist = createStore<SinglePlaylistResponse | null>(null)

export const $playlistTracks = $playlist.map((p) => p?.tracks.items || [])

$playlist.on(getPlaylistByIdFx.doneData, (_, data) => data)

export const $color = createStore<string>(colors[0])

sample({
  source: $color,
  clock: $playlistId,
  fn: () => shuffle(colors).pop() as string,
  target: $color,
})
