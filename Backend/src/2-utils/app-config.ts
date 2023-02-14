class AppConfig {
    public mysqlHost = process.env.MYSQL_HOST;
    public mysqlUser = process.env.MYSQL_USER;
    public mysqlPassword = process.env.MYSQL_PASSWORD;
    public mysqlDatabase = process.env.MYSQL_DATABASE;

    public vacationsImagesUrl = `./src/1-assets/images/vacations/`;
}

const appConfig = new AppConfig();

export default appConfig;