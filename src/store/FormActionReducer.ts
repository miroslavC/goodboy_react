export const FORM_ACTION_TYPE = "FORM_ACTION_TYPE";

export enum ActionType {
    ACTION_BACK = "BACK", ACTION_VALIDATE = "VALIDATE", ACTION_NEXT = "NEXT", ACTION_SUBMIT = "SUBMIT"
}

export interface Form {
    actionFired: boolean;
    action_type: ActionType;
    form_step: number;
}

export interface FormAction {
    type: string;
    payload: Form | null;
}

export const FormActionReducer = ( state: Form | null = null, action: FormAction): Form | null => {
    switch(action.type) {
        case FORM_ACTION_TYPE:
            return action.payload;
        default:
            return state;
    }
};