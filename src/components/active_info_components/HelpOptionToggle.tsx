import React, { useRef, useEffect, useState } from 'react';


function HelpOptionToggle() {

    const [isDonateConcrete, setDonateConcrete] = useState(false);
    const [isDonateAll, setDonateAll] = useState(true);

    useEffect(() => {
        console.log("OptionToggle Init")
     }, []);

    return (
        <>
            <h1 className="title_info">Vyberte si možnosť, ako <br />chcete pomôcť</h1>

            <div className="donation_toggle_wrapper">
                <div className={!isDonateConcrete ? "donation_toggle_normal" : "donation_toggle_active_left"} onClick={() => switchToggleDonate(isDonateConcrete)}>

                </div>
                <div className={!isDonateAll ? "donation_toggle_normal_left" : "donation_toggle_active"} onClick={() => switchToggleDonate(isDonateAll)}>

                </div>
            </div>
        </>
    );

    // --- change donate type ---
    function switchToggleDonate(isActive: boolean){
        if(!isDonateConcrete && !isActive){
            setDonateConcrete(true)
            setDonateAll(false)
        } else if(!isDonateAll && !isActive) {
            setDonateAll(true)
            setDonateConcrete(false)
        }
    }
}


export default HelpOptionToggle;