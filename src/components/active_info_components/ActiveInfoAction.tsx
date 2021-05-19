import React, { useRef, useEffect, useState } from 'react';

function ActiveInfoAction() {

    useEffect(() => {
        console.log("ActiveInfoAction Init")
     }, []);

    return (
        <>
            <div className="active_info_action_wrapper">
                <button className="button_info_normal" onClick={() => ButtonActionBack()}>Späť</button>
                 <div className="empty_space"></div> {/* space between buttons */}
                <button className="button_info_active" onClick={() => ButtonActionNext()}>Pokračovať</button>
            </div>

        </>
    );

    function ButtonActionBack() {
        console.log("ButtonActionBack was clicked!!!");
    }

    function ButtonActionNext() {
        console.log("ButtonActionNext was clicked!!!");
    }

    function ButtonActionSubmit() {
        console.log("ButtonActionSubmit was clicked!!!");
    }
}


export default ActiveInfoAction;