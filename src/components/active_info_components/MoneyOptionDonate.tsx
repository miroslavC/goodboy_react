import React, { useRef, useEffect, useState } from 'react';
import { isFunctionLike } from 'typescript';
import DonateMoneyBox from "./DonateMoneyBox"
import DonateMoneyBoxCustom from "./DonateMoneyBoxCustom"
import { useDispatch } from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';


function MoneyOptionDonate() {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [donateSum, setDonateSum] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("MoneyOptionDonate Init")
     }, [currentIndex, setCurrentIndex]);

    return (
        <>
            <div className="option_donate_wrapper">
                <p className="option_donate_title">Suma, ktorou chcem prispieť</p>
                <div className="option_donate_money_wrapper">
                   <DonateMoneyBox index={0} isActive={currentIndex == 0} moneySum={5} onChange={() => moneyBoxActiveAction(0)}/>
                   <DonateMoneyBox index={1} isActive={currentIndex == 1} moneySum={10} onChange={() => moneyBoxActiveAction(1)}/>
                   <DonateMoneyBox index={2} isActive={currentIndex == 2} moneySum={20} onChange={() => moneyBoxActiveAction(2)}/>
                   <DonateMoneyBox index={3} isActive={currentIndex == 3} moneySum={30} onChange={() => moneyBoxActiveAction(3)}/>
                   <DonateMoneyBox index={4} isActive={currentIndex == 4} moneySum={50} onChange={() => moneyBoxActiveAction(4)}/>
                   <DonateMoneyBox index={5} isActive={currentIndex == 5} moneySum={100} onChange={() => moneyBoxActiveAction(5)}/>
                   <DonateMoneyBoxCustom index={6} isActive={currentIndex == 6} moneySum={0} onChange={() => moneyBoxActiveAction(6)}/>
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
                    DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, 5);
                }

                break;
            }
            case 1: {
                if (currentIndex != 1) {
                    console.log("List item 1 clicked")
                    setCurrentIndex(index)
                    setDonateSum(10)
                    DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, 10);
                }
                break;
            }
            case 2: {
                if (currentIndex != 2) {
                    console.log("List item 2 clicked")
                    setCurrentIndex(index)
                    setDonateSum(20)
                    DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, 20);
                }
                break;
            }
            case 3: {
                if (currentIndex != 3) {
                    console.log("List item 3 clicked")
                    setCurrentIndex(index)
                    setDonateSum(30)
                    DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, 30);
                }
                break;
            }
            case 4: {
                if (currentIndex != 4) {
                    console.log("List item 4 clicked")
                    setCurrentIndex(index)
                    setDonateSum(50)
                    DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, 50);
                }
                break;
            }
            case 5: {
                if (currentIndex != 5) {
                    console.log("List item 5 clicked")
                    setCurrentIndex(index)
                    setDonateSum(100)
                    DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, 100);
                }
                break;
            }
            case 6: {
                if (currentIndex != 6) {
                    console.log("List item 6 clicked")
                    setCurrentIndex(index)
                    setDonateSum(0)
                }
                break;
            }
            default: {
                //statements; 
                break;
            }
         }
    }
}


export default MoneyOptionDonate;