import { RegisterOptions } from "react-hook-form";
import RoleModel from "./RoleModel";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public static firstNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name must be minimum 2 chars" },
        maxLength: { value: 20, message: "First name must be maximum 20 chars" }
    }

    public static lastNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name must be minimum 2 chars" },
        maxLength: { value: 20, message: "Last name must be maximum 20 chars" }
    }

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

export default UserModel;