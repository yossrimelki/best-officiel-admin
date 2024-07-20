import axios from 'axios';

export const fetchShoes = async () => {
  try {
    const response = await fetch('https://testing-server-vercel.vercel.app/api/shoes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const shoes = await response.json();
    return shoes;
  } catch (error) {
    console.error('Failed to fetch shoes:', error);
    throw error;
  }
};

export const deleteShoe = async (shoeId) => {
  try {
    const response = await axios.delete(`https://testing-server-vercel.vercel.app/api/shoes/${shoeId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete shoe');
    }
  } catch (error) {
    console.error('Failed to delete shoe:', error);
    throw error;
  }
};
