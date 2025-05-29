const createConnection = require("./../libs/mysql");
const Boletin = require("./../models/boletin");

class BoletinService {
    connection = null;

    async getConnection() {
        this.connection = await createConnection();
    }

    async getAll() {
        await this.getConnection();
        const sql = "SELECT * FROM boletines";
        const [rows] = await this.connection.query(sql);

        return rows.map((row) => new Boletin(
            row.id,
            row.title,
            row.description,
            row.create_at,
            row.update_at,
            row.published_at
        ));
    }

    async getById(id) {
        await this.getConnection();
        const sql = "SELECT * FROM boletines WHERE id = ?";
        const [rows] = await this.connection.query(sql, [id]);

        if (rows.length === 0) return null;

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
        const values = [title, description, published_at];

        const [result] = await this.connection.query(sql, values);
        return this.getById(result.insertId);
    }

    async update(id, title, description, published_at) {
        await this.getConnection();
        const sql = "UPDATE boletines SET title = ?, description = ?, published_at = ? WHERE id = ?";
        const values = [title, description, published_at, id];
        await this.connection.query(sql, values);

        return this.getById(id);
    }

    async delete(id) {
        await this.getConnection();
        const sql = "DELETE FROM boletines WHERE id = ?";
        await this.connection.query(sql, [id]);

        return { message: "Boletín eliminado correctamente", id };
    }
}

module.exports = BoletinService;

