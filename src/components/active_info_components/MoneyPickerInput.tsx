import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';

interface MoneyPickerProps {
    setSumOfMoney(sum: number): void
    closePicker(): void;
}

function MoneyPickerInput(props: MoneyPickerProps) {
    const [moneySum, setMoneySum] = useState(0);
    const dispatch = useDispatch();

    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log("MoneyPickerInput Init")
     }, []);

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            props.setSumOfMoney(moneySum)
            props.closePicker()
        }
    };
     const onChangeMoneySum = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const sumFromInput = e.target.value ? Number(e.target.value) : 0;
        setMoneySum(sumFromInput)
      }

    return (
        <>
            <div className="money_picker">
                <p className="money_picker_title">Zadajte ľubovolnú sumu:</p>
                <p className="money_picker_value">{moneySum} €</p>
                <input type="number" className="money_picker_input" id="money_picker" name="money_picker"
                    min="10" max="100" onChange={onChangeMoneySum}  onKeyDown={handleEnterPress}></input>
            </div>

        </>
    );
}


export default MoneyPickerInput;