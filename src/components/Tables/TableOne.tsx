import React, { useEffect, useState } from 'react';
import { fetchShoes, deleteShoe } from '../../services/shoesService';

const TableOne = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShoes = async () => {
      try {
        const shoesData = await fetchShoes();
        setShoes(shoesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch shoes:', error);
        setLoading(false);
      }
    };

    getShoes();
  }, []);

  const handleDelete = async (shoeId) => {
    try {
      await deleteShoe(shoeId);
      setShoes(shoes.filter(shoe => shoe._id !== shoeId));
    } catch (error) {
      console.error('Failed to delete shoe:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Shoes
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sizes</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Color</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Shadow</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {shoes.map((shoe, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={`http://localhost:3000/${shoe.img}`} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {shoe.title}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${shoe.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {shoe.sizes.join(', ')}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {shoe.color}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {shoe.shadow}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleDelete(shoe._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableOne;
