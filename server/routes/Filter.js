const Jobs = require("../models/Jobs");

const applyFilters = async (filters) => {
    try {

        let query = {};


        if (filters.jobType) {
            query.jobType = filters.jobType;
        }

        if (filters.workLocation) {
            query.workLocation = filters.workLocation;
        }
        if (filters.experience) {
            query.experience = filters.experience;
        }

        if (filters.salaryM) {
            query.salary = {
                $gte: filters.salary
            };
        }

        if (filters.salary) {
            // Add maximum salary condition if provided
            query.salary = {
                ...query.salary, // Merge with existing salary condition
                $lte: filters.salary
            };
        }

        const filteredJobs = await Jobs.find(query);
        return filteredJobs;
    } catch (error) {
        console.error("Error applying filters:", error);
        throw error;
    }
};

module.exports = {
    applyFilters
};