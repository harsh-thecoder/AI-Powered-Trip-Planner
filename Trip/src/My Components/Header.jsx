import React from 'react'
import { Button } from '@/components/ui/button'

function Header() {
    return (
        <div className='p-3 flex justify-between items-center'>
            <div className='h-30 w-20'>
                <img src="/logo.jpg" alt="" />
            </div>
            <div className=''>
                <Button>Sign In</Button>
            </div>
        </div>

    )
}

export default Header