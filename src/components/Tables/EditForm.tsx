import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditForm = ({ shoe, onClose, onUpdate }) => {
  const [shoeData, setShoeData] = useState({
    ...shoe,
    sizes: shoe.sizes ? shoe.sizes.join(', ') : '',
    img: shoe.img || '' // Initialize img with existing value if available
  });
  const [file, setFile] = useState(null); // Handle file input separately
  const [error, setError] = useState('');

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
    { value: 'shadow-lg shadow-gray-400', label: 'Large Matte White Shadow' }
  ];

  useEffect(() => {
    setFile(null); // Reset file state when shoe changes
  }, [shoe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoeData(prevState => ({
      ...prevState,
      [name]: name === 'price' || name === 'rating' || name === 'solde' ? parseFloat(value) : value
    }));
  };

  const handleSizesChange = (e) => {
    setShoeData(prevState => ({
      ...prevState,
      sizes: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!shoeData.title || !shoeData.text || !shoeData.price || !shoeData.sizes || !shoeData.rating || !shoeData.color || !shoeData.shadow || !shoeData.solde) {
      setError('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', shoeData.title);
    formData.append('text', shoeData.text);
    formData.append('price', shoeData.price);
    formData.append('sizes', shoeData.sizes);
    formData.append('rating', shoeData.rating);
    formData.append('color', shoeData.color);
    formData.append('shadow', shoeData.shadow);
    formData.append('solde', shoeData.solde);
    if (file) formData.append('img', file);

    try {
      const response = await axios.put(`http://localhost:3000/api/shoes/${shoe._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating shoe:', error);
      setError('Failed to update the shoe. Please try again.');
    }
  };

  return (
    <form className="flex flex-col gap-5 p-6" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={shoeData.title}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      />
      <input
        type="text"
        name="text"
        placeholder="Description"
        value={shoeData.text}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={shoeData.price}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      />
      <input
        type="text"
        name="sizes"
        placeholder="Sizes (comma separated)"
        value={shoeData.sizes}
        onChange={handleSizesChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={shoeData.rating}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      />
      <select
        name="color"
        value={shoeData.color}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      >
        <option value="">Select Color</option>
        {colorOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        name="shadow"
        value={shoeData.shadow}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
      >
        <option value="">Select Shadow</option>
        {shadowOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="solde"
        placeholder="Solde (%)"
        value={shoeData.solde}
        onChange={handleChange}
      />
      <input
        type="file"
        name="img"
        onChange={handleFileChange}
      />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default EditForm;
