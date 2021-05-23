import React, { useRef, useEffect, useState } from 'react';
import { isFunctionLike } from 'typescript';
import DonateMoneyBox from "./DonateMoneyBox"
import DonateMoneyBoxCustom from "./DonateMoneyBoxCustom"
import { useDispatch, useSelector } from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';

interface MoneyOptionDonateProps {
    setMoneyOptionData(sumOfMoney: number): void
}

function MoneyOptionDonate(props: MoneyOptionDonateProps) {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [donateSum, setDonateSum] = useState(0);

    const user = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
         // --- send donateSum to parent Component ---
         props.setMoneyOptionData(donateSum)

     }, [donateSum]);
           
    useEffect(() => {
        console.log("MoneyOptionDonate Init")
     }, [currentIndex, setCurrentIndex]);

    return (
        <>
            <div className="option_donate_wrapper">
                <p className="option_donate_title">Suma, ktorou chcem prispieť</p>
                <div className="option_donate_money_wrapper">
                    <DonateMoneyBox index={0} isActive={user != null && user.donate_sum == 5 || currentIndex == 0} moneySum={5} onChange={() => moneyBoxActiveAction(0)} />
                    <DonateMoneyBox index={1} isActive={user != null && user.donate_sum == 10 || currentIndex == 1} moneySum={10} onChange={() => moneyBoxActiveAction(1)} />
                    <DonateMoneyBox index={2} isActive={user != null && user.donate_sum == 20 || currentIndex == 2} moneySum={20} onChange={() => moneyBoxActiveAction(2)} />
                    <DonateMoneyBox index={3} isActive={user != null && user.donate_sum == 30 || currentIndex == 3} moneySum={30} onChange={() => moneyBoxActiveAction(3)} />
                    <DonateMoneyBox index={4} isActive={user != null && user.donate_sum == 50 || currentIndex == 4} moneySum={50} onChange={() => moneyBoxActiveAction(4)} />
                    <DonateMoneyBox index={5} isActive={user != null && user.donate_sum == 100 || currentIndex == 5} moneySum={100} onChange={() => moneyBoxActiveAction(5)} />

                    <DonateMoneyBoxCustom index={6} 
                                        moneyDonate={donateSum}
                                        isActive={user != null && user.donate_sum > 100 || currentIndex == 6} 
                                        onChange={() => moneyBoxActiveAction(6)} 
                                        setMoneyFromPicker={setMoneyFromMoneyPicker}/>
                </div>
            </div>

        </>
    );

    function moneyBoxActiveAction(index: number){
        switch (index) {
            case 0: {
                if (currentIndex != 0) { // --- not Active (marked) ---
                    console.log("List item 0 clicked")
                    setCurrentIndex(index)
                    setDonateSum(5)
                }

                break;
            }
            case 1: {
                if (currentIndex != 1) {
                    console.log("List item 1 clicked")
                    setCurrentIndex(index)
                    setDonateSum(10)
                }
                break;
            }
            case 2: {
                if (currentIndex != 2) {
                    console.log("List item 2 clicked")
                    setCurrentIndex(index)
                    setDonateSum(20)
                }
                break;
            }
            case 3: {
                if (currentIndex != 3) {
                    console.log("List item 3 clicked")
                    setCurrentIndex(index)
                    setDonateSum(30)
                }
                break;
            }
            case 4: {
                if (currentIndex != 4) {
                    console.log("List item 4 clicked")
                    setCurrentIndex(index)
                    setDonateSum(50)
                }
                break;
            }
            case 5: {
                if (currentIndex != 5) {
                    console.log("List item 5 clicked")
                    setCurrentIndex(index)
                    setDonateSum(100)
                }
                break;
            }
            case 6: {
                if (currentIndex != 6) {
                    console.log("List item 6 clicked")
                    setCurrentIndex(index)
                }
                break;
            }
            default: {
                //statements; 
                break;
            }
         }
    }

    function setMoneyFromMoneyPicker(sumOfMoney: number){
        setDonateSum(sumOfMoney)
    }
}


export default MoneyOptionDonate;