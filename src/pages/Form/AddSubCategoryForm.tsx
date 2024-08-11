import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubCategoryForm = () => {
  const [subCategoryData, setSubCategoryData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData({
      ...subCategoryData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://api.bestofficiel.com/api/subcategories', subCategoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Sub-category added successfully!');
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Error adding sub-category. Please try again.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add New Sub-Category</h3>
      </div>
      <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={subCategoryData.title}
          onChange={handleChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={subCategoryData.description}
          onChange={handleChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <select
          name="category"
          value={subCategoryData.category}
          onChange={handleChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-4 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
        >
          Add Sub-Category
        </button>
      </form>
    </div>
  );
};

export default AddSubCategoryForm;
