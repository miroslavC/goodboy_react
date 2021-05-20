import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';

interface ShelterPickerProps {
    closeAction(): void;
}

function DogAsylumList(props: ShelterPickerProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.user);

    var shelterList = [{"id": 1, "name": "Útulok pre psov - TEZAS"},{"id": 2, "name": "OZ Tuláčik Brezno"}]

    useEffect(() => {
        console.log("DogAsylumList Init")
     }, []);

    return (
        <>
            <div className="shelter_list_wrapper">
                {shelterList.map(shelter => <li className="shelter_item" key={shelter.id} onClick={() => shelterItemClicked(shelter.id, shelter.name)}>
                    <a className="shelter_item_row">{shelter.name}</a>
                </li>)}
            </div>
          
        </>
    );

    function shelterItemClicked(index: number, title: string) {
        DispatcherManager.getInstance().dispatchShelterTitle(dispatch, index, title)

        // --- hide shelter picker ---
        props.closeAction();
    }
}


export default DogAsylumList;