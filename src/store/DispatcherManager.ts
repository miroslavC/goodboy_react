import { createStore } from "redux";
import { rootReducer } from "./AppState";
import { useDispatch } from 'react-redux';
import { USER_TYPE, User, Shelter, DonateType} from '../store/UserReducer';
import { FORM_ACTION_TYPE, Form, ActionType } from './FormActionReducer';
import { Dispatch } from "react";


export default class DispatcherManager {
    private static instance: DispatcherManager;

    private constructor() { }

    public static getInstance(): DispatcherManager {
        if (!DispatcherManager.instance) {
            DispatcherManager.instance = new DispatcherManager();
        }

        return DispatcherManager.instance;
    }

    /***********************************************************
     *        --- Dispatcher Actions ---
     * *********************************************************/
     dispatchInitState(dispatcher: Dispatch<any>): void {
        dispatcher({
            type: FORM_ACTION_TYPE,
            payload: {
                form_step: 1
            }
        });
    }

    dispatchUpdateShelterDonateType(dispatcher: Dispatch<any>, donateType: DonateType, user: User): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                shelter: {
                    ...user.shelter,
                    donate_type: donateType
                }
            }
        });
    }

    dispatchUpdateUser(dispatcher: Dispatch<any>, user: User, userId: number, firstName: string, lastName: string, userEmail: string, phone: string): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                ...user,
                id: userId,
                first_name: firstName,
                last_name: lastName,
                email: userEmail,
                phone_number: phone,
                shelter: {
                    ...user.shelter
                }
            }
        });
    }

    dispatchUpdateFinalConfirmUser(dispatcher: Dispatch<any>, user: User, confirmChecked: boolean): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                ...user,
                confirm_is_checked: confirmChecked,
                shelter: {
                    ...user.shelter
                }
            }
        });
    }

    dispatchSetShelterDonateType(dispatcher: Dispatch<any>, donateType: DonateType): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                shelter: {
                    donate_type: donateType
                }
            }
        });
    }

    dispatchShelterTitle(dispatcher: Dispatch<any>, shelterIndex: number, shelterName: string): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                shelter: {
                    id: shelterIndex,
                    name: shelterName
                }
            }
        });
    }

    dispatchShelterDonateSum(dispatcher: Dispatch<any>, user: User, donateSum: number): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                shelter: {
                    ...user.shelter,
                    donate_sum: donateSum
                }
            }
        });
    }

    dispatchFinalShelterDonateInfo(dispatcher: Dispatch<any>, donateType: DonateType, user: User | null, shelter: Shelter, sumOfMoney: number): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                ...user,
                donate_type: donateType,
                donate_sum: sumOfMoney,
                shelter: {
                    ...user?.shelter,
                    id: shelter.id,
                    name: shelter.name
                }
            }
        });
    }

    // --- Form Dispatch Action ---
    dispatchFormAction(dispatcher: Dispatch<any>, actionType: ActionType, actualStep: number): void {
        let tempStep = 0;
        switch (actionType) {
            case ActionType.ACTION_BACK:
                tempStep = actualStep - 1;
                break;
            case ActionType.ACTION_VALIDATE:
                tempStep = actualStep;
                break;
            case ActionType.ACTION_NEXT:
                tempStep = actualStep + 1;
                break;
            case ActionType.ACTION_SUBMIT:
                tempStep = actualStep;
                break;
            default: break;
        }

        dispatcher({
            type: FORM_ACTION_TYPE,
            payload: {
                action_type: actionType,
                form_step: tempStep
            }
        })
    }

}

