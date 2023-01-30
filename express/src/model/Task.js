const db = require("../db/index");
const { getSqlDate } = require("../utils/date");

class Task {
  static async getAllByUserId(userId) {
    const q = "SELECT * FROM my_tasks_app_tasks where user_id = ?;";

    return await new Promise((res, rej) => {
      db.query(q, [userId], (err, results) => {
        if (err) rej(new Error(err));
        res(results);
      });
    });
  }

  static async create(title, description, userId) {
    const date = new Date();
    const sqlDate = getSqlDate(date);
    const q =
      "INSERT INTO my_tasks_app_tasks(title, description, user_id, created_at, updated_at) VALUES (?);";

    return await new Promise((res, rej) => {
      db.query(
        q,
        [[title, description, userId, sqlDate, sqlDate]],
        (err, result) => {
          if (err) rej(new Error(err));
          res({
            id: result.insertId,
            title,
            description,
            done: 0,
            user_id: userId,
            created_at: sqlDate,
            updated_at: sqlDate,
          });
        }
      );
    });
  }

  static async delete(id) {
    const q = "DELETE FROM my_tasks_app_tasks WHERE id = ?;";

    return await new Promise((res, rej) => {
      db.query(q, [id], (err, result) => {
        if (err) rej(new Error(err));
        res(true);
      });
    });
  }

  static async get(id) {
    const q = "SELECT * FROM my_tasks_app_tasks WHERE id = ?;";

    return new Promise((res, rej) => {
      db.query(q, [id], (err, results) => {
        if (err) rej(new Error(err));
        res(results[0]);
      });
    });
  }

  static async update(id, title, description) {
    const result = await this.get(id);
    const q =
      "UPDATE my_tasks_app_tasks SET title = ?, description = ?, updated_at = ? WHERE id = ?;";
    const date = new Date();
    const sqlDate = getSqlDate(date);

    return new Promise((res, rej) => {
      db.query(q, [title, description, sqlDate, id], (err, _) => {
        if (err) rej(new Error(err));
        res({
          ...result,
          updated_at: sqlDate,
          title,
          description: description || null,
        });
      });
    });
  }

  static async toggle(id) {
    const result = await this.get(id);
    const done = result.done;
    const sqlDone = done === 0 ? 1 : 0;

    const q =
      "UPDATE my_tasks_app_tasks SET done = ?, updated_at = ? WHERE id = ?;";
    const date = new Date();
    const sqlDate = getSqlDate(date);

    return new Promise((res, rej) => {
      db.query(q, [sqlDone, sqlDate, id], (err, _) => {
        if (err) rej(new Error(err));
        res({
          ...result,
          updated_at: sqlDate,
          done: sqlDone,
        });
      });
    });
  }
}

module.exports = Task;
