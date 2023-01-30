const db = require("../db/index");
const { getHashedPassword, comparePassword } = require("../utils/password");
const { getSqlDate } = require("../utils/date");

class User {
  static async getByEmail(email) {
    const q = "SELECT * FROM my_tasks_app_users WHERE email = ?;";

    return await new Promise((res, rej) => {
      db.query(q, [email], (err, results) => {
        if (err) rej(new Error(err));
        res(results[0]);
      });
    });
  }

  static async signup(username, email, password) {
    const hash = await getHashedPassword(password);
    const date = getSqlDate(new Date());
    const q =
      "INSERT INTO my_tasks_app_users(username, email, password, created_at) VALUES(?, ?, ?, ?);";

    return await new Promise((res, rej) => {
      db.query(q, [username, email, hash, date], (err, result) => {
        if (err) rej(new Error(err));
        res({
          id: result.insertId,
          username,
          email,
          created_at: date,
        });
      });
    });
  }

  static async login(email, password) {
    const q = "SELECT * FROM my_tasks_app_users WHERE email = ?;";

    return await new Promise((res, rej) => {
      db.query(q, [email], async (err, results) => {
        if (err) rej(new Error(err));
        if (results.length === 0) {
          res({ error: "Invalid credentials" });
        } else {
          const user = results[0];
          const match = await comparePassword(user.password, password);
          if (!match) {
            res({ error: "Invalid credentials" });
          } else {
            res({
              result: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
              },
            });
          }
        }
      });
    });
  }

  static async get(id) {
    const q = "SELECT * FROM my_tasks_app_users where id = ?;";

    return await new Promise((res, rej) => {
      db.query(q, [id], (err, results) => {
        if (err) rej(new Error(err));
        if (results.length === 0) {
          res(null);
        }
        const user = results[0];
        res({
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
        });
      });
    });
  }
}

module.exports = User;
