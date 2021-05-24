import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppState } from '../../store/AppState';
import { ActionType} from '../../store/FormActionReducer';
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../../store/DispatcherManager';
import ValidationHelper, {InputType} from '../../util/ValidationHelper';

enum StateFlag {
    FLAG_SK,
    FLAG_CZ
  }

interface UserFormProps {
   // TODO
}

type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number
}

function UserForm(props: UserFormProps) {
    const { register, handleSubmit } = useForm<FormValues>()
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [stateFlag, setStateFlag] = useState(StateFlag.FLAG_SK);


    // --- Form errors ---
    const [userFirstNameError, setUserFirstNameError] = useState(false);
    const [userLastNameError, setUserLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [formHasError, setFormError] = useState(false);

    const FormAction = useSelector((state: AppState) => state.form_action);
    const ActiveUser = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(FormAction && FormAction.form_step == 2){
            switch (FormAction.action_type) { // which setp is present 
                case ActionType.ACTION_VALIDATE:
                    actionNextWithValidFromInput(); // --- Final Validate ---
                    break;

                default:
                    break;
            }
        }
        
    }, [FormAction]);

    useEffect(() => {
        if(ActiveUser){
            setUserFirstName(ActiveUser.first_name);
            setUserLastName(ActiveUser.last_name)
            setEmail(ActiveUser.email)
            setPhoneNumber(ActiveUser.phone_number)
        }
    }, []);

    const onChangeFirstName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const firstNameInput = e.target.value ? e.target.value : "";
        setUserFirstName(firstNameInput);
        setUserFirstNameError(false)
    }

    const onChangeLastName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const lastNameInput = e.target.value ? e.target.value : "";
        setUserLastName(lastNameInput)
        setUserLastNameError(false)
    }

    const onChangeEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailInput = e.target.value ? e.target.value : "";
        setEmail(emailInput)
        setEmailError(false)
    }

    const onChangePhoneNumber = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneNumberInput = e.target.value ? e.target.value : "";
        setPhoneNumber(phoneNumberInput)
        setPhoneNumberError(false)
    }
        
    return (
        <>
            <div className="active_info_action_wrapper">
                <h1 className="title_info">Potrebujeme od Vás<br /> zopár informácií </h1>

                <div className="form_wrapper">
                    <p className="form_title">O vás</p>

                    <form className="form_wrapper_child">
                        <div className="form_input_wrapper">
                            <p className="form_title">Meno</p>
                            <input className="form_edit" type="text" {...register('firstName')} defaultValue={ActiveUser? ActiveUser.first_name : ""} placeholder="Zadajte Vaše meno" onChange={onChangeFirstName}/>
                            {userFirstNameError &&  <p className="form_error">Políčko pravdepodobne obsahuje chbybu :(</p>}
                        </div>

                        <div className="form_input_wrapper">
                            <p className="form_title">Priezvisko</p>
                            <input className="form_edit" type="text" {...register('lastName')} defaultValue={ActiveUser? ActiveUser.last_name : ""} placeholder="Zadajte Vaše priezvisko" onChange={onChangeLastName}/>
                            {userLastNameError &&  <p className="form_error">Políčko pravdepodobne obsahuje chbybu :(</p>}
                        </div>

                        <div className="form_input_wrapper">
                            <p className="form_title">E-mailová adresa</p>
                            <input className="form_edit" type="email" {...register('email')} defaultValue={ActiveUser? ActiveUser.email : ""} placeholder="Zadajte Váš e-mail" onChange={onChangeEmail} />
                            {emailError &&  <p className="form_error">Mailová adresa obsahuje chybu(</p>}
                        </div>

                        <div className="form_input_wrapper">
                            <p className="form_title">Telefónne číslo</p>
                            <div className="phone_state_flag_wrapper">
                                <div className={stateFlag == StateFlag.FLAG_SK? "state_flag_sk" : "state_flag_cz"} onClick={changeFlagAction}></div>
                                <div className={stateFlag == StateFlag.FLAG_SK? "state_phone_prefix_sk" : "state_phone_prefix"}>{stateFlag == StateFlag.FLAG_SK? "+421" : "+420"}</div>
                                <input className="form_phone_edit" type="tel" {...register('phoneNumber')} defaultValue={ActiveUser ? ActiveUser.phone_number : ""} placeholder="" onChange={onChangePhoneNumber} />
                                {phoneNumberError && <p className="form_error">Pravdepodobne nesprávny formát telefónneho čísla (správny formát: (+421)</p>}
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </>
    );

    function actionNextWithValidFromInput() {
        if (isErrorInfinalDataValidation()) {
            setFormError(true)

        } else {
            if (ActiveUser) { // --- Save User Data Locally ---
                DispatcherManager.getInstance().dispatchUpdateUser(dispatch, ActiveUser, 0, userFirstName, userLastName, email, phoneNumber)
            }
        }
    }

    function validateUserFirstName(isError: boolean): void {
        setUserFirstNameError(isError)
    }

    function validateUserLastName(isError: boolean): void {
        setUserLastNameError(isError)
    }

    function validateUserMail(isError: boolean): void {
        setEmailError(isError)
    }

    function validatePhoneNumber(isError: boolean): void {
        setPhoneNumberError(isError)
    }

    function isErrorInfinalDataValidation(): boolean {
        let hasError = false;

        if (!ValidationHelper.getInstance().validateUserInput(userFirstName, InputType.NAME, validateUserFirstName)) {
            setUserFirstNameError(true)
            hasError = true;
        }

        if (!ValidationHelper.getInstance().validateUserInput(userLastName, InputType.NAME, validateUserLastName)) {
            setUserLastNameError(true)
            hasError = true;
        }

        if (!ValidationHelper.getInstance().validateUserInput(email, InputType.EMAIL, validateUserMail)) {
            setEmailError(true)
            hasError = true;
        }

        if (!ValidationHelper.getInstance().validateUserInput(phoneNumber, InputType.PHONE_NUMBER, validatePhoneNumber)) {
            setPhoneNumberError(true)
            hasError = true;
        }

        return hasError;
    }

    function changeFlagAction() {
        switch (stateFlag) {
            case StateFlag.FLAG_SK:
                setStateFlag(StateFlag.FLAG_CZ)
                break;

            case StateFlag.FLAG_CZ:
                setStateFlag(StateFlag.FLAG_SK)
                break;
        }
    }
}


export default UserForm;