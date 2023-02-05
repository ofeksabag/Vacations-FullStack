import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageFile: string;
    public image: UploadedFile;

    public isFollowing: number;
    public followersCount: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageFile = vacation.imageFile;
        this.image = vacation.image;
        
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;
    }

    private static vacationValidateSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(3).max(50),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().min(0).max(99999),
        image: Joi.object().optional(),
        imageFile: Joi.string().optional().min(38).max(50),
        isFollowing: Joi.number().optional(),
        followersCount: Joi.number().optional()
    });

    public validate(): void {
        const result = VacationModel.vacationValidateSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}

export default VacationModel;