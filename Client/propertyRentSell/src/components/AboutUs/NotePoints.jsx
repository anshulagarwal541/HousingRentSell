import React from 'react'

function NotePoints({ index, heading, text }) {
    return (
        <div className='flex flex-row w-[80%] justify-evenly gap-5'>
            <div className='w-[10%] h-[10%] text-xl font-extrabold rounded-full border border-5 border-black flex items-center justify-center p-5'>
                {index}
            </div>
            <div className='flex flex-col gap-5'>
                <p className='font-bold text-2xl'>
                    {heading}
                </p>
                <p className='text-[#626262]'>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default NotePoints