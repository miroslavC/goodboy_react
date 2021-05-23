import React, { useRef, useEffect, useState } from 'react';
import { AppState } from '../../store/AppState';
import { useSelector } from 'react-redux';
import { ActionType} from '../../store/FormActionReducer';

function UserChceckFormInfo() {
    const [confirmIsChecked, setConfirmChecked] = useState(false);
    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
       // TODO
    }, [confirmIsChecked]);

    const onChangeCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setConfirmChecked(isChecked);
    }

    if(user){
        return (
            <>
                <div className="active_info_action_wrapper">
    
                    <h1 className="title_info">Skontrolujte si zadané <br/>údaje</h1>
                    <div className="form_wrapper">
                
                        <form className="form_wrapper_child">
                            <div className="check_info_wrapper">
                                <p className="check_info_title">Akou formou chcem pomôcť</p>
                                <p className="check_info_subtitle">0903441787</p>
                            </div>
    
                            <div className="check_info_wrapper">
                                <p className="check_info_title">Najviac mi záleží na útulku</p>
                                <p className="check_info_subtitle">0903441787</p>
                            </div>
    
                            <div className="check_info_wrapper">
                                <p className="check_info_title">Suma ktorou chcem pomôcť</p>
                                <p className="check_info_subtitle">0903441787</p>
                            </div>
    
                            <div className="check_info_wrapper">
                                <p className="check_info_title">Meno a priezvisko</p>
                                <p className="check_info_subtitle">0903441787</p>
                            </div>
    
                            <div className="check_info_wrapper">
                                <p className="check_info_title">E-mailová adresa</p>
                                <p className="check_info_subtitle">0903441787</p>
                            </div>
    
                            <div className="check_info_wrapper">
                                <p className="check_info_title">Telefónne číslo</p>
                                <p className="check_info_subtitle">0903441787</p>
                               
                            </div>
    
                            <div className="checkbox_input_wrapper">
                                <input className="checkbox_edit" type="checkbox" onChange={onChangeCheckBox} />
                                <label className="check_form_subtitle" htmlFor="vehicle1">Súhlasím so spracovaním mojich osobných údajov</label>
                            </div>
                        </form>
    
                    </div>
                </div>
    
            </>
        );

    } else {
        return (
            <>
                <div className="check_info_wrapper">
                    <p className="check_info_title">User is not set...</p>
                </div>
            </>
        );
    }
}

export default UserChceckFormInfo;