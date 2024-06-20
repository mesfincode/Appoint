import React from 'react'
import { Skeleton } from './ui/skeleton'

const NotificationCardSkeleton = ({ length }: { length: number }) => {
    return (

        <div className='grid grid-cols-1 gap-4'>
            {Array.from({ length: length }, (_, index) => (
                <div className="flex flex-col" key={index}>
                    <Skeleton className="h-[100px] bg-transparent border-2 bg-gray-100 border-gray-300 w-full rounded-xl flex flex-col gap-1   p-2" >
                        <div className='flex  justify-start items-center gap-2'>
                            <Skeleton className="h-[50px] w-[50px] rounded-full" />
                           
                           <div className=''>
                           <Skeleton className="h-[13px] w-[130px] " />
                           <Skeleton className="h-[13px] w-[300px] mt-2" />

                           </div>
                         
                        </div>
                        <div className='flex justify-end '>
                        <Skeleton className="h-[13px] w-[130px] " />

                        </div>
              

                    </Skeleton>

                </div>
            ))}
        </div>

    )
}

export default NotificationCardSkeleton
