'use strict';
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true,
    },
    lastname: DataTypes.STRING,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      classMethods: {
        associate: function (models) {
          //associations can be defined here
          User.hasMany(models.Recipes, {
            foreignKey: 'userId',
          });

          User.hasMany(models.Reviews, {
            foreignKey: 'userId'
          });
          User.hasMany(models.Favorites, {
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
         * @returns {void} no return
         */
        hashPassword() {
          this.password = bcrypt.hashSync(this.password.trim(), bcrypt.genSaltSync(10));
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