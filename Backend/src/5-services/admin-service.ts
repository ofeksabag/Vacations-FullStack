import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import FollowersModel from "../4-models/followers-model";

async function getAllVacationsForAdmin(): Promise<VacationModel[]> {

    const sql = "SELECT * FROM vacations ORDER BY startDate";
    const vacations = await dal.execute(sql);

    return vacations;

}

async function getOneVacation(vacationId: number): Promise<VacationModel> {
    
    const sql = "SELECT * FROM vacations WHERE vacationId = ?";
    
    const vacations = await dal.execute(sql, vacationId);

    const vacation = vacations[0];

    if(!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation;
    
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validate();

    vacation.imageFile = await imageHandler.saveImage(appConfig.vacationsImagesUrl, vacation.image);

    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageFile)
    
    vacation.vacationId = result.insertId;

    delete vacation.image;
    return vacation;

}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validate();

    vacation.imageFile = await getImageFromDB(vacation.vacationId);
    
    if (vacation.image) {
        vacation.imageFile = await imageHandler.updateImage(appConfig.vacationsImagesUrl, vacation.image, vacation.imageFile);
    }

    const sql = "UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageFile = ? WHERE vacationId = ?";

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageFile, vacation.vacationId);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    delete vacation.image;

    return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
    const imageFile = await getImageFromDB(vacationId);
    imageHandler.deleteImage(appConfig.vacationsImagesUrl, imageFile);

    const sql = "DELETE FROM vacations WHERE vacationId = ?";
    const result = await dal.execute(sql, vacationId);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

async function getVacationsReport(): Promise<FollowersModel[]> {

    const sql = `SELECT DISTINCT V.destination,
                COUNT(F.userId) as followersCount
                FROM vacations as V LEFT JOIN followers AS F
                ON V.vacationId = F.vacationId
                GROUP BY V.vacationId`;
    
    const report = await dal.execute(sql);

    return report;

}

async function getImageFromDB(vacationId: number): Promise<string> {
    const sql = "SELECT imageFile FROM vacations WHERE vacationId = ?";

    const vacations = await dal.execute(sql, vacationId);
    const vacation = vacations[0];

    if (!vacation) return null;

    return vacation.imageFile;
}

export default {
    getAllVacationsForAdmin,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationsReport
}