// services/mandiService.js

const API_KEY = '579b464db66ec23bdd0000017bcd21f7b71b45a973ce574738e88c70';
const API_URL = `http://data.gov.in/api/datastore/resource.json?resource_id=9ef84268-d588-465a-a308-a864a43d0070&api-key=${API_KEY}`;

export const getAllMandisInfo = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data.records; // Assuming 'records' contains the market data
  } catch (error) {
    console.error("Error fetching mandi data:", error);
    return [];
  }
};
