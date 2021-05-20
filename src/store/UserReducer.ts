export const USER_TYPE = "USER_TYPE";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    approval: boolean;
    shelter: Shelter
}

interface Shelter {
    id: number;
    name: string;
    donate_type: DonateType;
    donate_sum: number
}

export enum DonateType {
    DONATE_SINGLE = "SINGLE", DONATE_ALL = "ALL"
}

export interface UserAction {
    type: string;
    payload: User | null;
}

export const UserReducer = ( state: User | null = null, action: UserAction): User | null => {
    switch(action.type) {
        case USER_TYPE:
            return action.payload;
        default:
            return state;
    }
};
