import { currentTrackIdState, isPlayingState } from 'atoms/songAtom'
import type { FC } from 'react'
import { useRecoilState } from 'recoil'

import { millisToMinutesAndSeconds } from 'ui/helpers/date/time'
import { useSpotify } from 'ui/hooks/useSpotify'

import TrackObjectFull = SpotifyApi.TrackObjectFull

export type SongProps = {
  track: TrackObjectFull
}

export const Song: FC<SongProps> = (props) => {
  const { track } = props
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.id)
    setIsPlaying(true)

    spotifyApi.play({
      uris: [track.uri],
    })
  }

  return (
    <div
      className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900'
      onClick={playSong}>
      <div className='flex items-center space-x-4'>
        <p>{track.track_number + 1}</p>
        <img className='w-10 h-10' src={track.album.images[0].url} alt='' />
        <div>
          <p className='w-36 lg:w-64 text-white truncate'>{track.name}</p>
          <p className='w-40'>{track.artists[0].name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='w-40 hidden md:inline'>{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  )
}
