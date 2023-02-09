import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static credentialValidationSchema = Joi.object({
        email: Joi.string().min(10).required().email(),
        password: Joi.string().min(4).required()
    });

    public validate(): void {
        const result = CredentialsModel.credentialValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}

export default CredentialsModel;