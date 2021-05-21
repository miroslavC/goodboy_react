import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import HelpOptionToggle from "./active_info_components/HelpOptionToggle"
import DogAsylumListPicker from "./active_info_components/DogAsylumListPicker"
import MoneyOptionDonate from "./active_info_components/MoneyOptionDonate"
import ActiveInfoAction from "./active_info_components/ActiveInfoAction"
import UserForm from "./active_info_components/UserForm"
import { ActionType} from '../store/FormActionReducer';
import { useDispatch } from 'react-redux';

import { AppState } from '../store/AppState';
import UserDisplay  from '../components/UserDisplay';
import DispatcherManager from '../store/DispatcherManager';


function PageActiveInfoSection() {
    const [isActionBack, setActionBack] = useState(false);
    const [isActionNext, setActionNext] = useState(false);
    const [isActionSubmit, setActionSubmit] = useState(false);

    const dispatch = useDispatch();
  
    useEffect(() => {
        console.log("PageActiveInfoSection Init")
     }, []);

    return (
        <>
            <div className="active_info_wrapper">

                <UserForm/>

                {/* option toggle component (for dog asylum all/concrete)*/}
                {/* <HelpOptionToggle/> */}

                {/* <UserDisplay/> */}
              
                {/* list of dog asylum component*/}
                {/* <DogAsylumListPicker/> */}

                {/* money donate component */}
                {/* <MoneyOptionDonate/> */}

                {/* Actions Submit/Back */}
                <ActiveInfoAction formActionBack={FormActionBack} formActionNext={FormActionNext} formActionSubmit={FormActionSubmit}/>

            </div>
            </>
    );

    function FormActionBack(): void {
        console.log("FormActionBack was clicked!!!");
        setActionBack(true)
        setActionNext(false)
        setActionSubmit(false)
    }

    function FormActionNext(): void {
        console.log("FormActionNext was clicked!!!");
     
        // --- Action next ---
        DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_NEXT);
    }

    function FormActionSubmit() : void{
        console.log("FormActionSubmit was clicked!!!");
        setActionBack(false)
        setActionNext(false)
        setActionSubmit(true)
    }
}


export default PageActiveInfoSection;