import React, { useRef, useEffect, useState } from 'react';
import DonateMoneyBox from "./DonateMoneyBox"
import DonateMoneyBoxCustom from "./DonateMoneyBoxCustom"
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/AppState';

interface MoneyOptionDonateProps {
    setMoneyOptionData(sumOfMoney: number): void
}

function MoneyOptionDonate(props: MoneyOptionDonateProps) {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [donateSum, setDonateSum] = useState(0);
    const [isUserActive, setUserActive] = useState(false);

    const ActiveUser = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log("MoneyOptionDonate Init")
     }, [currentIndex, setCurrentIndex]);

     useEffect(() => {
        if(ActiveUser){
            setUserActive(true)
            setDonateSum(ActiveUser.donate_sum)
        }
    }, []);

    useEffect(() => {
         // --- send donateSum to parent Component ---
         props.setMoneyOptionData(donateSum)

     }, [donateSum]);

    return (
        <>
            <div className="option_donate_wrapper">
                <p className="option_donate_title">Suma, ktorou chcem prispieť</p>
                <div className="option_donate_money_wrapper">
                    <DonateMoneyBox index={0} isActive={isUserActive && donateSum == 5 || currentIndex == 0} moneySum={5} onChange={() => moneyBoxActiveAction(0)} />
                    <DonateMoneyBox index={1} isActive={isUserActive && donateSum == 10 || currentIndex == 1} moneySum={10} onChange={() => moneyBoxActiveAction(1)} />
                    <DonateMoneyBox index={2} isActive={isUserActive && donateSum == 20 || currentIndex == 2} moneySum={20} onChange={() => moneyBoxActiveAction(2)} />
                    <DonateMoneyBox index={3} isActive={isUserActive && donateSum == 30 || currentIndex == 3} moneySum={30} onChange={() => moneyBoxActiveAction(3)} />
                    <DonateMoneyBox index={4} isActive={isUserActive && donateSum == 50 || currentIndex == 4} moneySum={50} onChange={() => moneyBoxActiveAction(4)} />
                    <DonateMoneyBox index={5} isActive={isUserActive && donateSum == 100 || currentIndex == 5} moneySum={100} onChange={() => moneyBoxActiveAction(5)} />

                    <DonateMoneyBoxCustom index={6} 
                                        moneyDonate={isUserActive  && donateSum > 100? donateSum : 0}
                                        isActive={isUserActive && donateSum > 100 || currentIndex == 6} 
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
                    setCurrentIndex(index)
                    setDonateSum(5)
                }

                break;
            }
            case 1: {
                if (currentIndex != 1) {
                    setCurrentIndex(index)
                    setDonateSum(10)
                }
                break;
            }
            case 2: {
                if (currentIndex != 2) {
                    setCurrentIndex(index)
                    setDonateSum(20)
                }
                break;
            }
            case 3: {
                if (currentIndex != 3) {
                    setCurrentIndex(index)
                    setDonateSum(30)
                }
                break;
            }
            case 4: {
                if (currentIndex != 4) {
                    setCurrentIndex(index)
                    setDonateSum(50)
                }
                break;
            }
            case 5: {
                if (currentIndex != 5) {
                    setCurrentIndex(index)
                    setDonateSum(100)
                }
                break;
            }
            case 6: {
                if (currentIndex != 6) {
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