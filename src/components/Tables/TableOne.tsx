import React, { useEffect, useState } from 'react';
import { fetchShoes, deleteShoe } from '../../services/shoesService';
import EditForm from './EditForm';

const TableOne = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingShoe, setEditingShoe] = useState(null);

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

  const handleEdit = (shoe) => {
    setEditingShoe(shoe);
  };

  const handleUpdate = (updatedShoe) => {
    setShoes(shoes.map(shoe => shoe._id === updatedShoe._id ? updatedShoe : shoe));
  };

  const closeEditForm = () => {
    setEditingShoe(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="col-span-12 mt-8 overflow-auto lg:overflow-visible">
        <div className="p-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-1">
          {shoes.map((shoe) => {
            // Calculate the new price based on the discount
            const discountedPrice = shoe.solde ? shoe.price - (shoe.price * shoe.solde / 100) : shoe.price;

            return (
              <div key={shoe._id} className="bg-white rounded-lg shadow-md dark:bg-black dark:border-gray-800 border border-gray-200">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{shoe.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400">{shoe.text}</p>
                  <p className="text-gray-900 dark:text-white">
                    Price: {shoe.solde ? (
                      <>
                        <span className="line-through text-red-500">${shoe.price.toFixed(2)}</span>
                        <span className="ml-2 font-bold">${discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      `$${shoe.price.toFixed(2)}`
                    )}
                  </p>
                  {shoe.solde && (
                    <p className="text-gray-900 dark:text-white">Discount: {shoe.solde}%</p>
                  )}
                  <p className="text-gray-900 dark:text-white">Rating: {shoe.rating}</p>
                  <p className="text-gray-900 dark:text-white">Sizes: {shoe.sizes.join(', ')}</p>
                  <p className="text-gray-900 dark:text-white">Color: {shoe.color}</p>
                  <p className="text-gray-900 dark:text-white">Shadow: {shoe.shadow}</p>
                  <img src={`http://localhost:3000${shoe.img}`} alt={shoe.title} className="w-full h-auto mt-2" />
                  <button
                    onClick={() => handleEdit(shoe)}
                    className="mt-2 mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shoe._id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {editingShoe && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <EditForm shoe={editingShoe} onClose={closeEditForm} onUpdate={handleUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOne;
