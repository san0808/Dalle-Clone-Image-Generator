import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md' >
        <div className='flex space-x-2 items-center'>
            <Image src="https://www.svgrepo.com/show/306500/openai.svg" alt="Logo" width={30} height={30} />
            <div>
                <h1 className='font-bold'>
                    Dalle <span className='text-orangey-500'>AI</span> Image Generator CLone
                </h1>
                
            </div>
        </div>
        <div className='flex text-xs md:text-base divide-x items-center text-gray-500'>
            <Link
                href="https://github.com/san0808/Dalle-Clone-Image-Generator"
                className='px-2 font-light'
            >
                GitHub Repo
            </Link>
        </div>
    </div>
  )
}

export default Header