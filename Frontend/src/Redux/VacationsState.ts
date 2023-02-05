import { createStore } from "redux";
import FollowersModel from "../Models/FollowersModel";
import VacationModel from "../Models/VacationModel";

export class VacationsState {
    public userVacations: VacationModel[] = [];
    public adminVacations: VacationModel[] = [];
    public followers: FollowersModel[] = [];
}

export enum VacationsActionType {
    FetchUserVacations = "FetchUserVacations",
    FetchAdminVacations = "FetchAdminVacations",
    AddVacation = "AddVacations",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    Follow = "Follow",
    Unfollow = "Unfollow"
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = {...currentState};
    let indexToDelete;

    switch(action.type) {

        case VacationsActionType.FetchUserVacations:
            newState.userVacations = action.payload;
            break;

        case VacationsActionType.FetchAdminVacations:
            newState.adminVacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newState.adminVacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.adminVacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if(indexToUpdate >= 0) newState.adminVacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation:
            indexToDelete = newState.adminVacations.findIndex(v => v.vacationId === action.payload);
            if(indexToDelete >= 0) newState.adminVacations.splice(indexToDelete, 1);
            break;

        case VacationsActionType.Follow:
            newState.followers.push(action.payload);
            break;

        case VacationsActionType.Unfollow:
            indexToDelete = newState.followers.findIndex(f => f.userId === action.payload);
            if(indexToDelete >= 0) newState.followers.splice(indexToDelete, 1);
            break;

        }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer);