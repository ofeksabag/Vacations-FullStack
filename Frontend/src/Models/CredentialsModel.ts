import { RegisterOptions } from "react-hook-form";

class CredentialsModel {

    public email: string;
    public password: string;

    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 10, message: "Email must be minimum 10 chars" },
        maxLength: { value: 40, message: "Email must be maximum 40 chars" }
    }

    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars" },
        maxLength: { value: 40, message: "Password must be maximum 40 chars" },
    }

}

export default CredentialsModel;