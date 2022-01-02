import { createEvent, createStore, guard, sample } from 'effector'

import {
  getMyCurrentPlaybackStateFx,
  getMyCurrentPlayingTrackFx,
  pauseSongFx,
  playSongByUrlFx,
  playSongFx,
} from '../api'
import { TrackObjectFull } from '../globals/spotify'
import { $currentTrackId, $songInfo } from './songInfo/model'

export const setIsPlaying = createEvent<boolean>()

export const $isPlaying = createStore(false)

$isPlaying.on(setIsPlaying, (_, isPlaying) => isPlaying)

export const playSong = createEvent<TrackObjectFull>()

sample({
  clock: playSong,
  fn: (track) => {
    return track.id
  },
  target: $currentTrackId,
})

guard({
  clock: playSong.map((v) => v.uri),
  filter: (track): track is string => !!track,
  target: playSongByUrlFx,
})

sample({
  clock: playSongByUrlFx.done,
  fn: () => true,
  target: setIsPlaying,
})

const dataIsDefined = <T>(data: T) => typeof data !== 'undefined'

guard({
  source: $currentTrackId,
  filter: $songInfo.map((song) => !song),
  target: getMyCurrentPlayingTrackFx,
})

guard({
  source: getMyCurrentPlayingTrackFx.doneData.map(
    (data) => data.item?.is_playable as boolean,
  ),
  filter: dataIsDefined,
  target: setIsPlaying,
})

guard({
  source: getMyCurrentPlayingTrackFx.doneData.map(
    (data) => data.item?.id as string,
  ),
  filter: dataIsDefined,
  target: $currentTrackId,
})

guard({
  source: getMyCurrentPlaybackStateFx.doneData,
  filter: (data) => data.is_playing,
  target: [pauseSongFx, setIsPlaying.prepend(() => false)],
})

guard({
  source: getMyCurrentPlaybackStateFx.doneData,
  filter: (data) => !data.is_playing,
  target: [playSongFx, setIsPlaying.prepend(() => true)],
})
