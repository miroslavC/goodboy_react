import React, { useRef, useEffect, useState } from 'react';
import MoneyPickerInput from "./MoneyPickerInput"

interface MoneyBoxProps {
    index: number;
    isActive: boolean;
    moneySum: number;
    onChange(): void;
}

function DonateMoneyBoxCustom(props: MoneyBoxProps) {
    const [donateStyle, setDonateStyle] = useState("option_donate_money_box")
    const [donateStyleValue, setDonateStyleValue] = useState("option_donate_money_box_value")
    const [sumPicked, setSumPicked] = useState(0)
    const [isPickerActive, setPickerActive] = useState(false)

    useEffect(() => {
        if (!props.isActive) {
            setDonateStyle("option_donate_money_box")
            setDonateStyleValue("option_donate_money_box_value")
            hideMoneyPicker()

        } else {
            setDonateStyle("option_donate_money_box_active")
            setDonateStyleValue("option_donate_money_box_value_active")
            showMoneyPicker()
        }

    }, [props.isActive, props.index]);

    return (
        <>
            <div className={donateStyle} onClick={() => props.onChange()}>
                <p className={donateStyleValue}>{sumPicked > 0? sumPicked : "___"} €</p>
                {isPickerActive && <MoneyPickerInput closePicker={hideMoneyPicker}/>}
            </div>
        </>
    );

    function showMoneyPicker(){
        setPickerActive(true)
    }

    function hideMoneyPicker(){
        setPickerActive(false)
    }
}


export default DonateMoneyBoxCustom;