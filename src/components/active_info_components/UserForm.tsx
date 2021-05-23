import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppState } from '../../store/AppState';
import { ActionType} from '../../store/FormActionReducer';
import { useDispatch, useSelector } from 'react-redux';
import DispatcherManager from '../../store/DispatcherManager';
import ValidationHelper, {InputType} from '../../util/ValidationHelper';


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

    // --- Form errors ---
    const [userFirstNameError, setUserFirstNameError] = useState(false);
    const [userLastNameError, setUserLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const formAction = useSelector((state: AppState) => state.form_action);
    const dispatch = useDispatch();

    useEffect(() => {
        if(formAction){
            switch (formAction.action_type) { // which setp is present 
                case ActionType.ACTION_NEXT: 
                    console.log("BBBBBB UserForm ACTION_NEXT")
                    break;
    
                case ActionType.ACTION_VALIDATE:
                    console.log("BBBBBB UserForm ACTION_VALIDATE")
                   // actionNextWithValidFromInput(formAction.form_step);
                    break;
    
                case ActionType.ACTION_BACK:
                    break;
    
                default:
                    break;
    
            }
        }
        
    }, [formAction]);

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
                            <input className="form_edit" type="text" {...register('firstName')} defaultValue="" placeholder="Zadajte Vaše meno" onChange={onChangeFirstName}/>
                            {userFirstNameError &&  <p className="form_error">Vyplnené políčko pravdepodobne obsahuje chbybu :(</p>}
                        </div>

                        <div className="form_input_wrapper">
                            <p className="form_title">Priezvisko</p>
                            <input className="form_edit" type="text" {...register('lastName')} defaultValue="" placeholder="Zadajte Vaše priezvisko" onChange={onChangeLastName}/>
                            {userLastNameError &&  <p className="form_error">Vyplnené políčko pravdepodobne obsahuje chbybu :(</p>}
                        </div>

                        <div className="form_input_wrapper">
                            <p className="form_title">E-mailová adresa</p>
                            <input className="form_edit" type="email" {...register('email')} defaultValue="" placeholder="Zadajte Váš e-mail" onChange={onChangeEmail} />
                            {emailError &&  <p className="form_error">Mailová adresa obsahuje chybu(</p>}
                        </div>

                        <div className="form_input_wrapper">
                            <p className="form_title">Telefónne číslo</p>
                            <input className="form_edit" type="tel" {...register('phoneNumber')} defaultValue="" placeholder="+421" onChange={onChangePhoneNumber} />
                            {phoneNumberError &&  <p className="form_error">Chybné telefónne číslo(</p>}
                        </div>
                    </form>
                </div>
            </div>

        </>
    );

    function actionNextWithValidFromInput(stepNumber: number) {
        if (!ValidationHelper.getInstance().validateUserInput(userFirstName, InputType.NAME, validateUserFirstName)
            || !ValidationHelper.getInstance().validateUserInput(userLastName, InputType.NAME, validateUserLastName)
            || !ValidationHelper.getInstance().validateUserInput(email, InputType.EMAIL, validateUserMail)
            || !ValidationHelper.getInstance().validateUserInput(phoneNumber, InputType.PHONE_NUMBER, validatePhoneNumber)) {

            console.log("Stop formular obsahuje chybu")

        } else {
            console.log("OK can dispatch data")

            // --- User data is OK than goto Next Step ---
            DispatcherManager.getInstance().dispatchFormAction(dispatch, ActionType.ACTION_NEXT, stepNumber);
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
}


export default UserForm;