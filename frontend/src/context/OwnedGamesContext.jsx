import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLibrary } from '../api/orderApi';
import { useCustomers } from '../hooks/useCustomers';

const OwnedGamesContext = createContext([]);

export const OwnedGamesProvider = ({ children }) => {
  const { customer } = useCustomers();
  const [ownedGameIds, setOwnedGameIds] = useState([]);

  useEffect(() => {
    if (customer?.id) {
      getLibrary(customer.id).then(games => {
        setOwnedGameIds(games.map(game => game.productResponseDTO.id));
      });
    } else {
      setOwnedGameIds([]);
    }
  }, [customer]);

  return (
    <OwnedGamesContext.Provider value={ownedGameIds}>
      {children}
    </OwnedGamesContext.Provider>
  );
};

export const useOwnedGames = () => useContext(OwnedGamesContext);