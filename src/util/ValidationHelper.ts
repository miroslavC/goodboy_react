import { nameRegex, mailRegex, phoneNumberRegex, phone_prefix_SK, phone_prefix_CZ} from './ValidationConstants';
import { User, Shelter, DonateType} from '../store/UserReducer';

export enum StateFlag {
    FLAG_SK,
    FLAG_CZ
}

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

        if(value != undefined && value != null){
            if (value.match(tempRegex)) {
                func(false)
                return true
            } else {
                func(true)
                return false
            }
        } else {
            return false
        }
    }

    getInternationalPhoneNumber(stateFlag: StateFlag , phoneNumber: string): string {
        let phoneNumberFinal = ""

        // --- remove first digit from phoneNumber ---
        let phoneNumberEdited = phoneNumber.slice(1)

        switch (stateFlag) {
            case StateFlag.FLAG_SK: {
                phoneNumberFinal = phone_prefix_SK + phoneNumberEdited;
                break;
            }
            case StateFlag.FLAG_CZ: {
                phoneNumberFinal = phone_prefix_CZ + phoneNumberEdited;
                break;
            }
            default: {
                break;
            }
        }

        return phoneNumberFinal;
    }

    checkPhoneNumber (value: string) : boolean{
        if(value != undefined && value != null){
           return true
        } else {
            return false
        }
    }


    validateShelterDonateDataConstraints(shelterName: string, donateType: DonateType, errorMessageShelter: string | null, errorMessageHelpKind: string | null): [string, boolean] {
        let errorMessage = ""
        let donateIsOk = false;

        // --- Check if donate type is checked ---
        switch (donateType) {
            case DonateType.DONATE_SINGLE:
                if (!shelterName) {
                    errorMessage = errorMessageShelter? errorMessageShelter : "Zabudli ste vybrat utulok, ktoremu chcete pomoct"
                    donateIsOk = false
                } else {
                    donateIsOk = true;
                }
                break;

            case DonateType.DONATE_ALL:
                donateIsOk = true;
                break;

            case DonateType.DONATE_DEFAULT:
                errorMessage = errorMessageHelpKind? errorMessageHelpKind : "Musite zvolit druh pomoci"
                donateIsOk = false
                break;

            default: break;
        }

        return [errorMessage, donateIsOk]
    }

    checkMoneySum(moneySum: number, message: string | null): [string, boolean] {
        let errorMessage = ""
        let donateIsOk = false;

        // --- Check money ---
        if (moneySum == 0) {
            donateIsOk = false;
            errorMessage = message? message : "Zabudli ste vybrat sumu prispevku"
        } else {
            donateIsOk = true;
        }

        return [errorMessage, donateIsOk]
    }
} 