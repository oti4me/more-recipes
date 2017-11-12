'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true
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
        }
      }
    },
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        //associations can be defined here
        Users.hasMany(models.Recipes, {
          foreignKey: 'userId'
        });

        Users.hasMany(models.Reviews, {
          foreignKey: 'userId'
        });
        Users.hasMany(models.Favourites, {
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
      matchPassword: function matchPassword(password) {
        return _bcryptNodejs2.default.compareSync(password, this.password);
      },


      /**
       * hashes the password before storing
       * @param {String} password
       * @returns {void} no return
       */
      hashPassword: function hashPassword() {
        this.password = _bcryptNodejs2.default.hashSync(this.password.trim(), _bcryptNodejs2.default.genSaltSync(10));
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        var salt = _bcryptNodejs2.default.genSaltSync(8);
        user.password = _bcryptNodejs2.default.hashSync(user.password, salt);
      },
      beforeUpdate: function beforeUpdate(user) {
        if (user.password) {
          var salt = _bcryptNodejs2.default.genSaltSync(8);
          user.password = _bcryptNodejs2.default.hashSync(user.password, salt);
          user.updateAt = Date.now();
        }
      }
    }
  });
  return Users;
};