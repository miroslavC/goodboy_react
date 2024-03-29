import userEvent from "@testing-library/user-event";
import { type } from "os";

export const USER_TYPE = "USER_TYPE";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    confirm_is_checked: boolean;
    donate_type: DonateType;
    donate_sum: number
    shelter: Shelter;
}

// * Only for Correct POST request () *
export interface UserFinal {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    value: number,
    shelterID: number
}

export interface Shelter {
    id: number;
    name: string
}

export enum DonateType {
    DONATE_DEFAULT = "DEFAULT", DONATE_SINGLE = "SINGLE", DONATE_ALL = "ALL"
}

export interface UserAction {
    type: string;
    payload: User | null;
}

export const UserReducer = (state: User | null = null, action: UserAction): User | null => {
    switch (action.type) {
        case USER_TYPE:
            return action.payload;

        default:
            return state;
    }
};

