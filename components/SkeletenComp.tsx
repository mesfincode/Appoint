import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletenComp = ({ length }: { length: number }) => {
    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
            {Array.from({ length: length }, (_, index) => (
                <div className="flex flex-col space-y-3" key={index}>
                    <Skeleton className="h-[230px] max-sm:w-full bg-transparent border-2 bg-gray-100 border-gray-300 w-full rounded-xl flex flex-col gap-8 pt-4 items-center" >
                        <div className='flex flex-col justify-center items-center'>
                            <Skeleton className="h-[50px] w-[50px] rounded-full" />
                            {/* <div className=' flex gap-2 pt-5'> 
                                 <Skeleton className="h-[13px] w-[80px] " />
                                <Skeleton className="h-[13px] w-[80px] " />
                                
                            </div> */}
                            <Skeleton className="h-[13px] w-[130px] mt-5" />

                            {/* <Skeleton className="h-[20px] w-[100px] bg-white-3" />
                             <Skeleton className="h-[20px] w-[150px] bg-white-3" /> */}
                        </div>
                        <div className='space-y-2 flex flex-col justify-center items-center'>
                            <Skeleton className="h-[5px] w-[200px] " />
                            <Skeleton className="h-[5px] w-[200px] " />
                        </div>


                    </Skeleton>

                </div>
            ))}
        </div>

    )
}

export default SkeletenComp
