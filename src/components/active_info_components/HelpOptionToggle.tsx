import React, { useRef, useEffect, useState } from 'react';
import { useDispatch,  useSelector} from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';

interface HelpOptionToggleProps{
    setDonateToggleOption(type: DonateType): void;
}

function HelpOptionToggle(props: HelpOptionToggleProps) {
    const [isDonateConcrete, setDonateConcrete] = useState(false);
    const [isDonateAll, setDonateAll] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector((state: AppState) => state.user);
    const form = useSelector((state: AppState) => state.form_action);

    useEffect(() => {
        console.log("OptionToggle Init")

        if (user) { // --- fill form with existing data ---
            switch (user.donate_type) {
                case DonateType.DONATE_SINGLE:
                    setDonateConcrete(true)
                    setDonateAll(false)
                    break;

                case DonateType.DONATE_ALL:
                    setDonateAll(true)
                    setDonateConcrete(false)  
                    break;
            }
        }

     }, []);

    return (
        <>
            <h1 className="title_info">Vyberte si možnosť, ako <br />chcete pomôcť</h1>

            <div className="donation_toggle_wrapper">
                <div className={!isDonateConcrete? "donation_toggle_normal" : "donation_toggle_active_left"} onClick={() => switchToggleDonateLeft()}>
                    <div className="logo_help_donate donate_wallet_default"></div>
                    <p className="title_left">Chcem finančne prispieť<br /> konkrétnemu útulku</p>
                </div>
                <div className={!isDonateAll? "donation_toggle_normal_left" : "donation_toggle_active"} onClick={() => switchToggleDonateRight()}>
                    <div className="logo_help_donate donate_pawn_selected"></div>
                    <p className="title_right">Chcem finančne prispieť<br /> celej nadácii</p>
                </div>
            </div>
        </>
    );
    
    // --- change donate type ---
    function switchToggleDonateLeft() {
            setDonateConcrete(true)
            setDonateAll(false)

             // --- set Donate option in parent component ---
            props.setDonateToggleOption(DonateType.DONATE_SINGLE)
    }

    function switchToggleDonateRight() {
            setDonateConcrete(false)  
            setDonateAll(true)
    
            // --- set Donate option in parent component ---
            props.setDonateToggleOption(DonateType.DONATE_ALL)        
    }

}


export default HelpOptionToggle;