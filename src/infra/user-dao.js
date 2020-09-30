const db = require('../../data');

class UserDao {

    constructor(db) {
        this._db = db;
    }

    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM usuarios
                    WHERE email = ?
                `,
                [email],
                (error, user) => {
                    if (error) {
                        return reject('User not found');
                    }

                    return resolve(user);
                }
            )
        });
    }
}

module.exports = UserDao;