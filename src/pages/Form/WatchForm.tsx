import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';

const WatchForm = () => {
  const [watchData, setWatchData] = useState({
    title: '',
    text: '',
    price: '',
    rating: '',
    color: '',
    shadow: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWatchData({
      ...watchData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://testing-server-vercel.vercel.app/api/watches', watchData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Watch added successfully!');
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Error adding watch. Please try again.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
      console.error(error);
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
                Add New Watch
              </h3>
            </div>
            <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit}>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={watchData.title}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="text"
                placeholder="Description"
                value={watchData.text}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={watchData.price}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={watchData.rating}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={watchData.color}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="text"
                name="shadow"
                placeholder="Shadow"
                value={watchData.shadow}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Add Watch
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchForm;
