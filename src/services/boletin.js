const createConnection = require("./../libs/mysql");
const Boletin = require("./../models/boletin"); // Usa mayúscula para clases por convención

class BoletinService {
    connection = null;

    async getConnection() {
        this.connection = await createConnection();
    }

    async getAll() {
        await this.getConnection();
        const sql = "SELECT * FROM boletines";
        const [rows] = await this.connection.query(sql);

        if (rows.length === 0) {
            return [];
        }

        return rows.map((row) => {
            return new Boletin(
                row.id,
                row.title,
                row.description,
                row.create_at,
                row.update_at,
                row.published_at
            );
        });
    }

    async getById(id) {
        await this.getConnection();
        const sql = "SELECT * FROM boletines WHERE id = ?";
        const values = [id];
        const [rows] = await this.connection.query(sql, values);

        if (rows.length === 0) {
            return null;
        }

        return new Boletin(
            rows[0].id,
            rows[0].title,
            rows[0].description,
            rows[0].create_at,
            rows[0].update_at,
            rows[0].published_at
        );
    }

    async create(title, description, published_at) {
        await this.getConnection();
        const sql = "INSERT INTO boletines (title, description, published_at) VALUES (?, ?, ?)";
        const values = [title, description,published_at];

        const [result] = await this.connection.query(sql, values);
        const boletin = await this.getById(result.insertId);

        return boletin;
    }
    async update(id,title,description,published_at){
        await this.getConnection();
        const sql = "UPDATE boletines SET title = ?, description = ?, published_at = ?, WHERE id = ?";
        const values =[title,description,published_at, id];
        await this.connection.query(sql, values);

        const boletin = await this.getById(id);
        return boletin;
    }
}

module.exports = BoletinService;


