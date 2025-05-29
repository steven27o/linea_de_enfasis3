const createConnection = require("./../libs/mysql");
const Boletin = require("./../models/boletin");

class boletinService {
  Connection = null;

  async getConnection() {
    this.Connection = await createConnection();
  }

  async getAll() {
    await this.getConnection();
    const sql = "SELECT * FROM boletin";
    const [rows] = await this.Connection.query(sql);

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

  async getByid(id) {
    await this.getConnection();
    const sql = "SELECT * FROM boletin WHERE id = ?";
    const [rows] = await this.Connection.query(sql, [id]);

    if (rows.length === 0) {
      return null;
    }

    const boletin = new Boletin(
      rows[0].id,
      rows[0].title,
      rows[0].description,
      rows[0].create_at,
      rows[0].update_at,
      rows[0].published_at
    );

    return boletin;
  }

  async create(title, description, published_at) {
    await this.getConnection();
    const sql =
      "INSERT INTO boletin (title, description, published_at) VALUES (?, ?, ?)";
    const values = [title, description, published_at];

    const [result] = await this.Connection.query(sql, values);

    const boletin = await this.getByid(result.insertId);

    return boletin;
  }

  async update(id, title, description, published_at) {
    await this.getConnection();
    const sql =
      "UPDATE boletin SET title = ?, description = ?, published_at = ? WHERE id = ?";
    const values = [title, description, published_at, id];

    await this.Connection.query(sql, values);

    const boletin = await this.getByid(id);

    return boletin;
  }

  async delete(id) {
    await this.getConnection();

    const sql = "DELETE FROM boletin WHERE id = ?";
    const [result] = await this.Connection.query(sql, [id]);

    return result.affectedRows > 0;
  }
}

module.exports = boletinService;

