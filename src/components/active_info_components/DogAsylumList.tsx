import React, { useRef, useEffect, useState } from 'react';
import { DonateType, Shelter} from '../../store/UserReducer';
import {UserHttpApi} from "../../api/UserHttpApi";


interface ShelterPickerProps {
    setDataFromList(shelter: Shelter): void,
    closeAction(): void;
}

function DogAsylumList(props: ShelterPickerProps) {
    const [shelterList, setShelterList] = useState<Shelter[]>([]);
    const [httpError, setHttpError] = useState(false);

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