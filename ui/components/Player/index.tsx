import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { useEvent, useStore } from 'effector-react/ssr'
import type { FC } from 'react'

import { $isPlaying } from 'models/currentTrackId'
import { $volume, pauseSong, setVolume } from 'models/player/model'
import { $songInfo } from 'models/songInfo/model'

export type PlayerProps = {}

export const Player: FC<PlayerProps> = (props) => {
  const {} = props
  const isPlaying = useStore($isPlaying)
  const volume = useStore($volume)
  const handlePlayPause = useEvent(pauseSong)
  const changeVolume = useEvent(setVolume)

  const songInfo = useStore($songInfo)

  const MainPlayerIcon = isPlaying ? PauseIcon : PlayIcon

  return (
    <div
      className='h-24 bg-gradient-to-b from-black to-gray-900
    text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      <div className='flex items-center space-x-4'>
        <img
          className='hidden md:inline h-10 w-10'
          src={songInfo?.album.images?.[0]?.url}
          alt=''
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='button' />
        <RewindIcon className='button' />
        <MainPlayerIcon
          onClick={handlePlayPause}
          className='button w-10 h-10'
        />
        <FastForwardIcon className='button' />
        <ReplyIcon className='button' />
      </div>
      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <VolumeUpIcon
          onClick={() => volume > 0 && changeVolume(volume - 10)}
          className='button'
        />
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e) => changeVolume(+e.target.value)}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && changeVolume(volume + 10)}
          className='button'
        />
      </div>
    </div>
  )
}
