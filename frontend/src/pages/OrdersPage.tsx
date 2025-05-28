import React from 'react';
import { Download } from 'lucide-react';

const OrdersPage = () => {
    const orders = [
        {
            id: '1',
            date: '2024-01-15',
            total: 1200000,
            status: 'Hoàn thành',
            games: [
                {
                    id: '1',
                    title: 'Cyberpunk 2077',
                    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
                    size: '65.2 GB',
                    downloadUrl: '#'
                }
            ]
        },
        {
            id: '2',
            date: '2024-02-01',
            total: 800000,
            status: 'Đang xử lý',
            games: [
                {
                    id: '4',
                    title: 'Grand Theft Auto V',
                    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
                    size: '72.8 GB',
                    downloadUrl: '#'
                }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {orders.map(order => (
                    <div key={order.id} className="bg-[#202020] rounded-lg overflow-hidden">
                <div className="p-6 border-b border-[#303030]">
                <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white">Đơn hàng #{order.id}</h3>
    <p className="text-gray-400">{new Date(order.date).toLocaleDateString('vi-VN')}</p>
        </div>
        <div className="text-right">
    <p className="text-white font-semibold">{order.total.toLocaleString('vi-VN')}₫</p>
    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
        order.status === 'Hoàn thành'
            ? 'bg-green-500/20 text-green-500'
            : 'bg-yellow-500/20 text-yellow-500'
    }`}>
    {order.status}
    </span>
    </div>
    </div>
    </div>

    {order.games.map(game => (
        <div key={game.id} className="p-6 flex items-center justify-between hover:bg-[#303030] transition-colors">
    <div className="flex items-center space-x-4">
    <img
        src={game.image}
        alt={game.title}
        className="w-16 h-16 object-cover rounded"
        />
        <div>
            <h4 className="text-white font-medium">{game.title}</h4>
            <p className="text-gray-400 text-sm">Dung lượng: {game.size}</p>
    </div>
    </div>
        {order.status === 'Hoàn thành' && (
            <a
                href={game.downloadUrl}
            className="flex items-center space-x-2 bg-[#0078F2] text-white px-4 py-2 rounded-lg hover:bg-[#0060c7] transition-colors"
            >
            <Download size={20} />
        <span>Tải xuống</span>
        </a>
        )}
        </div>
    ))}
    </div>
))}
    </div>
);
};

export default OrdersPage;