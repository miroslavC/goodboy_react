import React, { useRef, useEffect, useState } from 'react';
import HelpOptionToggle from "./active_info_components/HelpOptionToggle"
import DogAsylumList from "./active_info_components/DogAsylumList"
import MoneyOptionDonate from "./active_info_components/MoneyOptionDonate"
import ActiveInfoAction from "./active_info_components/ActiveInfoAction"


function PageActiveInfoSection() {

    useEffect(() => {
        console.log("PageActiveInfoSection Init")
     }, []);

    return (
        <>
            <div className="active_info_wrapper">

                {/* option toggle component (for dog asylum all/concrete)*/}
                <HelpOptionToggle/>
              
                {/* list of dog asylum component*/}
                <DogAsylumList/>

                {/* money donate component */}
                <MoneyOptionDonate/>

                {/* Actions Submit/Back */}
                <ActiveInfoAction/>

            </div>
        </>
    );
}


export default PageActiveInfoSection;