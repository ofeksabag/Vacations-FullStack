class AppConfig {

    public adminVacationsUrl = "http://localhost:4001/api/admin/vacations/";
    public adminReportUrl = "http://localhost:4001/api/admin/vacations-report/";

    public userVacationsUrl = "http://localhost:4001/api/users/vacations/";
    public userVacationsImagesUrl = "http://localhost:4001/api/users/vacations/images/";

    public loginUrl = "http://localhost:4001/api/auth/login/";
    public registerUrl = "http://localhost:4001/api/auth/register/";

    public followUrl = "http://localhost:4001/api/users/follow/";
    public unfollowUrl = "http://localhost:4001/api/users/unfollow/";
}

const appConfig = new AppConfig();

export default appConfig;