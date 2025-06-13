import React from 'react';

const HotGamesHeader = ({ activeTab, setActiveTab, onSearch, tabList }) => (
  <div className="flex items-center gap-8 px-6 py-4 bg-[#181818] rounded-t-2xl">
    <input
      type="text"
      placeholder="Search store"
      className="bg-[#232323] text-white px-4 py-2 rounded-full w-64 outline-none"
      onChange={e => onSearch(e.target.value)}
    />
    <nav className="flex gap-6 ml-8">
      {tabList.map(tab => (
        <button
          key={tab}
          className={`text-lg font-semibold transition ${
            activeTab === tab ? 'text-white border-b-2 border-[#00b4ff]' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  </div>
);

export default HotGamesHeader;