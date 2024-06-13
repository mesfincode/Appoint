import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletenComp = ({length}:{length:number}) => {
    return (
        
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                {Array.from({ length: length }, (_, index) => (
                    <div className="flex flex-col space-y-3" key={index}>
                        <Skeleton className="h-[250px] w-[250px] rounded-xl flex flex-col gap-1 justify-around  items-center" >
                            <div className='flex flex-col justify-center items-center'>
                                <Skeleton className="h-[50px] w-[50px] bg-white-4 rounded-full" />
                                {/* <Skeleton className="h-[20px] w-[100px] bg-white-3" />
                             <Skeleton className="h-[20px] w-[150px] bg-white-3" /> */}
                            </div>
                            <div className='space-y-2 flex flex-col justify-center items-center'>
                                <Skeleton className="h-[20px] w-[100px] bg-white-4" />
                                <Skeleton className="h-[5px] w-[200px] bg-white-4" />
                                <Skeleton className="h-[5px] w-[200px] bg-white-4" />
                            </div>


                        </Skeleton>

                    </div>
                ))}
            </div>
       
    )
}

export default SkeletenComp
