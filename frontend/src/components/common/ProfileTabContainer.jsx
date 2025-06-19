import React from 'react';

const ProfileTabContainer = ({ title, children }) => (
  <div>
    {title && (
      <h2 className="text-2xl font-bold mb-6 text-[#00b4ff]">{title}</h2>
    )}
    {children}
  </div>
);

export default ProfileTabContainer; 