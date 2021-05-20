import React, { useRef, useEffect, useState } from 'react';
import DogAsylumList from "./DogAsylumList"
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';

function DogAsylumListPicker() {
  const [isShelterListVisible, setShelterListVisible] = useState(false)
  const [shelterDefaultTitle, setShelterDefaultTitle] = useState("Vyberte útulok zo zoznamu")

  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log("DogAsylumList Init")
     }, []);

    return (
        <>
            <div className="asylum_list_wrapper">
              <p className="asylum_list_about">O projekte</p>
              <p className="asylum_list_info">Nepovinné</p>
              <div className="asylum_list_picker_wrapper" onClick={() => showShelterPickerList()}>
                <p className="asylum_list_picker_title">Útulok</p>
                <p className="asylum_list_picker_subtitle">{user && user.shelter.name? user.shelter.name : shelterDefaultTitle}</p>
              </div>

              {isShelterListVisible && <DogAsylumList closeAction={() => hideShelterPickerList()}/>}
            </div>
        </>
    );

    function showShelterPickerList() : void {
        setShelterListVisible(!isShelterListVisible)
    }

    function hideShelterPickerList() : void{
        setShelterListVisible(false)
    }
}


export default DogAsylumListPicker;