const db = require('../models');
const Users = db.users;

const Cvs = db.cvs;

const JobOffers = db.job_offers;

const JobPostings = db.job_postings;

const Companies = db.companies;

const CvsData = [
  {
    // type code here for "relation_one" field
    // type code here for "files" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "files" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "files" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "files" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "files" field
    // type code here for "relation_one" field
  },
];

const JobOffersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    position: 'Karl Landsteiner',

    offer_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    position: 'William Bayliss',

    offer_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    position: 'Tycho Brahe',

    offer_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    position: 'Ernst Haeckel',

    offer_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    position: 'Alfred Kinsey',

    offer_date: new Date(),

    // type code here for "relation_one" field
  },
];

const JobPostingsData = [
  {
    // type code here for "relation_one" field

    title: 'Tycho Brahe',

    description: 'Neils Bohr',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    title: 'Christiaan Huygens',

    description: 'Ludwig Boltzmann',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    title: 'Albrecht von Haller',

    description: 'Sheldon Glashow',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    title: 'Karl Landsteiner',

    description: 'Claude Bernard',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    title: 'Joseph J. Thomson',

    description: 'Trofim Lysenko',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },
];

const CompaniesData = [
  {
    name: 'William Bayliss',
  },

  {
    name: 'Emil Kraepelin',
  },

  {
    name: 'Emil Kraepelin',
  },

  {
    name: 'Rudolf Virchow',
  },

  {
    name: 'Ernest Rutherford',
  },
];

// Similar logic for "relation_many"

async function associateUserWithCompany() {
  const relatedCompany0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setCompany) {
    await User0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setCompany) {
    await User1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setCompany) {
    await User2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setCompany) {
    await User3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setCompany) {
    await User4.setCompany(relatedCompany4);
  }
}

async function associateCvWithJob_seeker() {
  const relatedJob_seeker0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cv0 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Cv0?.setJob_seeker) {
    await Cv0.setJob_seeker(relatedJob_seeker0);
  }

  const relatedJob_seeker1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cv1 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Cv1?.setJob_seeker) {
    await Cv1.setJob_seeker(relatedJob_seeker1);
  }

  const relatedJob_seeker2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cv2 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Cv2?.setJob_seeker) {
    await Cv2.setJob_seeker(relatedJob_seeker2);
  }

  const relatedJob_seeker3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cv3 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Cv3?.setJob_seeker) {
    await Cv3.setJob_seeker(relatedJob_seeker3);
  }

  const relatedJob_seeker4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cv4 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Cv4?.setJob_seeker) {
    await Cv4.setJob_seeker(relatedJob_seeker4);
  }
}

async function associateCvWithCompany() {
  const relatedCompany0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Cv0 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Cv0?.setCompany) {
    await Cv0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Cv1 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Cv1?.setCompany) {
    await Cv1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Cv2 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Cv2?.setCompany) {
    await Cv2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Cv3 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Cv3?.setCompany) {
    await Cv3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const Cv4 = await Cvs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Cv4?.setCompany) {
    await Cv4.setCompany(relatedCompany4);
  }
}

async function associateJobOfferWithBusiness_owner() {
  const relatedBusiness_owner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer0 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (JobOffer0?.setBusiness_owner) {
    await JobOffer0.setBusiness_owner(relatedBusiness_owner0);
  }

  const relatedBusiness_owner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer1 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (JobOffer1?.setBusiness_owner) {
    await JobOffer1.setBusiness_owner(relatedBusiness_owner1);
  }

  const relatedBusiness_owner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer2 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (JobOffer2?.setBusiness_owner) {
    await JobOffer2.setBusiness_owner(relatedBusiness_owner2);
  }

  const relatedBusiness_owner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer3 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (JobOffer3?.setBusiness_owner) {
    await JobOffer3.setBusiness_owner(relatedBusiness_owner3);
  }

  const relatedBusiness_owner4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer4 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (JobOffer4?.setBusiness_owner) {
    await JobOffer4.setBusiness_owner(relatedBusiness_owner4);
  }
}

