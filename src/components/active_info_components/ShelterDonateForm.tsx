import React, { useRef, useEffect, useState } from 'react';
import HelpOptionToggle from "../active_info_components/HelpOptionToggle"
import DogAsylumListPicker from "../active_info_components/DogAsylumListPicker"
import MoneyOptionDonate from "../active_info_components/MoneyOptionDonate"
import { AppState } from '../../store/AppState';
import { User, Shelter, DonateType} from '../../store/UserReducer';
import { ActionType} from '../../store/FormActionReducer';
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../../store/DispatcherManager';
import ValidationHelper, {InputType} from '../../util/ValidationHelper';
import { Snackbar } from '@material-ui/core';


interface DonateProps {
    // TODO
 }

function ShelterDonateForm(props: DonateProps) {
    const [moneySum, setMoneySum] = useState(0);
    const [isSnackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [donateType, setDonateType] = useState(DonateType.DONATE_DEFAULT);
    const [shelter, setShelter] = useState<Shelter>({id:0, name:""});  
    const FormAction = useSelector((state: AppState) => state.form_action);
    const dispatch = useDispatch();
    const ActiveUser = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log("ShelterDonateForm Init")
     }, []);

     useEffect(() => {
        if(ActiveUser){
            setDonateType(ActiveUser.donate_type)
            setShelter(ActiveUser.shelter)
            setMoneySum(ActiveUser.donate_sum)
        }
    }, []);

    useEffect(() => {
        if(FormAction && FormAction.form_step == 1){
            switch (FormAction.action_type) { // which setp is present 
                case ActionType.ACTION_VALIDATE:
                    validateFinalShelterDonateInput();
                    break;
    
                default:
                    break;
            }
        }
        
    }, [FormAction]);

    return (
        <>

            <Snackbar open={isSnackBarOpen} message={snackBarMessage}/>

            <div className="animate_slide_IN">

                {/* option toggle component (for shelter all/concrete)*/}
                <HelpOptionToggle setDonateToggleOption={setDataFromHelpOptionToggle} />

                {/* list of shelters component*/}
                <DogAsylumListPicker setShelterListData={setDataFromShelterListPicker} />

                {/* money donate component */}
                <MoneyOptionDonate setMoneyOptionData={setDataFromMoneyOptionDonate} />

            </div>
        </>
    );

    function validateFinalShelterDonateInput() { // --- Save Data Localy ---

        let [errorMessage, formIsOK] = ValidationHelper.getInstance().validateShelterDonateDataConstraints(shelter.name, donateType, null, null)
        let [errorMoneyMessage, isMoneyOk] = ValidationHelper.getInstance().checkMoneySum(moneySum, null)

        if (formIsOK && isMoneyOk) {

            // --- User data is OK than goto Next Step ---
            DispatcherManager.getInstance().dispatchFinalShelterDonateInfo(dispatch, donateType, ActiveUser, shelter, moneySum);

            if (FormAction) { // ---> Go to STEP_2 ---
                setTimeout(() => {
                    DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_NEXT, FormAction.form_step)
                }, 150);
            }
        } else {
            if (errorMessage != "") {
                setSnackBarMessage(errorMessage)
            } 
    
            if (errorMoneyMessage != "") {
                setSnackBarMessage(errorMoneyMessage)
            } 

            setSnackBarOpen(true)
        }
    }

    // --- Data from HelpOptionToggle child Component ---
    function setDataFromHelpOptionToggle(type: DonateType) {
        switch (type) {
            case DonateType.DONATE_SINGLE:
                setDonateType(DonateType.DONATE_SINGLE);
                break;

            case DonateType.DONATE_ALL:
                setDonateType(DonateType.DONATE_ALL);
                break;

            default: break;
        }
    }

    // --- Data from DogAsylumListPicker child Component ---
    function setDataFromShelterListPicker(shelter: Shelter) {
        setShelter(shelter)
    }

    // --- Data from MoneyOptionDonate child Component ---
    function setDataFromMoneyOptionDonate(moneySum: number) {
        setMoneySum(moneySum)
    }
}


export default ShelterDonateForm;