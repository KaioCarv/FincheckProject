import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { cn } from '../../app/utils/cd'


export function DropdownMenuRoot({children} : {children : React.ReactNode}){
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  )
}

export function DropdownMenuTrigger({children} : {children : React.ReactNode}){
  return (
    <RdxDropdownMenu.Trigger className='outline-none' asChild>
      {children}
    </RdxDropdownMenu.Trigger>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode,
  className?: string;
}

export function DropdownMenuContent({children, className} : DropdownMenuContentProps ){
  return (
   <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
      className={cn(
        'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]',
        'data-[side=bottom]:animate-slide-up-and-fade',
        'data-[side=top]:animate-slide-down-and-fade',
        className,
      )}
      >
        {children}
      </RdxDropdownMenu.Content>
   </RdxDropdownMenu.Portal>
  )
}

interface DropdownMenuProps {
  children: React.ReactNode,
  className?: string;
  onSelect?(): void;
}

export function DropdownMenuItem({children, className, onSelect} : DropdownMenuProps){
  return (
      <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[40px] outline-none flex items-center px-4 py-2 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer',
         className,
      )}
      >
        {children}
      </RdxDropdownMenu.Item>
  )
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
}
