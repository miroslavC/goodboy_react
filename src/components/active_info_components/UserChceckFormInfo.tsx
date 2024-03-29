import React, { useRef, useEffect, useState } from 'react';
import { AppState } from '../../store/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { ActionType} from '../../store/FormActionReducer';
import DispatcherManager from '../../store/DispatcherManager';
import {UserHttpApi} from "../../api/UserHttpApi";
import { Snackbar } from '@material-ui/core';


interface UserChceckFormInfoProps{
 // TODO
}

function UserChceckFormInfo(props: UserChceckFormInfoProps) {
    const [confirmIsChecked, setConfirmChecked] = useState(false);
    const FormAction = useSelector((state: AppState) => state.form_action);
    const ActiveUser = useSelector((state: AppState) => state.user);
    const [isSnackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if(ActiveUser){
            setConfirmChecked(ActiveUser.confirm_is_checked)
        }

    }, [confirmIsChecked]);

    useEffect(() => {
        if (FormAction) {
            switch (FormAction.action_type) { // which setp is present 
                case ActionType.ACTION_SUBMIT:
                    finalSubmitCheckedUserData()
                    break;

                default:
                    break;
            }
        }

    }, [FormAction]);

    const onChangeCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setConfirmChecked(isChecked);
        setSnackBarOpen(false)

        if (ActiveUser) { // --- Save User Data Locally ---
            DispatcherManager.getInstance().dispatchUpdateFinalConfirmUser(dispatch, ActiveUser, isChecked)
        }
    }

    if (ActiveUser) {
        return (
            <>
                <Snackbar open={isSnackBarOpen} message={snackBarMessage} />
                <div className="animate_slide_IN">

                    <h1 className="title_info">Skontrolujte si zadané <br />údaje</h1>
                    <div className="form_wrapper">

                        <form className="form_wrapper_child">
                            <div className="check_info_wrapper">
                                <p className="check_info_title">Akou formou chcem pomôcť</p>
                                <p className="check_info_subtitle">{ActiveUser.donate_type}</p>
                            </div>

                            <div className="check_info_wrapper">
                                <p className="check_info_title">Najviac mi záleží na útulku</p>
                                <p className="check_info_subtitle">{ActiveUser.shelter.name}</p>
                            </div>

                            <div className="check_info_wrapper">
                                <p className="check_info_title">Suma ktorou chcem pomôcť</p>
                                <p className="check_info_subtitle">{ActiveUser.donate_sum}</p>
                            </div>

                            <div className="check_info_wrapper">
                                <p className="check_info_title">Meno a priezvisko</p>
                                <p className="check_info_subtitle">{ActiveUser.first_name + " " + ActiveUser.last_name} </p>
                            </div>

                            <div className="check_info_wrapper">
                                <p className="check_info_title">E-mailová adresa</p>
                                <p className="check_info_subtitle">{ActiveUser.email}</p>
                            </div>

                            <div className="check_info_wrapper">
                                <p className="check_info_title">Telefónne číslo</p>
                                <p className="check_info_subtitle">{ActiveUser.phone_number}</p>

                            </div>

                            <div className="checkbox_input_wrapper">
                                <input className="checkbox_edit" type="checkbox" onChange={onChangeCheckBox} defaultChecked={ActiveUser ? ActiveUser.confirm_is_checked : false} />
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

    function finalSubmitCheckedUserData() {
        if (!confirmIsChecked) {
            setSnackBarOpen(true)
            setSnackBarMessage("Zabudli ste potvrdit suhlas so spracovanim udajov")
        } else {
            setSnackBarOpen(false)

            //--- call Http POST Request (Create User)
            if (ActiveUser) {

                /*****************************************************************************************
                 *    Na zaciatku som prehliadol ake parametre ma mat User post object, tak som to
                 *    musel takto nestastne vyriesit. Uz sa mi to proste nechcelo prerabat celu logiku :(
                 *                           MOja chyba
                 * 
                 * ************************************************************************************* */
                let UserFinalParsed = {
                    firstName: ActiveUser?.first_name, lastName: ActiveUser?.first_name, email: ActiveUser?.email, phone: ActiveUser?.phone_number,
                    value: ActiveUser?.donate_sum, shelterID: ActiveUser?.shelter.id
                };

                UserHttpApi.createUser(UserFinalParsed)
                    .then((data) => {
                        setSnackBarMessage("Http Status: " + data.status + " Novy uzivatel bol vytvoreny")
                        setSnackBarOpen(true)

                        setTimeout(() => {
                             setSnackBarOpen(false)
                        }, 2500);

                    })
                    .then((error) => {
                        setSnackBarOpen(true)
                        setSnackBarMessage("Http error: " + error)
                    });
            }
        }
    }
}

export default UserChceckFormInfo;