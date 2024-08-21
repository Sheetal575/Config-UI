import { INVAILD_ALPHABETIC_ERROR_MESSAGE, INVAILD_ALPHA_NUMERIC_ERROR_MESSAGE, INVAILD_EMAIL_ERROR_MESSAGE, INVAILD_NUMERIC_ERROR_MESSAGE } from "./constant";

export const CheckNumeric = (input: string) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(input);
}

export const CheckAphabetic = (input:string) => {
    const alphabeticRegex = /^[A-Za-z]+$/;
    return alphabeticRegex.test(input);
}

export const CheckAphaNumeric = (input:string) => {
    const alphaNumericRegex = /^[A-Za-z0-9]+$/;
    return alphaNumericRegex.test(input);
}

export const CheckEmail = (input:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

export const validateInput = (type:string, input:string) => {
    const validation: Record<string,any> = {
        "numeric":CheckNumeric(input),
        "aphanumeric":CheckAphaNumeric(input),
        "aphabetic":CheckAphabetic(input),
        "email":CheckEmail(input)
    };
    return validation[type]
}

export const validationError = (type:string) => {
    const validationError: Record<string,any> = {
        "numeric": INVAILD_NUMERIC_ERROR_MESSAGE,
        "aphanumeric":INVAILD_ALPHA_NUMERIC_ERROR_MESSAGE,
        "aphabetic":INVAILD_ALPHABETIC_ERROR_MESSAGE,
        "email":INVAILD_EMAIL_ERROR_MESSAGE
    };
    return validationError[type]
}