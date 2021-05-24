import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DonateType, Shelter} from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';
import {UserHttpApi} from "../../api/UserHttpApi";


interface ShelterPickerProps {
    setDataFromList(shelter: Shelter): void,
    closeAction(): void;
}

function DogAsylumList(props: ShelterPickerProps) {
    const [shelterList, setShelterList] = useState<Shelter[]>([]);
    const [httpError, setHttpError] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.user);

    // --- Http GetRequest call ---
    useEffect(() => {
        UserHttpApi.getShelterList().then(
            function (response) {
                console.log(response.data.shelters[0])
                setShelterList(response.data.shelters)
            }
        ).catch(function (error) {
            setHttpError(error)
        });
    }, []);

    useEffect(() => {
        console.log("DogAsylumList Init")
     }, []);

    if(!httpError){
        return (
            <>
                <div className="shelter_list_wrapper">
                    {shelterList.map(shelter => <li className="shelter_item" key={shelter.id} onClick={() => shelterItemClicked(shelter)}>
                        <a className="shelter_item_row">{shelter.name}</a>
                    </li>)}
                </div>
              
            </>
        );
    } else {
        return null;
    }
   

    function shelterItemClicked(shelter: Shelter) {

        // --- set Data in Parent Component ---
        props.setDataFromList(shelter)

        // --- hide shelter picker ---
        props.closeAction();
    }
}


export default DogAsylumList;