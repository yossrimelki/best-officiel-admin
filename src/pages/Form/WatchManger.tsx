import React, { useState, useEffect } from 'react';
import WatchForm from './WatchForm';
import UpdateWatchForm from './UpdateWatchForm';
import axios from 'axios';

const WatchManager = () => {
  const [watches, setWatches] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/watches');
        setWatches(response.data);
      } catch (error) {
        console.error('Error fetching watches:', error);
      }
    };

    fetchWatches();
  }, []);

  const handleEditClick = (watch) => {
    setSelectedWatch(watch);
    setIsUpdateMode(true);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setIsUpdateMode(false);
    setSelectedWatch(null);
  };

  const handleClose = () => {
    setSelectedWatch(null);
    setIsUpdateMode(false);
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Watch Manager</h1>
      <button
        onClick={handleAddClick}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add New Watch
      </button>
      <div>
        {watches.map(watch => (
          <div key={watch._id} className="flex justify-between items-center mb-2">
            <div>{watch.title}</div>
            <button
              onClick={() => handleEditClick(watch)}
              className="bg-blue-500 text-white py-1 px-3 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {showAddForm && <WatchForm onClose={handleClose} />}
      {isUpdateMode && <UpdateWatchForm watch={selectedWatch} onClose={handleClose} />}
    </div>
  );
};

export default WatchManager;
