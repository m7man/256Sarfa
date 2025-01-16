const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Job_offersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const job_offers = await db.job_offers.create(
      {
        id: data.id || undefined,

        position: data.position || null,
        offer_date: data.offer_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await job_offers.setBusiness_owner(data.business_owner || null, {
      transaction,
    });

    await job_offers.setJob_seeker(data.job_seeker || null, {
      transaction,
    });

    await job_offers.setCompanies(data.companies || null, {
      transaction,
    });

    return job_offers;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const job_offersData = data.map((item, index) => ({
      id: item.id || undefined,

      position: item.position || null,
      offer_date: item.offer_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const job_offers = await db.job_offers.bulkCreate(job_offersData, {
      transaction,
    });

    // For each item created, replace relation files

    return job_offers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const job_offers = await db.job_offers.findByPk(id, {}, { transaction });

    await job_offers.update(
      {
        position: data.position || null,
        offer_date: data.offer_date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await job_offers.setBusiness_owner(data.business_owner || null, {
      transaction,
    });

    await job_offers.setJob_seeker(data.job_seeker || null, {
      transaction,
    });

    await job_offers.setCompanies(data.companies || null, {
      transaction,
    });

    return job_offers;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const job_offers = await db.job_offers.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of job_offers) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of job_offers) {
        await record.destroy({ transaction });
      }
    });

    return job_offers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const job_offers = await db.job_offers.findByPk(id, options);

    await job_offers.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await job_offers.destroy({
      transaction,
    });

    return job_offers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const job_offers = await db.job_offers.findOne({ where }, { transaction });

    if (!job_offers) {
      return job_offers;
    }

    const output = job_offers.get({ plain: true });

    output.business_owner = await job_offers.getBusiness_owner({
      transaction,
    });

    output.job_seeker = await job_offers.getJob_seeker({
      transaction,
    });

    output.companies = await job_offers.getCompanies({
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
        as: 'business_owner',

        where: filter.business_owner
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.business_owner
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.business_owner
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.position) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('job_offers', 'position', filter.position),
        };
      }

      if (filter.offer_dateRange) {
        const [start, end] = filter.offer_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            offer_date: {
              ...where.offer_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            offer_date: {
              ...where.offer_date,
              [Op.lte]: end,
            },
          };
        }
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
      const { rows, count } = await db.job_offers.findAndCountAll(queryOptions);

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
          Utils.ilike('job_offers', 'position', query),
        ],
      };
    }

    const records = await db.job_offers.findAll({
      attributes: ['id', 'position'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['position', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.position,
    }));
  }
};
