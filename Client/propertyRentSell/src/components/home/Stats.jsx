import React from 'react'
import fire from "../../assets/fire.svg";
import smilie from "../../assets/smilie.svg";
import pinpoint from "../../assets/pinpoint.svg";
import dollars from "../../assets/dollars.svg";
import Statistics from './Statistics';
function Stats() {
    return (
        
        <div className='bg-[#fff9f5] flex sm:flex-row flex-col items-center'>
            <Statistics icon={dollars} text="Owned from Properties transactions" stats="$15.4M" />
            <Statistics icon={pinpoint} text="Properties for Buy & sell Successfully" stats="25K+" />
            <Statistics icon={fire} text="Daily completed transactions" stats="500" />
            <Statistics icon={smilie} text="Reagular Clients" stats="600+" />
        </div>
    )
}

export default Stats;