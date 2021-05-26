import React, { useRef, useEffect, useState } from 'react';
import MoneyPickerInput from "./MoneyPickerInput"
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/AppState';
import { User, Shelter, DonateType} from '../../store/UserReducer';

interface MoneyBoxProps {
    index: number;
    moneyDonate: number;
    isActive: boolean;
    onChange(): void;
    setMoneyFromPicker(sum: number):void
}

function DonateMoneyBoxCustom(props: MoneyBoxProps) {
    const [donateStyle, setDonateStyle] = useState("option_donate_money_box")
    const [donateStyleValue, setDonateStyleValue] = useState("option_donate_money_box_value")
    const [sumPicked, setSumPicked] = useState(0)
    const [isPickerActive, setPickerActive] = useState(false)

    const ActiveUser = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (!props.isActive) {
            setDonateStyle("option_donate_money_box")
            setDonateStyleValue("option_donate_money_box_value")
         
        } else {
            setDonateStyle("option_donate_money_box_active")
            setDonateStyleValue("option_donate_money_box_value_active")
        }

    }, [props.isActive]);

    useEffect(() => {
        setSumPicked(props.moneyDonate)

    }, [props.moneyDonate]);

    return (
        <>
            <div className={donateStyle} onClick={() => showMoneyPicker()}>

                <p className={donateStyleValue}>{sumPicked ? sumPicked : "___"} €</p>
                {isPickerActive && <MoneyPickerInput setSumOfMoney={setMoneySum} closePicker={hideMoneyPicker} />}
                
            </div>
        </>
    );

    function showMoneyPicker() {
        setPickerActive(true)

        // --- call method on parent Component ---
        props.onChange()
    }

    function hideMoneyPicker(){
        setPickerActive(false)
    }

    // --- send MoneySum to parent ---
    function setMoneySum(sum: number){
        setSumPicked(sum)
        setPickerActive(false)

        // --- call method on parent Component ---
        props.setMoneyFromPicker(sum)
    }
}


export default DonateMoneyBoxCustom;