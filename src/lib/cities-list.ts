const cities = [
  {
    country: "India",
    geonameid: 1273293,
    name: "Bangalore",
    state: "Karnataka",
  },
  {
    country: "India",
    geonameid: 1275339,
    name: "Hyderabad",
    state: "Telangana",
  },
  {
    country: "India",
    geonameid: 1275339,
    name: "Pune",
    state: "Maharashtra",
  },
  {
    country: "India",
    geonameid: 1269843,
    name: "Chennai",
    state: "Tamil Nadu",
  },
  {
    country: "India",
    geonameid: 1275004,
    name: "Mumbai",
    state: "Maharashtra",
  },
  {
    country: "India",
    geonameid: 1279233,
    name: "Noida",
    state: "Uttar Pradesh",
  },
  {
    country: "India",
    geonameid: 1279259,
    name: "Gurgaon",
    state: "Haryana",
  },
  {
    country: "India",
    geonameid: 1275339,
    name: "Chandigarh",
    state: "Chandigarh",
  },
  {
    country: "India",
    geonameid: 1264527,
    name: "Ahmedabad",
    state: "Gujarat",
  },
  {
    country: "India",
    geonameid: 1272175,
    name: "Kolkata",
    state: "West Bengal",
  },
  {
    country: "India",
    geonameid: 1277333,
    name: "Jaipur",
    state: "Rajasthan",
  },
  {
    country: "India",
    geonameid: 1277756,
    name: "Lucknow",
    state: "Uttar Pradesh",
  },
  {
    country: "India",
    geonameid: 1273874,
    name: "Gandhinagar",
    state: "Gujarat",
  },
  {
    country: "India",
    geonameid: 1277333,
    name: "Indore",
    state: "Madhya Pradesh",
  },
  {
    country: "India",
    geonameid: 1253993,
    name: "Thiruvananthapuram",
    state: "Kerala",
  },
  {
    country: "India",
    geonameid: 1277756,
    name: "Bhopal",
    state: "Madhya Pradesh",
  },
  {
    country: "India",
    geonameid: 1269843,
    name: "Coimbatore",
    state: "Tamil Nadu",
  },
  {
    country: "India",
    geonameid: 1278710,
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
  },
  {
    country: "India",
    geonameid: 1262180,
    name: "Nagpur",
    state: "Maharashtra",
  },
  {
    country: "India",
    geonameid: 1279233,
    name: "Faridabad",
    state: "Haryana",
  },
  {
    country: "USA",
    geonameid: 5128581,
    name: "New York City",
    state: "New York",
  },
  {
    country: "USA",
    geonameid: 5391959,
    name: "San Francisco",
    state: "California",
  },
  {
    country: "USA",
    geonameid: 4887398,
    name: "Chicago",
    state: "Illinois",
  },
  {
    country: "USA",
    geonameid: 5392171,
    name: "San Jose",
    state: "California",
  },
  {
    country: "USA",
    geonameid: 4164138,
    name: "Washington D.C.",
    state: "District of Columbia",
  },
  {
    country: "USA",
    geonameid: 5392171,
    name: "Seattle",
    state: "Washington",
  },
  {
    country: "USA",
    geonameid: 5128581,
    name: "Boston",
    state: "Massachusetts",
  },
  {
    country: "USA",
    geonameid: 4560349,
    name: "Austin",
    state: "Texas",
  },
  {
    country: "USA",
    geonameid: 5332921,
    name: "Los Angeles",
    state: "California",
  },
  {
    country: "USA",
    geonameid: 4930956,
    name: "Cambridge",
    state: "Massachusetts",
  },
  {
    country: "USA",
    geonameid: 5393052,
    name: "Mountain View",
    state: "California",
  },
  {
    country: "USA",
    geonameid: 5392171,
    name: "Santa Clara",
    state: "California",
  },
];

// Sort the cities array based on the city name
cities.sort((a, b) => a.name.localeCompare(b.name));

// Export the sorted cities array
export { cities };