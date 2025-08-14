import axios from 'axios';

const API_URL = 'http://localhost:3000/lucrari';

export const getLucrari = async (status) => {
  const params = status ? { params: { status } } : {};
  return axios.get(API_URL, params);
};

export const getLucrare = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createLucrare = async (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateLucrare = async (id, data) => {
    try {
      // Verifică dacă este imagine nouă
      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('descriere', data.descriere);
        formData.append('status', data.status);
        if (data.link_client) formData.append('link_client', data.link_client);
        formData.append('image', data.image);

        return await axios.patch(`http://localhost:3000/lucrari/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // Actualizare fără imagine nouă
      return await axios.patch(`http://localhost:3000/lucrari/${id}`, data);
    } catch (error) {
      console.error('Eroare API updateLucrare:', {
        request: { id, data },
        error: error.response?.data || error.message
      });
      throw error;
    }
  };

export const deleteLucrare = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const deleteImage = async (filename) => {
  return axios.delete(`http://localhost:3000/lucrari/image/${filename}`);
};