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
    const [donateType, setDonateType] = useState(DonateType.DONATE_DEFAULT);
    const [shelter, setShelter] = useState<Shelter>({id:0, name:""});  

    const [errorMessage, setErrorMessage] = useState("");
    const [errorMoneyMessage, setErrorMoneyMessage] = useState("");

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
            {/* option toggle component (for shelter all/concrete)*/}
            <HelpOptionToggle setDonateToggleOption={setDataFromHelpOptionToggle}/>

            {/* list of shelters component*/}
            <DogAsylumListPicker setShelterListData={setDataFromShelterListPicker}/>

            {/* money donate component */}
            <MoneyOptionDonate setMoneyOptionData={setDataFromMoneyOptionDonate}/>

            {errorMessage != "" && <div className="error_donate_wrapper"><p className="error_donate">{errorMessage}</p></div>}
            {errorMoneyMessage != "" && <div className="error_donate_wrapper"><p className="error_donate">{errorMoneyMessage}</p></div>}
    
        </>
    );

    function validateFinalShelterDonateInput() { // --- Save Data Localy ---

        let [errorMessage, formIsOK] = validateDataConstraints()
        let [errorMoneyMessage, isMoneyOk] = checkMoneySum()

        if (formIsOK && isMoneyOk) {

            // --- User data is OK than goto Next Step ---
            DispatcherManager.getInstance().dispatchFinalShelterDonateInfo(dispatch, donateType, ActiveUser, shelter, moneySum);

            if (FormAction) { // ---> Go to STEP_2 ---
                setTimeout(() => {
                    DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_NEXT, FormAction.form_step)
                }, 500);
            }
        } else {
            if (errorMessage != "") {
                setErrorMessage(errorMessage)
            } else {
                setErrorMessage("")
            }
    
            if (errorMoneyMessage != "") {
                setErrorMoneyMessage(errorMoneyMessage)
            } else {
                setErrorMoneyMessage("")
            }
        }
    }

    // --- Data from HelpOptionToggle child Component ---
    function setDataFromHelpOptionToggle(type: DonateType) {
        switch (type) {
            case DonateType.DONATE_SINGLE:
                setDonateType(DonateType.DONATE_SINGLE);
                setErrorMessage("")
                break;

            case DonateType.DONATE_ALL:
                setDonateType(DonateType.DONATE_ALL);
                setErrorMessage("")
                break;

            default: break;
        }
    }

    // --- Data from DogAsylumListPicker child Component ---
    function setDataFromShelterListPicker(shelter: Shelter) {
        setShelter(shelter)
        setErrorMessage("")
    }

    // --- Data from MoneyOptionDonate child Component ---
    function setDataFromMoneyOptionDonate(moneySum: number) {
        setMoneySum(moneySum)
        setErrorMoneyMessage("")
    }

    function validateDataConstraints(): [string, boolean] {
        let errorMessage = ""
        let donateIsOk = false;

        // --- Check if donate type is checked ---
        switch (donateType) {
            case DonateType.DONATE_SINGLE:
                if (!shelter.name) {
                    errorMessage = "Zabudli ste vybrat utulok, ktoremu chcete pomoct"
                    donateIsOk = false
                } else {
                    donateIsOk = true;
                }
                break;

            case DonateType.DONATE_ALL:
                donateIsOk = true;
                break;

            case DonateType.DONATE_DEFAULT:
                errorMessage = "Msite zvolit druh pomoci"
                donateIsOk = false
                break;

            default: break;
        }

        return [errorMessage, donateIsOk]
    }

    function checkMoneySum(): [string, boolean] {
        let errorMessage = ""
        let donateIsOk = false;

        // --- Check money ---
        if (moneySum == 0) {
            donateIsOk = false;
            errorMessage = "Zabudli ste vybrat sumu prispevku"
        } else {
            donateIsOk = true;
        }

        return [errorMessage, donateIsOk]
    }
}


export default ShelterDonateForm;