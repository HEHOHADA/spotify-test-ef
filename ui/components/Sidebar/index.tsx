import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import { useEvent, useStore } from 'effector-react'
import type { FC } from 'react'

import { setPlayListId } from 'models/playlist'
import { $playlists } from 'models/playlists/model'

export type SidebarProps = {}

export const Sidebar: FC<SidebarProps> = (props) => {
  const {} = props
  const playlists = useStore($playlists)
  const setPlaylist = useEvent(setPlayListId)

  return (
    <div
      className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900
      overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem]
       lg:max-w-[15rem] hidden md:inline-flex pb-36'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LogoutIcon className='h-5 w-5' />
          <p>LogOut</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
          <HeartIcon className='h-5 w-5 text-blue-700' />
          <p>Liked songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        {playlists.map((p) => (
          <p
            className='cursor-pointer hover:text-white'
            key={p.id}
            onClick={() => setPlaylist(p.id)}>
            {p.name}
          </p>
        ))}
      </div>
    </div>
  )
}
