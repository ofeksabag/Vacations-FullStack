class AppConfig {
    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationsDatabase"; // Fill in the database name

    public vacationsImagesUrl = `./src/1-assets/images/vacations/`;
}

const appConfig = new AppConfig();

export default appConfig;
