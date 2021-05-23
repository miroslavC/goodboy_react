import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/AppState';

interface MoneyBoxProps {
    index: number;
    isActive: boolean;
    moneySum: number;
    onChange(): void;
}

function DonateMoneyBox(props: MoneyBoxProps) {
    const [donateStyle, setDonateStyle] = useState("option_donate_money_box")
    const [donateStyleValue, setDonateStyleValue] = useState("option_donate_money_box_value")

    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (!props.isActive) {
            setDonateStyle("option_donate_money_box")
            setDonateStyleValue("option_donate_money_box_value")

        } else {
            setDonateStyle("option_donate_money_box_active")
            setDonateStyleValue("option_donate_money_box_value_active")
        }

    }, [props.isActive, props.index]);

    return (
        <>
            <div className={donateStyle} onClick={() => props.onChange()}>
                <p className={donateStyleValue}>{props.moneySum} €</p>
            </div>
        </>
    );
}


export default DonateMoneyBox;