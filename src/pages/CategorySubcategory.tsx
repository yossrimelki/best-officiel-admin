import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategorySubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editData, setEditData] = useState({ name: '', description: '', image: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditData({
      name: category.name,
      description: category.description,
      image: null
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditData({
        ...editData,
        image: files[0] // Store the selected file
      });
    } else {
      setEditData({
        ...editData,
        [name]: value
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('description', editData.description);
    if (editData.image) {
      formData.append('image', editData.image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/categories/${selectedCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Category updated successfully!');
      setCategories(categories.map(cat => cat._id === response.data._id ? response.data : cat));
      setSelectedCategory(null);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Error updating category. Please try again.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
      console.error(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${categoryId}`);
      setCategories(categories.filter(cat => cat._id !== categoryId));
      setSuccess('Category deleted successfully!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Error deleting category. Please try again.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories and Subcategories</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <div key={category._id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p>{category.description}</p>
              <h4 className="mt-2 text-lg font-medium">Subcategories:</h4>
              {category.subCategories && category.subCategories.length > 0 ? (
                <ul className="list-disc list-inside">
                  {category.subCategories.map((subcategory) => (
                    <li key={subcategory._id}>{subcategory.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No subcategories available.</p>
              )}
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEditClick(category)}
                  className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-4 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="inline-flex items-center justify-center rounded-md border border-red-500 bg-red-500 py-2 px-4 text-center text-base font-medium text-white hover:bg-red-600 lg:px-5 xl:px-5"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedCategory && (
        <div className="mt-6 p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Edit Category</h3>
          </div>
          <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleEditSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editData.name}
              onChange={handleEditChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editData.description}
              onChange={handleEditChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              type="file"
              name="image"
              onChange={handleEditChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-4 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
            >
              Update Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategorySubcategory;
