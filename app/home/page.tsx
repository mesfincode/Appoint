import React from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs';

const page = () => {
  return (
    <div>
      <h1>This is home page</h1>
      <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

    </div>
  )
}

export default page
