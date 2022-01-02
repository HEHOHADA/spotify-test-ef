import { getTrackFx } from 'api'
import { createStore, guard, restore, sample } from 'effector'

export const $currentTrackId = createStore<null | string>(null)

export const $songInfo = restore(getTrackFx.doneData, null)

const $songId = $songInfo.map((v) => v?.id)

guard({
  source: sample({
    source: $songId,
    clock: $currentTrackId,
    fn: (songId, currentId) => ({ songId, currentId }),
  }),
  filter: ({ songId, currentId }) => {
    if (!currentId) {
      return false
    }

    return songId !== currentId
  },
  target: getTrackFx,
})
