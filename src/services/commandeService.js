import axios from 'axios';
export const updateCommandeStatus = async (id) => {
    const response = await axios.put(`https://api.bestofficiel.com/api/commandes/${id}/status`);
    return response.data;
  };    