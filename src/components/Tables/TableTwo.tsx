  // TableTwo.js

  import React, { useEffect, useState } from 'react';
  import { getCommandes, getShoeById, getWatchById } from '../../services/apiService';

  const TableTwo = () => {
    const [commandes, setCommandes] = useState([]);
    const [shoesDetails, setShoesDetails] = useState({});
    const [watchesDetails, setWatchesDetails] = useState({});

    useEffect(() => {
      const fetchCommandes = async () => {
        try {
          const data = await getCommandes();
          setCommandes(data);
        } catch (error) {
          console.error('Error fetching commandes:', error);
        }
      };

      fetchCommandes();
    }, []);

    useEffect(() => {
      const fetchProductDetails = async () => {
        const shoesIds = commandes.flatMap(commande =>
          commande.items.filter(item => item.productType === 'Shoes').map(item => item._id)
        );
        const watchesIds = commandes.flatMap(commande =>
          commande.items.filter(item => item.productType === 'Watch').map(item => item._id)
        );

        const shoesPromises = shoesIds.map(id => getShoeById(id));
        const watchesPromises = watchesIds.map(id => getWatchById(id));

        try {
          const shoesData = await Promise.all(shoesPromises);
          const watchesData = await Promise.all(watchesPromises);

          const shoesDetailsMap = {};
          shoesData.forEach(shoe => {
            shoesDetailsMap[shoe._id] = shoe;
          });
          setShoesDetails(shoesDetailsMap);

          const watchesDetailsMap = {};
          watchesData.forEach(watch => {
            watchesDetailsMap[watch._id] = watch;
          });
          setWatchesDetails(watchesDetailsMap);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      fetchProductDetails();
    }, [commandes]);

    const renderItemDetails = (item) => {
      let details = null;
    
      if (item.productType === 'Shoes' && item.productId && shoesDetails[item.productId._id]) {
        const shoe = shoesDetails[item.productId._id];
        details = (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sizes: {shoe.sizes.join(', ')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Color: {shoe.color}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Price: ${shoe.price}</p>
          </>
        );
      } else if (item.productType === 'Watch' && item.productId && watchesDetails[item.productId._id]) {
        const watch = watchesDetails[item.productId._id];
        details = (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">Rating: {watch.rating}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Color: {watch.color}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Price: ${watch.price}</p>
          </>
        );
      } else {
        details = (
          <p className="text-xs text-gray-500 dark:text-gray-400">Product details not available</p>
        );
      }
    
      return details;
    };
    

    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">Commandes</h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Phone</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Total Amount</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Order Date</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Items</p>
          </div>
        </div>

        {commandes.map((commande, key) => (
          <div
            key={key}
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">{commande.name}</p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{commande.phone}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">${commande.totalAmount}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{commande.status}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{new Date(commande.orderDate).toLocaleDateString()}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <ul>
                {commande.items.map((item, index) => (
                  <li key={index}>
                    <p>Product --------------</p>
                    <p className="text-sm text-black dark:text-white">{item.title}</p>
                    
                    
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default TableTwo;

