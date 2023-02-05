class AppConfig {

    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
    public adminReportUrl = "http://localhost:4000/api/admin/vacations-report/";

    public userVacationsUrl = "http://localhost:4000/api/users/vacations/";
    public userVacationsImagesUrl = "http://localhost:4000/api/users/vacations/images/";

    public loginUrl = "http://localhost:4000/api/auth/login/";
    public registerUrl = "http://localhost:4000/api/auth/register/";

    public followUrl = "http://localhost:4000/api/users/follow/";
    public unfollowUrl = "http://localhost:4000/api/users/unfollow/";
}

const appConfig = new AppConfig();

export default appConfig;