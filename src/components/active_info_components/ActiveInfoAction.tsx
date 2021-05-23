import React, { useRef, useEffect, useState } from 'react';

interface ActiveInfoActionProps {
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
                <button className="button_info_normal" onClick={() => props.formActionBack()}>Späť</button>
                 <div className="empty_space"></div> {/* space between buttons */}
                <button className="button_info_active" onClick={() => props.formActionNext()}>Pokračovať</button>
            </div>

        </>
    );
}


export default ActiveInfoAction;