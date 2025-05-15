const createConnection = require ("./../libs/mysql")
const boletin = require("./../models/boletin")

class boletinService {
    connection = null;

    async getConnection(){
        this.connection = await createConnection()
    }

    async getAll(){
        await this.getConnection()
        const sql = "SELECT * FROM boletines";
        const [rows] = await this.connection.query(sql)

        if (rows.length == 0){
            return []
        }

        return rows.map((row) => {
            return new boletin(
                row.id,
                row.title,
                row.description,
                row.create_at,
                row.update_at,
                row.published_at
            )
        })
    }

}

module.exports = boletinService

