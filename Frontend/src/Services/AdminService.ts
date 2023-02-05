import axios from "axios";
import FollowersModel from "../Models/FollowersModel";
import ReportModel from "../Models/ReportModel";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AdminService {

    public async getAllVacationsForAdmin(): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().adminVacations;

        if(vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
            vacations = response.data;

            vacationsStore.dispatch({ type: VacationsActionType.FetchAdminVacations, payload: vacations });
        }

        return vacations;

    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);
        
        const vacation = response.data;

        return vacation;
        
    }

    public async addVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };

        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        
        const addedVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });

    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };

        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });

        const updatedVacation = response.data;
        
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });

    }

    public async deleteVacation(vacationId: number): Promise<void> {

        await axios.delete(appConfig.adminVacationsUrl + vacationId);

        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });

    }

    public async getVacationsReport(): Promise<ReportModel[]> {

        const response = await axios.get<ReportModel[]>(appConfig.adminReportUrl);
        
        const report = response.data;

        return report;

    }

}

const adminService = new AdminService();

export default adminService;