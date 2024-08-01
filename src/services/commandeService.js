import axios from 'axios';
export const updateCommandeStatus = async (id) => {
    const response = await axios.put(`http://localhost:3000/api/commandes/${id}/status`);
    return response.data;
  };    