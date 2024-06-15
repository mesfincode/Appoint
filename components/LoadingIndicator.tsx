import React from 'react'
import {  CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const LoadingIndicator = () => {

  return (
    <div className='h-screen w-full flex justify-center items-center gap-2 flex-col'>
      <ClockLoader color="#47689A" />
      <h1 className='text-black-2 font-bold'>Loading ...</h1>
    </div>
  )
}

export default LoadingIndicator
