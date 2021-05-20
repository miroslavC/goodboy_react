import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';

function HelpOptionToggle() {
    const [isDonateConcrete, setDonateConcrete] = useState(false);
    const [isDonateAll, setDonateAll] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("OptionToggle Init")
     }, []);

    return (
        <>
            <h1 className="title_info">Vyberte si možnosť, ako <br />chcete pomôcť</h1>

            <div className="donation_toggle_wrapper">
                <div className={!isDonateConcrete ? "donation_toggle_normal" : "donation_toggle_active_left"} onClick={() => switchToggleDonate(isDonateConcrete)}>
                        <div className="logo_help_donate donate_wallet_default"></div>
                        <p className="title_left">Chcem finančne prispieť<br/> konkrétnemu útulku</p>
                </div>
                <div className={!isDonateAll ? "donation_toggle_normal_left" : "donation_toggle_active"} onClick={() => switchToggleDonate(isDonateAll)}>
                        <div className="logo_help_donate donate_pawn_selected"></div>
                        <p className="title_right">Chcem finančne prispieť<br/> celej nadácii</p>
                </div>
            </div>
        </>
    );

    // --- change donate type ---
    function switchToggleDonate(isActive: boolean){
        if(!isDonateConcrete && !isActive){
            setDonateConcrete(true)
            setDonateAll(false)

            // --- Dispatch donate All ---
            DispatcherManager.getInstance().dispatchShelterDonateType(dispatch, DonateType.DONATE_ALL)

        } else if(!isDonateAll && !isActive) {
            setDonateAll(true)
            setDonateConcrete(false)

            // --- Dispatch donate SINGLE ---
            DispatcherManager.getInstance().dispatchShelterDonateType(dispatch, DonateType.DONATE_SINGLE)
        }
    }
}


export default HelpOptionToggle;