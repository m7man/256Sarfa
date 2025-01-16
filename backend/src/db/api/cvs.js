const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CvsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cvs = await db.cvs.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cvs.setJob_seeker(data.job_seeker || null, {
      transaction,
    });

    await cvs.setCompanies(data.companies || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.cvs.getTableName(),
        belongsToColumn: 'document',
        belongsToId: cvs.id,
      },
      data.document,
      options,
    );

    return cvs;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const cvsData = data.map((item, index) => ({
      id: item.id || undefined,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const cvs = await db.cvs.bulkCreate(cvsData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < cvs.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.cvs.getTableName(),
          belongsToColumn: 'document',
          belongsToId: cvs[i].id,
        },
        data[i].document,
        options,
      );
    }

    return cvs;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const cvs = await db.cvs.findByPk(id, {}, { transaction });

    await cvs.update(
      {
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cvs.setJob_seeker(data.job_seeker || null, {
      transaction,
    });

    await cvs.setCompanies(data.companies || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.cvs.getTableName(),
        belongsToColumn: 'document',
        belongsToId: cvs.id,
      },
      data.document,
      options,
    );

    return cvs;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cvs = await db.cvs.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of cvs) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of cvs) {
        await record.destroy({ transaction });
      }
    });

    return cvs;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cvs = await db.cvs.findByPk(id, options);

    await cvs.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await cvs.destroy({
      transaction,
    });

    return cvs;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cvs = await db.cvs.findOne({ where }, { transaction });

    if (!cvs) {
      return cvs;
    }

    const output = cvs.get({ plain: true });

    output.job_seeker = await cvs.getJob_seeker({
      transaction,
    });

    output.document = await cvs.getDocument({
      transaction,
    });

    output.companies = await cvs.getCompanies({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userCompanies = (user && user.companies?.id) || null;

    if (userCompanies) {
      if (options?.currentUser?.companiesId) {
        where.companiesId = options.currentUser.companiesId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.users,
        as: 'job_seeker',

        where: filter.job_seeker
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.job_seeker
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.job_seeker
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.companies,
        as: 'companies',
      },

      {
        model: db.file,
        as: 'document',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.companies) {
        const listItems = filter.companies.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          companiesId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationId;
    }

    const queryOptions = {
      where: globalAccess ? {} : where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.cvs.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('cvs', 'document', query),
        ],
      };
    }

    const records = await db.cvs.findAll({
      attributes: ['id', 'document'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['document', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.document,
    }));
  }
};
