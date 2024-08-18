import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WatchForm = ({ onClose }) => {
  const [watchData, setWatchData] = useState({
    title: '',
    text: '',
    price: '',
    rating: '',
    color: '',
    shadow: '',
    subCategory: '',
    solde: '',
    category: '',
    img: [] as File[] // State for multiple image files
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State for image previews

  const colorOptions = [
    { value: 'from-blue-900 to-blue-500', label: 'Blue Gradient' },
    { value: 'from-sky-600 to-indigo-600', label: 'Sky to Indigo Gradient' },
    { value: 'from-red-500 to-yellow-500', label: 'Red to Yellow Gradient' },
    { value: 'from-gray-900 to-black', label: 'Matte Black Gradient' },
    { value: 'from-gray-100 to-gray-300', label: 'White Gradient' },
    { value: 'bg-white text-black', label: 'White Background with Black Text' }
  ];

  const shadowOptions = [
    { value: 'shadow-lg shadow-blue-500', label: 'Large Blue Shadow' },
    { value: 'shadow-md shadow-green-500', label: 'Medium Green Shadow' },
    { value: 'shadow-sm shadow-red-500', label: 'Small Red Shadow' },
    { value: 'shadow-lg shadow-gray-800', label: 'Large Matte Black Shadow' },
    { value: 'shadow-lg shadow-gray-400', label: 'Large Matte White Shadow' },
    { value: 'shadow-md shadow-black', label: 'Medium Black Shadow' }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.bestofficiel.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (watchData.category) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get('https://api.bestofficiel.com/api/subcategories', {
            params: { category: watchData.category }
          });
          setSubCategories(response.data);
        } catch (error) {
          console.error('Error fetching sub-categories:', error);
          setError('Failed to load sub-categories.');
        }
      };

      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [watchData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Handle multiple file uploads
      if (files) {
        const newFiles = Array.from(files);
        setWatchData(prevData => ({
          ...prevData,
          img: [...prevData.img, ...newFiles] // Append new files to existing ones
        }));

        // Generate and set image previews
        const previews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
      }
    } else {
      setWatchData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!watchData.title || !watchData.price || !watchData.rating || !watchData.category || !watchData.subCategory) {
      setError('Please fill out all required fields.');
      return;
    }
  
    const formData = new FormData();
    for (const key in watchData) {
      if (key === 'img') {
        // Append images to FormData
        watchData[key].forEach((file, index) => formData.append(`img${index}`, file));
      } else {
        formData.append(key, watchData[key]);
      }
    }
  
    try {
      const response = await axios.post('https://api.bestofficiel.com/api/watches', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Watch added successfully.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to add watch:', error.message);
        console.error('Error details:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      setError('Failed to add watch. Please try again.');
    }
  };
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Ajouter Produit</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Titre:</label>
          <input
            type="text"
            name="title"
            value={watchData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Texte:</label>
          <textarea
            name="text"
            value={watchData.text}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Prix:</label>
          <input
            type="number"
            name="price"
            value={watchData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Évaluation:</label>
          <input
            type="number"
            name="rating"
            value={watchData.rating}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Couleur:</label>
          <select
            name="color"
            value={watchData.color}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ombre:</label>
          <select
            name="shadow"
            value={watchData.shadow}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {shadowOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Catégorie:</label>
          <select
            name="category"
            value={watchData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {watchData.category && (
          <div className="mb-4">
            <label className="block text-gray-700">Sous-catégorie:</label>
            <select
              name="subCategory"
              value={watchData.subCategory}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionner une sous-catégorie</option>
              {subCategories.map(subCategory => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Images:</label>
          <input
            type="file"
            name="img"
            onChange={handleChange}
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="mt-2">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Ajouter
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default WatchForm;
