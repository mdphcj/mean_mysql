import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAllRestaurants() {
  const [rows] = await pool.query("SELECT * FROM tbl_restaurant");
  return rows;
}

export async function getRestaurant(id) {
  const [rows] = await pool.query(`SELECT * FROM tbl_restaurant WHERE id = ?`, [id]);
  return rows[0];
}

export async function createRestaurant(name, address, email) {
  const [result] = await pool.query(
    `INSERT INTO tbl_restaurant (name, address, email) VALUES (?, ?, ?)  `,
    [name, address, email]
  );
  const id = result.insertId;
  return getRestaurant(id);
}
export async function updateRestaurant(id, name, address, email) {
  const [result] = await pool.query(
    `UPDATE tbl_restaurant SET name=?, address=?, email=? WHERE id=?  `,
    [name, address, email, id]
  );
  // const myId = result.updatedId;
  return getRestaurant(id);
}
export async function deleteRestaurant(id) {
  const [result] = await pool.query(`DELETE from tbl_restaurant WHERE id=?`, [id]);
  return result;
}

// export async function getNotes() {
//   const [rows] = await pool.query("SELECT * FROM notes");
//   return rows;
// }

// export async function getNote(id) {
//   const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
//   return rows[0]; //   return rows;
// }

// export async function createNote(title, contents) {
//   const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)  `, [
//     title,
//     contents,
//   ]);
//   const id = result.insertId;
//   return getNote(id);
// }

// export async function updateNote(id, title, contents) {
//   const [result] = await pool.query(`UPDATE notes SET title=?, contents=? WHERE id=?  `, [
//     title,
//     contents,
//     id,
//   ]);
//   // const myId = result.updatedId;
//   return getNote(id);
// }

// const notes = await createNote("title1", "content1");
// console.log(notes);
