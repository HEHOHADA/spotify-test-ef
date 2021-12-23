import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { currentTrackIdState, isPlayingState } from 'atoms/songAtom'
import { useSession } from 'next-auth/react'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { useSongInfo } from 'ui/hooks/useSongInfo'
import { useSpotify } from 'ui/hooks/useSpotify'

import { debounce } from '../../helpers/function/debounce'

export type PlayerProps = {}

export const Player: FC<PlayerProps> = (props) => {
  const {} = props
  const { data } = useSession()
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState<number>(50)

  const songInfo = useSongInfo()
  const fetchCurrentSong = useCallback(() => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((res) => {
        res.body?.item?.id && setCurrentTrackId(res.body.item.id)
        res.body?.is_playing && setIsPlaying(res.body.is_playing)
      })
    }
  }, [setCurrentTrackId, setIsPlaying, songInfo, spotifyApi])

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
    }
  }, [currentTrackId, spotifyApi, data, fetchCurrentSong])

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  const MainPlayerIcon = isPlaying ? PauseIcon : PlayIcon

  const debouncedAdjustVolume = useCallback(
    debounce<number>((currentVolume) => {
      console.log(currentVolume)
      spotifyApi.setVolume(currentVolume).catch(() => {})
    }, 500),
    [],
  )

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [debouncedAdjustVolume, volume])

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
          onClick={() => volume > 0 && setVolume((prev) => prev - 10)}
          className='button'
        />
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume((prev) => prev + 10)}
          className='button'
        />
      </div>
    </div>
  )
}
