import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';

const FormElements = () => {
  const [shoeData, setShoeData] = useState({
    title: '',
    text: '',
    price: '',
    sizes: '', // Keep sizes as a string for easy parsing
    rating: '',
    color: '',
    shadow: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShoeData(prevState => ({
      ...prevState,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShoeData(prevState => ({
      ...prevState,
      sizes: e.target.value // Directly store sizes as a string
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the data for submission
    const formattedData = {
      ...shoeData,
      sizes: shoeData.sizes.split(',').map(size => parseFloat(size.trim())).filter(size => !isNaN(size))
    };

    console.log('Submitting data:', formattedData); // Log data to check before sending

    try {
      const response = await axios.post('https://testing-server-vercel.vercel.app/api/shoes', formattedData, {
        headers: {
          'Content-Type': 'application/json' // Use JSON content type for standard data
        }
      });
      console.log('Response:', response.data);
      setSuccessMessage('Shoe added successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage('Failed to add shoe. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Elements" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Shoe
              </h3>
            </div>
            <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={shoeData.title}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="text"
                placeholder="Description"
                value={shoeData.text}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={shoeData.price}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="sizes"
                placeholder="Sizes (comma separated)"
                value={shoeData.sizes}
                onChange={handleSizesChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={shoeData.rating}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={shoeData.color}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="shadow"
                placeholder="Shadow"
                value={shoeData.shadow}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Add Shoe
              </button>
              {successMessage && (
                <div className="mt-4 text-green-600 dark:text-green-400">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
