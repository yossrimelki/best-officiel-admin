import axios from 'axios';

const BASE_URL = 'https://api.bestofficiel.com/api'; // Replace with your actual backend API URL

// Function to fetch all commandes
export const getCommandes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/commandes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching commandes:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to fetch shoe details by ID
export const getShoeById = async (shoeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shoes/${shoeId}`);
    return response.data; // Assuming your shoe data is returned as an object
  } catch (error) {
    console.error(`Error fetching shoe by ID ${shoeId}:`, error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to fetch watch details by ID
export const getWatchById = async (watchId) => {
  try {
    const response = await axios.get(`${BASE_URL}/watches/${watchId}`);
    return response.data; // Assuming your watch data is returned as an object
  } catch (error) {
    console.error(`Error fetching watch by ID ${watchId}:`, error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to update the status of a commande
export const updateCommandeStatus = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/commandes/${id}/status`);
    return response.data;
  } catch (error) {
    console.error(`Error updating commande status for ID ${id}:`, error);
    throw error; // Rethrow the error to handle it in the component
  }
};
