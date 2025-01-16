const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cvs = sequelize.define(
    'cvs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  cvs.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.cvs.belongsTo(db.users, {
      as: 'job_seeker',
      foreignKey: {
        name: 'job_seekerId',
      },
      constraints: false,
    });

    db.cvs.belongsTo(db.companies, {
      as: 'companies',
      foreignKey: {
        name: 'companiesId',
      },
      constraints: false,
    });

    db.cvs.hasMany(db.file, {
      as: 'document',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.cvs.getTableName(),
        belongsToColumn: 'document',
      },
    });

    db.cvs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cvs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cvs;
};
