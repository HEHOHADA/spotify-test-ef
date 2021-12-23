import { playlistAtom } from 'atoms/playlistAtom'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Song } from '../Song'

export type SongsProps = {}

export const Songs: FC<SongsProps> = (props) => {
  const {} = props
  const playlist = useRecoilValue(playlistAtom)

  return (
    <div className='text-white'>
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track.track} />
      ))}
    </div>
  )
}
