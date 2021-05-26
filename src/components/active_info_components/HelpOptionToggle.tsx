import React, { useRef, useEffect, useState } from 'react';
import { useDispatch,  useSelector} from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import { AppState } from '../../store/AppState';
import { TitleInfo, 
    HelpToggle,
    ToggleNormalLeft, 
    ToggleActiveLeft , 
    LogoHelpDonate, 
    Svg_icon, 
    TitleLeftDefault, 
    TitleLeftActive} from '../StyledComponents';

import wallet_default from '../../assets/images/wallet_default.svg';
import wallet_selected from '../../assets/images/wallet_selected.svg';


interface HelpOptionToggleProps{
    setDonateToggleOption(type: DonateType): void;
}

function HelpOptionToggle(props: HelpOptionToggleProps) {
    const [isDonateConcrete, setDonateConcrete] = useState(false);
    const [isDonateAll, setDonateAll] = useState(false);
    const dispatch = useDispatch();

    const ActiveUser = useSelector((state: AppState) => state.user);
    const form = useSelector((state: AppState) => state.form_action);

    useEffect(() => {
        console.log("OptionToggle Init")

        if (ActiveUser) { // --- fill form with existing data ---
            switch (ActiveUser.donate_type) {
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
            <TitleInfo>Vyberte si možnosť, ako <br />chcete pomôcť</TitleInfo>

            <HelpToggle>
                {!isDonateConcrete &&
                    <ToggleNormalLeft onClick={() => switchToggleDonateLeft()}>
                        <LogoHelpDonate>
                            <Svg_icon src={wallet_default}/>
                        </LogoHelpDonate>
                        
                        <TitleLeftDefault>Chcem finančne prispieť<br /> konkrétnemu útulku</TitleLeftDefault>
                    </ToggleNormalLeft>
                }

                {isDonateConcrete &&
                    <ToggleActiveLeft onClick={() => switchToggleDonateLeft()}>
                         <LogoHelpDonate>
                            <Svg_icon src={wallet_selected}/>
                        </LogoHelpDonate>
                        <TitleLeftActive>Chcem finančne prispieť<br /> konkrétnemu útulku</TitleLeftActive>
                    </ToggleActiveLeft>
                }

                <div className={!isDonateAll? "donation_toggle_normal_left" : "donation_toggle_active"} onClick={() => switchToggleDonateRight()}>
                    <div className={!isDonateAll? "logo_help_donate donate_pawn_default" : "logo_help_donate donate_pawn_selected"}></div>
                    <p className={!isDonateAll? "title_right" : "title_right_selected"}>Chcem finančne prispieť<br /> celej nadácii</p>
                </div>
            </HelpToggle>
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