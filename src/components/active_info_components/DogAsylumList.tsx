import React, { useRef, useEffect, useState } from 'react';

function DogAsylumList() {

    useEffect(() => {
        console.log("DogAsylumList Init")
     }, []);

    return (
        <>
            <div className="asylum_list_wrapper">
              <p className="asylum_list_about">O projekte</p>
              <p className="asylum_list_info">Nepovinné</p>
              <div className="asylum_list_picker_wrapper">
                <p className="asylum_list_picker_title">Útulok</p>
                <p className="asylum_list_picker_subtitle">Vyberte útulok zo zoznamu</p>
              </div>
            </div>
          
        </>
    );
}


export default DogAsylumList;