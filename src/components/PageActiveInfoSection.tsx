import React, { useRef, useEffect, useState } from 'react';


function PageActiveInfoSection() {

    const [isDonateConcrete, setDonateConcrete] = useState(false);
    const [isDonateAll, setDonateAll] = useState(true);

    useEffect(() => {
        console.log("PageActiveInfoSection Init")
     }, []);

    return (
        <>
            <div className="active_info_wrapper">
                <h1 className="title_info">Vyberte si možnosť, ako <br />chcete pomôcť</h1>

                <div className="donation_toggle_wrapper">
                    <div className={!isDonateConcrete? "donation_toggle_normal" : "donation_toggle_active_left"} onClick={() => switchToggleDonate(isDonateConcrete)}>

                    </div>
                    <div className={!isDonateAll? "donation_toggle_normal_left" : "donation_toggle_active"} onClick={() => switchToggleDonate(isDonateAll)}>

                    </div>
                </div>

                <button className="button_submit" onClick={() => getStatus()}>
                    Submit
                </button>

                {/* money help info toggle box */}
                {/* money help info toggle box */}
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

    function getStatus(){
        console.log("Donate All: " + isDonateAll + " Donate concrete: " + isDonateConcrete)
    }
}


export default PageActiveInfoSection;