import React, { useRef, useEffect, useState } from 'react';
import DogAsylumList from "./DogAsylumList"
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../../store/DispatcherManager';
import { AppState } from '../../store/AppState';
import { DonateType, Shelter} from '../../store/UserReducer';

interface DogAsylumListPickerProps {
  setShelterListData(shelter: Shelter): void;
}

function DogAsylumListPicker(props: DogAsylumListPickerProps) {
  const [isShelterListVisible, setShelterListVisible] = useState(false)
  const [shelterDefaultTitle, setShelterDefaultTitle] = useState("Vyberte útulok zo zoznamu")
  const [shelterTemp, setShelterTemp] = useState({id:0, name: ""})

  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log("DogAsylumList Init")
        if(user && user.shelter){
          setShelterTemp(user.shelter)
        } 
     }, []);

  return (
    <>
      <div className="asylum_list_wrapper">
        <p className="asylum_list_about">O projekte</p>
        <p className="asylum_list_info">Nepovinné</p>
        <div className="asylum_list_picker_wrapper" onClick={() => showShelterPickerList()}>
          <p className="asylum_list_picker_title">Útulok</p>
          <p className="asylum_list_picker_subtitle">{shelterTemp && shelterTemp.name != ""? shelterTemp.name : shelterDefaultTitle}</p>
        </div>

        {isShelterListVisible && <DogAsylumList setDataFromList={setDataFromShelterList} closeAction={() => hideShelterPickerList()} />}
      </div>
    </>
  );
  
    function showShelterPickerList() : void {
        setShelterListVisible(!isShelterListVisible)
    }

    function hideShelterPickerList() : void{
        setShelterListVisible(false)
    }

    function setDataFromShelterList(shelter: Shelter){
        // --- set shelter local for pick ---
        setShelterTemp(shelter)

        // --- send shelter to parent component ---
        props.setShelterListData(shelter)
    }
}


export default DogAsylumListPicker;