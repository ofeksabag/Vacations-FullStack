import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
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
    let indexToChange;

    switch(action.type) {

        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if(indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation:
            indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if(indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1);
            break;

        case VacationsActionType.Follow:
            indexToChange = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations[indexToChange].followersCount++;
            newState.vacations[indexToChange].isFollowing = 1;
            break;

        case VacationsActionType.Unfollow:
            indexToChange = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations[indexToChange].followersCount--;
            newState.vacations[indexToChange].isFollowing = 0;
            break;

        }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer);