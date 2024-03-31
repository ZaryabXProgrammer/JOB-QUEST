const Jobs = require("../models/Jobs");

// const applyFilters = async (filters) => {
//   try {
//     let query = {};

//     if (filters.jobType) {
//       query.jobType = filters.jobType;
//     }

//     if (filters.workLocation) {
//       query.workLocation = filters.workLocation;
//     }
//     if (filters.experience) {
//       query.experience = filters.experience;
//     }

//     if (filters.salaryM) {
//       query.salary = {
//         $gte: filters.salary,
//       };
//     }

//     if (filters.salary) {
//       // Add maximum salary condition if provided
//       query.salary = {
//         ...query.salary, // Merge with existing salary condition
//         $lte: filters.salary,
//       };
//     }

//     // const filteredJobs = await Jobs.find(query);
//     const filteredJobs = await Jobs.find(query);
//     return filteredJobs;
//   } catch (error) {
//     console.error("Error applying filters:", error);
//     throw error;
//   }
// };
const applyFilters = async (filters) => {
  try {
    if (filters.jobType) {
      const filteredJobs = await Jobs.find({ jobType: filters.jobType });
      return filteredJobs;
    }

    if (filters.workLocation) {
      const filteredJobs = await Jobs.find({
        workLocation: filters.workLocation,
      });
      return filteredJobs;
    }

    if (filters.experience) {
      const filteredJobs = await Jobs.find({ experience: filters.experience });
      return filteredJobs;
    }

    if (filters.salaryM && filters.salary) {
      const filteredJobs = await Jobs.find({
        salary: {
          $gte: filters.salaryM,
          $lte: filters.salary,
        },
      });
      return filteredJobs;
    }

    if (filters.salaryM) {
      const filteredJobs = await Jobs.find({
        salary: { $gte: filters.salaryM },
      });
      return filteredJobs;
    }

    if (filters.salary) {
      const filteredJobs = await Jobs.find({
        salary: { $lte: filters.salary },
      });
      return filteredJobs;
    }

    // If no filters are applied, return all jobs
    const allJobs = await Jobs.find({});
    return allJobs;
  } catch (error) {
    console.error("Error applying filters:", error);
    throw error;
  }
};


module.exports = {
  applyFilters,
};
