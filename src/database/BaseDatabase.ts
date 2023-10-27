import { knex } from "knex"

// Exercicío 1 de POO-2

export abstract class BaseDatabase {
    protected static connectio = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/poo-1.db",
    },
    useNullAsDefault: true,
    pool: { 
        min: 0,
        max: 1,
        afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        }
    }
})
}