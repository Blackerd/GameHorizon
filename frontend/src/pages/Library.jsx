import React, { useEffect, useState } from 'react';
import { getLibrary } from '../api/orderApi';

const Library = ({ customerId }) => {
  const [games, setGames] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    getLibrary(customerId).then(setGames);
  }, [customerId]);

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <>
      {games.length === 0 ? (
        <div className="text-gray-400">Bạn chưa mua game nào.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map(game => (
            <div
              key={game.id}
              className="bg-[#23283a] rounded-xl shadow-lg p-5 flex flex-col items-center border border-[#232323] hover:shadow-2xl transition"
            >
              <img
                src={game.productResponseDTO.img || '/default-game.jpg'}
                alt={game.productResponseDTO.name}
                className="w-32 h-32 object-cover rounded-lg mb-4 border border-[#181c24]"
              />
              <div className="font-semibold text-lg text-white mb-1 text-center">{game.productResponseDTO.name}</div>
              {/* <div className="text-gray-400 text-sm mb-2 text-center">{game.productResponseDTO.detail}</div> */}
              <div className="mb-2 text-sm text-[#00b4ff] font-mono">
                Key: {game.activationKey}
                <button
                  className="ml-2 px-2 py-1 bg-[#0078F2] text-white rounded hover:bg-[#005bb5] text-xs"
                  onClick={() => handleCopy(game.activationKey)}
                >
                  {copiedKey === game.activationKey ? 'Đã copy!' : 'Copy'}
                </button>
              </div>
              <div className="text-gray-300 text-xs mb-1">
                Giá: {game.productResponseDTO.price?.toLocaleString()} VND
              </div>
              <div className="text-gray-400 text-xs">
                Ngày mua: {game.orderDate ? new Date(game.orderDate).toLocaleDateString() : 'Không rõ'}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Library;