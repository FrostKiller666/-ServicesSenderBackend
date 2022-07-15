import {createPool} from "mysql2/promise";
import {config} from "../config/config";

const pool = createPool({
    host: config.dbHost,
    user: config.dbUser,
    database: config.database,
    password: config.dbPassword,
    namedPlaceholders: true,
    decimalNumbers: true,
});

export {
    pool
}
