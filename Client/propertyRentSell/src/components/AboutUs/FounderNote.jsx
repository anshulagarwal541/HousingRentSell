import React from 'react'
import profilePic3 from "../../assets/AboutUs/profilePic3.jpg";
import NotePoints from './NotePoints';
function FounderNote() {
    return (
        <div>
            <div className='px-10 py-5 w-[90%] mx-auto flex flex-col gap-5'>
                <p className='font-bold text-2xl'>
                    A note from our founders.
                </p>
                <p className='text-lg'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour,
                </p>
            </div>
            <div className='flex py-10'>
                <div className='w-1/2 flex flex-col justify-evenly items-center'>
                    <NotePoints index="1" heading="It all started in 1995" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment." />
                    <NotePoints index="2" heading="Donate launches in 2007" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment." />
                    <NotePoints index="3" heading="Relasto holds its initial public offering in 2008" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment." />
                </div>
                <div className='w-1/2 flex justify-center items-center'>
                    <img src={profilePic3} alt="" className='h-[589px] rounded-3xl' />
                </div>
            </div>
        </div>
    )
}

export default FounderNote