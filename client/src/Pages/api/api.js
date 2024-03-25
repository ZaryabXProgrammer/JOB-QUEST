import axios from "axios";

const Api_Url = "http://localhost:8080";

const fetchJobListings = async () => {
  try {
    const response = await axios.get(`${Api_Url}/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job listings:", error);
  }
};

const saveJobListing = async (jobData) => {
  try {
    const response = await axios.post(`${Api_Url}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error saving job listing:", error);
    throw error;
  }
};

const updateJobListing = async (jobId, updatedJobData) => {
  try {
    const response = await axios.put(
      `${Api_Url}/jobs/${jobId}`,
      updatedJobData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job listing:", error);
    throw error;
  }
};

const deleteJobListing = async (jobId) => {
  try {
    await axios.delete(`${Api_Url}/jobs/${jobId}`);
  } catch (error) {
    console.error("Error deleting job listing:", error);
    throw error;
  }
};

export { fetchJobListings, saveJobListing, updateJobListing, deleteJobListing };
