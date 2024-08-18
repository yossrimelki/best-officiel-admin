import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateWatchForm = ({ watch, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    price: '',
    rating: '',
    color: '',
    shadow: '',
    img: [],
    solde: '',
    category: '',
    subCategory: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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
    if (watch) {
      const fetchWatchDetails = async () => {
        try {
          const response = await axios.get(`https://api.bestofficiel.com/api/watches/${watch._id}`);
          setFormData(response.data);
          if (response.data.img && response.data.img.length > 0) {
            const previews = response.data.img.map((img) => `https://api.bestofficiel.com/${img}`);
            setImagePreviews(previews);
          }
        } catch (error) {
          console.error('Failed to fetch watch details:', error);
        }
      };

      fetchWatchDetails();
    }
  }, [watch]);

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
    if (formData.category) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get('https://api.bestofficiel.com/api/subcategories', {
            params: { category: formData.category }
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
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setImageFiles([...files]);
      const previews = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    imageFiles.forEach(file => {
      data.append('img', file);
    });

    try {
      const response = await axios.put(`https://api.bestofficiel.com/api/watches/${watch._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Watch updated successfully.');
      onUpdate(response.data);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Failed to update watch:', error);
      setError('Failed to update watch. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Produit</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avis en étoile</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <select
            name="color"
            value={formData.color}
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
            value={formData.shadow}
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
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="file"
            name="img"
            multiple
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        {imagePreviews.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Previews</label>
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-32 h-32 object-cover border rounded"
                />
              ))}
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Solde</label>
          <input
            type="number"
            name="solde"
            value={formData.solde}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
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
          <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select a sub-category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Watch
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateWatchForm;
