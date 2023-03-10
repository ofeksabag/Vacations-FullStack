import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacations(user: UserModel): Promise<VacationModel[]> {

    const sql = `
        SELECT DISTINCT V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId and userId = ?) AS isFollowing,
            COUNT(F.userId) as followersCount
        FROM vacations as V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
    `;

    const vacations = await dal.execute(sql, user.userId);
    return vacations;

}

async function follow(userId: number, vacationId: number): Promise<void> {

    const sql = "INSERT INTO followers VALUES(?, ?)";
    await dal.execute(sql, userId, vacationId);
    

}

async function unfollow(userId: number, vacationId: number): Promise<void> {

    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);

}

export default {
    getAllVacations,
    follow,
    unfollow
}