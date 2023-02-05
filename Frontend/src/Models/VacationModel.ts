import { RegisterOptions } from "react-hook-form";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageFile: string;
    public image: File;
    
    public isFollowing: number;
    public followersCount: number;

    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 3, message: "Destination must be minimum 3 chars" },
        maxLength: { value: 50, message: "Destination must be maximum 50 chars" }
    }

    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 10, message: "Description must be minimum 10 chars" },
        maxLength: { value: 1000, message: "Description must be maximum 1000 chars" }
    }

    public static startDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing start date" }
    }

    public static endDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing end date" }
    }

    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price must be minimum 0" },
        max: { value: 99999, message: "Price must be maximum 99,999" }
    }

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" }
    }

}

export default VacationModel;