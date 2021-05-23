import React, { useRef, useEffect, useState } from 'react';
import HelpOptionToggle from "./active_info_components/HelpOptionToggle"
import DogAsylumListPicker from "./active_info_components/DogAsylumListPicker"
import MoneyOptionDonate from "./active_info_components/MoneyOptionDonate"
import ActiveInfoAction from "./active_info_components/ActiveInfoAction"
import UserForm from "./active_info_components/UserForm"
import UserChceckFormInfo from "./active_info_components/UserChceckFormInfo"
import ShelterDonateForm from "./active_info_components/ShelterDonateForm"
import { AppState } from '../store/AppState';
import { ActionType} from '../store/FormActionReducer';
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../store/DispatcherManager';


function PageActiveInfoSection() {
    const [formStepNumber, setFormStepNumber] = useState(0);
    const [screenDonateIsActive, setScreenDonateActive] = useState(false);
    const [screenUserFormIsActive, setScreenUserFormActive] = useState(false);
    const [screenFormCheckIsActive, setScreenFormCheckActive] = useState(false);

    const formAction = useSelector((state: AppState) => state.form_action);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("XXXXXX Init")
     }, [screenDonateIsActive, screenUserFormIsActive, screenFormCheckIsActive]);
  
    useEffect(() => {
        console.log("PageActiveInfoSection Init")
        if (formAction) {
            setFormStepNumber(formAction.form_step) // --- local state for step number
        }    
     }, [formAction]);

    if(formAction){
        return (
            <>
                <div className="active_info_wrapper">

                    {/* (STEP_1) donate for shelter with options */}
                    {formAction.form_step == 1 && <ShelterDonateForm/>}
    
                    {/* (STEP_2) User info form input */}
                    {formAction.form_step == 2 && <UserForm/>}
    
                    {/* (STEP_3) User info check with final confirm */}
                    {formAction.form_step == 3 && <UserChceckFormInfo />}
    
                    {/* Actions Back/Next/Submit buttons in All screen */}
                    <ActiveInfoAction formActionBack={FormActionBack} formActionNext={FormActionNext} formActionSubmit={FormActionSubmit} />
    
                </div>
            </>
        );
    } else {
        return null; // TODO svg circle loading...?
    }
  
    // --- Form Button Action method ---
    function FormActionBack(): void {
        // --- Action Back ---
        DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_BACK, formStepNumber);
    }

    function FormActionNext(): void {
        switch (formStepNumber) { // which setp is present 
            case 1: 
                // --- dispatch STEP_1 ---
                DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_VALIDATE, formStepNumber);
                break;

            case 2:
                // --- dispatch STEP_2 ---
                DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_VALIDATE, formStepNumber);
                break;

            case 3:
                // --- dispatch STEP_3 ---
                break;

            default:
                break;

        }
    }

    function FormActionSubmit() : void{
        console.log("FormActionSubmit was clicked!!!");

         // --- Action Submit ---
        DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_SUBMIT, formStepNumber);
    }
}


export default PageActiveInfoSection;