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
    const [isFinalConfirmCheck, setFinalConfirmCheck] = useState(false);

    const FormAction = useSelector((state: AppState) => state.form_action);
    const ActiveUser = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("XXXXXX Init")
     }, [screenDonateIsActive, screenUserFormIsActive, screenFormCheckIsActive]);
  
    useEffect(() => {
        console.log("PageActiveInfoSection Init")
        if (FormAction) {
            setFormStepNumber(FormAction.form_step) // --- local state for step number
        }    
     }, [FormAction]);

    if(FormAction){
        return (
            <>
                <div className="active_info_wrapper">

                    {/* (STEP_1) donate for shelter with options */}
                    {FormAction.form_step == 1 && <ShelterDonateForm/>}
    
                    {/* (STEP_2) User info form input */}
                    {FormAction.form_step == 2 && <UserForm/>}
    
                    {/* (STEP_3) User info check with final confirm */}
                    {FormAction.form_step == 3 && <UserChceckFormInfo/>}
    
                    {/* Actions Back/Next/Submit buttons in All screen */}
                    <ActiveInfoAction formStep={formStepNumber} formActionBack={FormActionBack} formActionNext={FormActionNext} formActionSubmit={FormActionSubmit} />
    
                </div>
            </>
        );
    } else {
        return null; // TODO svg circle loading...?
    }
  
    /******************************************************************************
     *       --- Action Method for navigation between pages ---
     * ****************************************************************************/
    function FormActionBack(): void { // --- Action STEP Back ---
        DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_BACK, formStepNumber);
    }

    function FormActionNext(): void {
        switch (formStepNumber) { // --- which setp is present ---
            case 1:
                // --- validate in STEP_1 ---
                DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_VALIDATE, formStepNumber);
                break;

            case 2:
                // --- validate in STEP_2 ---
                DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_VALIDATE, formStepNumber);

                if (FormAction) { // ---> Go to STEP_3 ---
                    setTimeout(() => {
                        DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_NEXT, FormAction.form_step)
                    }, 500);
                }
                break;

            default:
                break;
        }
    }

     /******************************************************************************
     *       --- Final From Submit ---
     * ****************************************************************************/
    function FormActionSubmit(): void {

        if (FormAction) {
            // --- Action Submit in STEP_3 ---
            DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_SUBMIT, FormAction.form_step);
        }
    }
}


export default PageActiveInfoSection;