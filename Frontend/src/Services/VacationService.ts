import axios from "axios";
import FollowersModel from "../Models/FollowersModel";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        
        let vacations = vacationsStore.getState().userVacations;

        if(vacations.length === 0) {

            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
            vacations = response.data;

            vacationsStore.dispatch({ type: VacationsActionType.FetchUserVacations, payload: vacations });

        }

        return vacations;

    }

    public async follow(vacationId: number): Promise<void> {
        
        await axios.post<FollowersModel>(appConfig.followUrl + vacationId);

        vacationsStore.dispatch({ type: VacationsActionType.Follow, payload: vacationId });

    }

    public async unfollow(vacationId: number): Promise<void> {

        await axios.delete(appConfig.unfollowUrl + vacationId);

        vacationsStore.dispatch({ type: VacationsActionType.Unfollow, payload: vacationId });

    }

}

const vacationService = new VacationService();

export default vacationService;