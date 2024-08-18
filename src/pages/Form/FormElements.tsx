import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';

const FormElements = () => {
  const [shoeData, setShoeData] = useState({
    title: '',
    text: '',
    price: '',
    sizes: '',
    rating: '',
    color: 'from-blue-900 to-blue-500', // Default color
    shadow: 'shadow-lg shadow-blue-500', // Default shadow
    solde: ''
  });
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    const newFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', shoeData.title);
    formData.append('text', shoeData.text);
    formData.append('price', shoeData.price);
    formData.append('sizes', shoeData.sizes);
    formData.append('rating', shoeData.rating);
    formData.append('color', shoeData.color);
    formData.append('shadow', shoeData.shadow);
    formData.append('solde', shoeData.solde);

    files.forEach((file, index) => {
      formData.append(`img${index}`, file);
    });

    try {
      const response = await axios.post('https://api.bestofficiel.com/api/shoes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Shoe added successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to add shoe. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Nouvel arrivage" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Ajouter nouvel arrivage
              </h3>
            </div>
            <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={shoeData.title}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="text"
                placeholder="Description"
                value={shoeData.text}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={shoeData.price}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="sizes"
                placeholder="Sizes (comma separated)"
                value={shoeData.sizes}
                onChange={handleSizesChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                name="rating"
                placeholder="Avis Star"
                value={shoeData.rating}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <select
                name="color"
                value={shoeData.color}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                name="shadow"
                value={shoeData.shadow}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                {shadowOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="solde"
                placeholder="Solde"
                value={shoeData.solde}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button
                type="submit"
                className="w-full rounded-lg border bg-primary py-3 px-5 text-base font-medium text-white transition hover:bg-opacity-90"
              >
                Ajouter nouvel arrivage
              </button>
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>

            {/* Display all selected images */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <p className="absolute top-1 right-1 text-xs text-gray-500">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
