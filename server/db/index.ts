import { Knex, knex } from 'knex'

let db: Knex | null = null

export const dbInstance = () => {
    if (db === null) {
        db = knex({
            client: 'sqlite3',
            connection: {
                filename: "./db/mydb.sqlite",
            },
            useNullAsDefault: true
        });
    }
    return db
}