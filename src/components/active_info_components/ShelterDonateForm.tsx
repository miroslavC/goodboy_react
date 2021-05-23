import React, { useRef, useEffect, useState } from 'react';
import HelpOptionToggle from "../active_info_components/HelpOptionToggle"
import DogAsylumListPicker from "../active_info_components/DogAsylumListPicker"
import MoneyOptionDonate from "../active_info_components/MoneyOptionDonate"
import { AppState } from '../../store/AppState';
import { User, Shelter, DonateType} from '../../store/UserReducer';
import { ActionType} from '../../store/FormActionReducer';
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../../store/DispatcherManager';

interface DonateProps {
    // TODO
 }

function ShelterDonateForm(props: DonateProps) {
    const [isActionBack, setActionBack] = useState(false);
    const [isActionNext, setActionNext] = useState(false);
    const [isActionSubmit, setActionSubmit] = useState(false);
    const [moneySum, setMoneySum] = useState(0);
    const [donateType, setDonateType] = useState(DonateType.DONATE_SINGLE);
    const [shelter, setShelter] = useState<Shelter>({id:0, name:""});  

    const formAction = useSelector((state: AppState) => state.form_action);
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log("ShelterDonateForm Init")
     }, []);

    useEffect(() => {
        if(formAction){
            switch (formAction.action_type) { // which setp is present 
                case ActionType.ACTION_NEXT: 
                    console.log("AAAAA ShelterDonateForm ACTION_NEXT")
                    break;
    
                case ActionType.ACTION_VALIDATE:
                    console.log("AAAAA ShelterDonateForm ACTION_VALIDATE")
                    validateFinalShelterDonateInput();
                    break;
    
                case ActionType.ACTION_BACK:
                    console.log("AAAAA ShelterDonateForm ACTION_BACK")
                    break;
    
                default:
                    break;
    
            }
        }
        
    }, [formAction]);
  
    return (
        <>
            {/* option toggle component (for shelter all/concrete)*/}
            <HelpOptionToggle setDonateToggleOption={setDataFromHelpOptionToggle}/>

            {/* list of shelters component*/}
            <DogAsylumListPicker setShelterListData={setDataFromShelterListPicker}/>

            {/* money donate component */}
            <MoneyOptionDonate setMoneyOptionData={setDataFromMoneyOptionDonate}/>
            
        </>
    );

    function validateFinalShelterDonateInput() {
        console.log("OK User data -> Dispatch Shelter donate data")

        // --- User data is OK than goto Next Step ---
        DispatcherManager.getInstance().dispatchFinalShelterDonateInfo(dispatch, donateType, shelter, moneySum);

        // then call action next
        if(formAction){
            // --- svg animation ?
            setTimeout(() => {
                DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_NEXT, formAction.form_step);
            }, 1000);
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
        console.log("QQQQQQQQQ MOney: ", moneySum)
        setMoneySum(moneySum)
    }
}


export default ShelterDonateForm;