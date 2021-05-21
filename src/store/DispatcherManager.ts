import { createStore } from "redux";
import { rootReducer } from "./AppState";
import { useDispatch } from 'react-redux';
import { USER_TYPE, User, DonateType } from '../store/UserReducer';
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

    dispatchShelterDonateType(dispatcher: Dispatch<any>, donateType: DonateType): void {
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

    dispatchShelterDonateSum(dispatcher: Dispatch<any>, moneySum: number): void {
        dispatcher({
            type: USER_TYPE,
            payload: {
                shelter: {
                    donate_sum: moneySum
                }
            }
        });
    }

    // --- Form Dispatch Action ---
    dispatchFormAction(dispatcher: Dispatch<any>, actionType: ActionType): void {
        dispatcher({
            type: FORM_ACTION_TYPE,
            payload: {
                action_type: actionType
            }
        })
    }

}

