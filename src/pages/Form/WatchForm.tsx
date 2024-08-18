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
    imageFile: null  // New state for image file
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setWatchData({
        ...watchData,
        [name]: files[0]
      });
    } else {
      setWatchData({
        ...watchData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!watchData.title || !watchData.price || !watchData.rating || !watchData.category || !watchData.subCategory) {
      setError('Please fill out all required fields.');
      return;
    }
  
    const formData = new FormData();
    for (const key in watchData) {
      formData.append(key, watchData[key]);
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
      console.error('Failed to add watch:', error);
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
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            name="title"
            value={watchData.title}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">description</label>
          <input
            type="text"
            name="text"
            value={watchData.text}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={watchData.price}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avis en etoil</label>
          <input
            type="number"
            name="rating"
            value={watchData.rating}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <select
            name="color"
            value={watchData.color}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select a color</option>
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Shadow</label>
          <select
            name="shadow"
            value={watchData.shadow}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select a shadow</option>
            {shadowOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Categorie</label>
          <select
            name="category"
            value={watchData.category}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sous-categorie</label>
          <select
            name="subCategory"
            value={watchData.subCategory}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select a sous-categorie</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Solde</label>
          <input
            type="number"
            name="solde"
            value={watchData.solde}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
  type="file"
  name="img"  // This should match the Multer field name
  onChange={handleChange}
  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
/>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Ajouter Produit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WatchForm;
