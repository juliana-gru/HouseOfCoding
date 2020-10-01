const uuid = require('uuid/v4');

class UserDao {

    constructor(db) {
        this._db = db;
    }

    createUser(email, password) {
        return new Promise((resolve, reject) => {
            //CANT add user to database
        })
    }

    searchByEmail(email) {
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