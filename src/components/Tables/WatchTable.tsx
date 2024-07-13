import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WatchTable = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWatches = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/watches');
        setWatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch watches:', error);
        setLoading(false);
      }
    };

    getWatches();
  }, []);

  const handleDelete = async (watchId) => {
    try {
      await axios.delete(`http://localhost:3000/api/watches/${watchId}`);
      setWatches(watches.filter(watch => watch._id !== watchId));
    } catch (error) {
      console.error('Failed to delete watch:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Watches
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Watch Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rating</p>
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

      {watches.map((watch, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={`http://localhost:3000/${watch.img}`} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {watch.title}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${watch.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {watch.rating}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {watch.color}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {watch.shadow}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleDelete(watch._id)}
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

export default WatchTable;
