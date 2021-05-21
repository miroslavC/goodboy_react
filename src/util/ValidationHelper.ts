import { nameRegex, mailRegex, phoneNumberRegex} from './ValidationConstants';

export enum InputType {
    NAME = "NAME", EMAIL = "EMAIL", PHONE_NUMBER = "PHONE_NUMBER"
}

export default class ValidationHelper {
    private static instance: ValidationHelper;

    private constructor() { }

    public static getInstance(): ValidationHelper {
        if (!ValidationHelper.instance) {
            ValidationHelper.instance = new ValidationHelper();
        }

        return ValidationHelper.instance;
    }

    // --- Helper methods ---
    dispatchShelterDonateType(): boolean {
       return true;  
    }

    validateUserInput(value: string, input: InputType, func: (isError: boolean) => void): boolean {
        let tempRegex = ""
        switch (input) {
            case InputType.NAME: {
                tempRegex = nameRegex;
                break;
            }
            case InputType.EMAIL: {
                tempRegex = mailRegex;
                break;
            }
            case InputType.PHONE_NUMBER: {
                tempRegex = phoneNumberRegex;
                break;
            }
            default: {
                break;
            }
        }

        if (value.match(tempRegex)) {
            func(false)
            return true
        } else {
            func(true)
            return false
        }
    }
} 