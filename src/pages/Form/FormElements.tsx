import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';

const FormElements = () => {
  const [shoeData, setShoeData] = useState({
    title: '',
    text: '',
    img: null, // Change to file
    price: '',
    sizes: [],
    rating: '',
    color: '',
    shadow: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoeData({
      ...shoeData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setShoeData({
      ...shoeData,
      img: e.target.files[0]
    });
  };

  const handleSizesChange = (e) => {
    const sizes = e.target.value.split(',').map(size => parseFloat(size.trim()));
    setShoeData({
      ...shoeData,
      sizes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in shoeData) {
      formData.append(key, shoeData[key]);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/shoes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
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
                type="file"
                name="img"
                onChange={handleFileChange}
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
                value={shoeData.sizes.join(', ')}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
