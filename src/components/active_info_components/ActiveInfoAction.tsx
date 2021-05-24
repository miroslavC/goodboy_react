import React, { useRef, useEffect, useState } from 'react';

interface ActiveInfoActionProps {
    formStep: number;
    formActionBack(): void;
    formActionNext(): void;
    formActionSubmit(): void;
}

function ActiveInfoAction(props: ActiveInfoActionProps) {

    useEffect(() => {
        console.log("ActiveInfoAction Init")
     }, []);

    return (
        <>
            <div className="active_info_action_wrapper">
                {props.formStep != 1 && <button className="button_info_normal" onClick={() => props.formActionBack()}>Späť</button>}
                <div className="empty_space"></div> {/* space between buttons */}
                {props.formStep != 3 && <button className="button_info_active" onClick={() => props.formActionNext()}>Pokračovať</button>}
                {props.formStep == 3 && <button className="button_info_active" onClick={() => props.formActionSubmit()}>Odoslať formulár</button>}
            </div>

        </>
    );
}


export default ActiveInfoAction;