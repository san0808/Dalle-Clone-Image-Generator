"use client"; 
import React from 'react'
import useSWR from 'swr'

function PromptInput() {
    const [prompt, setPrompt] = React.useState('')
    const { data: suggestions, mutate ,isValidating ,isLoading } = useSWR(
        '/api/suggestion', 
        { 
            revalidateOnFocus: false,
        }
    )

  return (
    <div className='m-10'>
        <form className='flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'>
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter a Prompt ...' 
                className='flex-1 p-4 outline-none rounded-md'
            />

            <button 
                className={`p-4 ${prompt ? 'bg-violet-500 text-white transition-colors duration-200' : 'text-gray-300 cursor-not-allowed'}  `} 
                type='submit'
                disabled={prompt.length === 0}
            >
                Generate
            </button>

            <button className='p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400 ' type='button'>
                Use Suggestion
            </button>

            <button className='p-4 bg-white text-violet-500 border-none transition-colors duration-200 font-bold rounded-b-md  md:rounded-r-md md:rounded-bl-none   ' type='button'>
                New Suggestion
            </button>

        </form>
    </div>
  )
}

export default PromptInput