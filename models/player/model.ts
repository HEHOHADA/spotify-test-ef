import { getMyCurrentPlaybackStateFx, setVolumeFx } from 'api'
import { createEvent, forward, restore } from 'effector'

import { debounce } from 'ui/helpers/effector/debounce'

export const setVolume = createEvent<number>()

export const $volume = restore(setVolume, 50)

debounce({
  source: $volume,
  timeout: 500,
  target: setVolumeFx,
})

export const pauseSong = createEvent<void>()

forward({
  from: pauseSong,
  to: getMyCurrentPlaybackStateFx,
})
