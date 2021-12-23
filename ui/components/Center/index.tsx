import { ChevronDownIcon } from '@heroicons/react/outline'
import { playlistAtom, playlistIdState } from 'atoms/playlistAtom'
import { signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { shuffle } from 'ui/helpers/array/shuffle'
import { useSpotify } from 'ui/hooks/useSpotify'

import { Songs } from '../Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
]

export type CenterProps = {}

export const Center: FC<CenterProps> = (props) => {
  const {} = props
  const { data: session } = useSession()
  const playlistId = useRecoilValue(playlistIdState)
  const spotifyApi = useSpotify()
  const [playlist, setPlaylist] = useRecoilState(playlistAtom)

  const [color, setColor] = useState<string | null>(null)

  console.log({ playlist })
  useEffect(() => {
    const randomColor = shuffle(colors).pop()

    if (randomColor) {
      setColor(randomColor)
    }
  }, [playlistId])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body)
        })
        .catch((e) => {
          console.log('gere', e)
        })
    }
  }, [playlistId, setPlaylist, spotifyApi])

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <header className='absolute top-5 right-8'>
        <div
          onClick={signOut as () => void}
          className='flex items-center bg-black
        space-x-3 opacity-90 hover:opacity-80
         cursor-pointer rounded-full p-1 pr-2 text-white'>
          {session?.user?.image && (
            <img
              className='rounded-full w-10 h-10'
              src={session.user.image}
              alt={session?.user?.name || ''}
            />
          )}
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}>
        {playlist?.images?.[0].url && (
          <img
            src={playlist?.images?.[0].url}
            className='h-44 w-44 shadow-2xl'
            alt=''
          />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}
