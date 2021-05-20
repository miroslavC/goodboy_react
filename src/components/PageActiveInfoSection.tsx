import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import HelpOptionToggle from "./active_info_components/HelpOptionToggle"
import DogAsylumListPicker from "./active_info_components/DogAsylumListPicker"
import MoneyOptionDonate from "./active_info_components/MoneyOptionDonate"
import ActiveInfoAction from "./active_info_components/ActiveInfoAction"
import { AppState } from '../store/AppState';
import UserDisplay  from '../components/UserDisplay';


function PageActiveInfoSection() {
  

    useEffect(() => {
        console.log("PageActiveInfoSection Init")
     }, []);

    return (
        <>
            <div className="active_info_wrapper">

                {/* option toggle component (for dog asylum all/concrete)*/}
                <HelpOptionToggle/>

                <UserDisplay/>
              
                {/* list of dog asylum component*/}
                <DogAsylumListPicker/>

                {/* money donate component */}
                <MoneyOptionDonate/>

                {/* Actions Submit/Back */}
                <ActiveInfoAction/>

            </div>
            </>
    );
}


export default PageActiveInfoSection;