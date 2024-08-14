const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];
// Sort the jobType array based on the name
jobTypes.sort((a, b) => a.localeCompare(b));

// Export the sorted cities array
const locationTypes = ["Remote", "On-site", "Hybrid"];
export { jobTypes, locationTypes };