async function associateJobOfferWithJob_seeker() {
  const relatedJob_seeker0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer0 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (JobOffer0?.setJob_seeker) {
    await JobOffer0.setJob_seeker(relatedJob_seeker0);
  }

  const relatedJob_seeker1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer1 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (JobOffer1?.setJob_seeker) {
    await JobOffer1.setJob_seeker(relatedJob_seeker1);
  }

  const relatedJob_seeker2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer2 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (JobOffer2?.setJob_seeker) {
    await JobOffer2.setJob_seeker(relatedJob_seeker2);
  }

  const relatedJob_seeker3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer3 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (JobOffer3?.setJob_seeker) {
    await JobOffer3.setJob_seeker(relatedJob_seeker3);
  }

  const relatedJob_seeker4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobOffer4 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (JobOffer4?.setJob_seeker) {
    await JobOffer4.setJob_seeker(relatedJob_seeker4);
  }
}

async function associateJobOfferWithCompany() {
  const relatedCompany0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobOffer0 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (JobOffer0?.setCompany) {
    await JobOffer0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobOffer1 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (JobOffer1?.setCompany) {
    await JobOffer1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobOffer2 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (JobOffer2?.setCompany) {
    await JobOffer2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobOffer3 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (JobOffer3?.setCompany) {
    await JobOffer3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobOffer4 = await JobOffers.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (JobOffer4?.setCompany) {
    await JobOffer4.setCompany(relatedCompany4);
  }
}

async function associateJobPostingWithHr_manager() {
  const relatedHr_manager0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobPosting0 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (JobPosting0?.setHr_manager) {
    await JobPosting0.setHr_manager(relatedHr_manager0);
  }

  const relatedHr_manager1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobPosting1 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (JobPosting1?.setHr_manager) {
    await JobPosting1.setHr_manager(relatedHr_manager1);
  }

  const relatedHr_manager2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobPosting2 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (JobPosting2?.setHr_manager) {
    await JobPosting2.setHr_manager(relatedHr_manager2);
  }

  const relatedHr_manager3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobPosting3 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (JobPosting3?.setHr_manager) {
    await JobPosting3.setHr_manager(relatedHr_manager3);
  }

  const relatedHr_manager4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const JobPosting4 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (JobPosting4?.setHr_manager) {
    await JobPosting4.setHr_manager(relatedHr_manager4);
  }
}

async function associateJobPostingWithCompany() {
  const relatedCompany0 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobPosting0 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (JobPosting0?.setCompany) {
    await JobPosting0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobPosting1 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (JobPosting1?.setCompany) {
    await JobPosting1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobPosting2 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (JobPosting2?.setCompany) {
    await JobPosting2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobPosting3 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (JobPosting3?.setCompany) {
    await JobPosting3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Companies.findOne({
    offset: Math.floor(Math.random() * (await Companies.count())),
  });
  const JobPosting4 = await JobPostings.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (JobPosting4?.setCompany) {
    await JobPosting4.setCompany(relatedCompany4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Cvs.bulkCreate(CvsData);

    await JobOffers.bulkCreate(JobOffersData);

    await JobPostings.bulkCreate(JobPostingsData);

    await Companies.bulkCreate(CompaniesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithCompany(),

      await associateCvWithJob_seeker(),

      await associateCvWithCompany(),

      await associateJobOfferWithBusiness_owner(),

      await associateJobOfferWithJob_seeker(),

      await associateJobOfferWithCompany(),

      await associateJobPostingWithHr_manager(),

      await associateJobPostingWithCompany(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cvs', null, {});

    await queryInterface.bulkDelete('job_offers', null, {});

    await queryInterface.bulkDelete('job_postings', null, {});

    await queryInterface.bulkDelete('companies', null, {});
  },
};
