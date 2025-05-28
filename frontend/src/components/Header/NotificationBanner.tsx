import React from 'react';

interface NotificationBannerProps {
    message: string;
    image?: string;
    onClose: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, image, onClose }) => {
    return (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 bg-[#1a1a1a] text-white p-4 rounded shadow flex items-center gap-4 max-w-sm">
            {image && <img src={image} alt="Game" className="w-10 h-10 rounded object-cover" />}
            <span>{message}</span>
            <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white">&times;</button>
        </div>
    );
};

export default NotificationBanner;
