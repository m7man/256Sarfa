const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const companies = sequelize.define(
    'companies',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
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

  companies.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.companies.hasMany(db.users, {
      as: 'users_companies',
      foreignKey: {
        name: 'companiesId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.cvs, {
      as: 'cvs_companies',
      foreignKey: {
        name: 'companiesId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.job_offers, {
      as: 'job_offers_companies',
      foreignKey: {
        name: 'companiesId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.job_postings, {
      as: 'job_postings_companies',
      foreignKey: {
        name: 'companiesId',
      },
      constraints: false,
    });

    //end loop

    db.companies.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.companies.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return companies;
};
