import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateWatchForm from '../../pages/Form/UpdateWatchForm';

const WatchTable = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get('https://api.bestofficiel.com/api/watches');
        setWatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching watches:', error);
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  const handleEditClick = (watch) => {
    setSelectedWatch(watch);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedWatch(null);
  };

  const handleWatchUpdate = (updatedWatch) => {
    setWatches((prevWatches) =>
      prevWatches.map((watch) =>
        watch._id === updatedWatch._id ? updatedWatch : watch
      )
    );
    setShowForm(false);
    setSelectedWatch(null);
  };

  const handleDelete = async (watchId) => {
    try {
      await axios.delete(`https://api.bestofficiel.com/api/watches/${watchId}`);
      setWatches(watches.filter(watch => watch._id !== watchId));
    } catch (error) {
      console.error('Failed to delete watch:', error);
    }
  };

  const renderWatchCard = (watch) => {
    const discountedPrice = watch.solde ? watch.price - (watch.price * watch.solde / 100) : watch.price;

    return (
      <div key={watch._id} className="bg-white rounded-lg shadow-md dark:bg-black dark:border-gray-800 border border-gray-200">
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{watch.title}</h3>
          <p className="text-gray-700 dark:text-gray-400">Color: {watch.color}</p>
          <p className="text-gray-700 dark:text-gray-400">Shadow: {watch.shadow}</p>
          <p className="text-gray-900 dark:text-white">
            Price: {watch.solde ? (
              <>
                <span className="line-through text-red-500">${watch.price.toFixed(2)}</span>
                <span className="ml-2 font-bold">${discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              `$${watch.price.toFixed(2)}`
            )}
          </p>
          {watch.solde && (
            <p className="text-gray-900 dark:text-white">Discount: {watch.solde}%</p>
          )}
          <p className="text-gray-900 dark:text-white">Rating: {watch.rating}</p>
          <img src={`https://api.bestofficiel.com${watch.img}`} alt={watch.title} className="w-32 h-32 object-cover" />

          <button
            onClick={() => handleEditClick(watch)}
            className="mt-2 mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(watch._id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="col-span-12 mt-8 overflow-auto lg:overflow-visible">
        <div className="p-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-1">
          {watches.map(renderWatchCard)}
        </div>
      </div>
      {showForm && selectedWatch && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <UpdateWatchForm watch={selectedWatch} onClose={handleFormClose} onUpdate={handleWatchUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchTable;
