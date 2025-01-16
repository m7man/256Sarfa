const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const job_offers = sequelize.define(
    'job_offers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      position: {
        type: DataTypes.TEXT,
      },

      offer_date: {
        type: DataTypes.DATE,
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

  job_offers.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.job_offers.belongsTo(db.users, {
      as: 'business_owner',
      foreignKey: {
        name: 'business_ownerId',
      },
      constraints: false,
    });

    db.job_offers.belongsTo(db.users, {
      as: 'job_seeker',
      foreignKey: {
        name: 'job_seekerId',
      },
      constraints: false,
    });

    db.job_offers.belongsTo(db.companies, {
      as: 'companies',
      foreignKey: {
        name: 'companiesId',
      },
      constraints: false,
    });

    db.job_offers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.job_offers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return job_offers;
};
