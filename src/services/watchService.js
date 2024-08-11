import axios from 'axios';

export const fetchWatches = async () => {
  try {
    const response = await axios.get('https://api.bestofficiel.com/api/watches');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch watches:', error);
    throw error;
  }
};

export const deleteWatch = async (watchId) => {
  try {
    const response = await axios.delete(`https://api.bestofficiel.com/api/watches/${watchId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete watch');
    }
  } catch (error) {
    console.error('Failed to delete watch:', error);
    throw error;
  }
};
