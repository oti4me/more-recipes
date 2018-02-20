'use strict';
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true,
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        },
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
      }
    },
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      classMethods: {
        associate: function (models) {
          Users.hasMany(models.Recipes, {
            foreignKey: 'userId',
          });

          Users.hasMany(models.Reviews, {
            foreignKey: 'userId'
          });

          Users.hasMany(models.Favorites, {
            foreignKey: 'userId'
          });

          Users.hasMany(models.Votes, {
            foreignKey: 'userId'
          });
        }
      },
      instanceMethods: {

        /**
         * compare the input password with the hashed password stored
         * @param {String} password
         * @returns {Boolean} true or false
         */
        matchPassword(password) {
          return bcrypt.compareSync(password, this.password);
        },

        /**
         * hashes the password before storing
         * @param {String} password
         * @returns {undefined} no return
         */
        hashPassword(password) {
          this.password = bcrypt.hashSync(password.trim(), bcrypt.genSaltSync(8));
        }
      },
      hooks: {
        beforeCreate(user) {
          const salt = bcrypt.genSaltSync(8);
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate(user) {
          if (user.password) {
            const salt = bcrypt.genSaltSync(8);
            user.password = bcrypt.hashSync(user.password, salt);
            user.updateAt = Date.now();
          }
        }
      },
    })
  return Users;
};