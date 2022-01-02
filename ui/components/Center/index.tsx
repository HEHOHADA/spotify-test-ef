import { ChevronDownIcon } from '@heroicons/react/outline'
import { useStore } from 'effector-react'
import { signOut } from 'next-auth/react'
import type { FC } from 'react'

import { $color, $playlist } from 'models/playlist'
import { $user } from 'models/user/model'

import { Songs } from '../Songs'

export type CenterProps = {}

export const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
]

export const Center: FC<CenterProps> = (props) => {
  const {} = props
  const user = useStore($user)
  const playlist = useStore($playlist)

  const color = useStore($color)

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <header className='absolute top-5 right-8'>
        <div
          onClick={signOut as () => void}
          className='flex items-center bg-black
        space-x-3 opacity-90 hover:opacity-80
         cursor-pointer rounded-full p-1 pr-2 text-white'>
          {user?.image && (
            <img
              className='rounded-full w-10 h-10'
              src={user.image}
              alt={user?.name || ''}
            />
          )}
          <h2>{user?.name}</h2>
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
