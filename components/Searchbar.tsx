import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import localities from '../data/localities.json'; // Ensure this path is correct

interface Locality {
  cityName: string;
  localityName: string;
  localityId: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Locality[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 0) {
      // Filter suggestions based on the locality name
      const filteredSuggestions = localities.filter(locality =>
        locality.localityName.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(filteredSuggestions.length > 0); // Show dropdown if there are suggestions
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [query]);

  const handleSelect = (localityId: string) => {
    router.push({
      pathname: '/weather',
      query: { localityId }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 w-100">
      <div className="mb-6">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="Google"
          className="w-100 h-24"
        />
      </div>
      <div className="relative w-full max-w-3xl">
        <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-md">
          <i className="fas fa-search text-gray-500 mx-3"></i>
          <input
            type="text"
            className="flex-1 px-4 py-2 text-lg border-none rounded-full outline-none placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a locality..."
          />
          <i className="fas fa-microphone text-blue-500 mx-3"></i>
        </div>
        {isDropdownOpen && (
          <ul className="absolute z-10 w-full mt-1 border border-gray-300 rounded-b-md bg-white shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelect(suggestion.localityId)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                <div className="font-semibold text-gray-800">{suggestion.localityName}</div>
                <div className="text-gray-600">{suggestion.cityName}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6 flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          <button className="px-6 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200">
            Google Search
          </button>
          <button className="px-6 py-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-300">
            I'm Feeling Lucky
          </button>
        </div>
        <div className="text-sm text-gray-600">
          <span>Google offered in: </span>
          <a href="#" className="text-blue-500 hover:underline">हिन्दी</a>
          <a href="#" className="text-blue-500 hover:underline ml-2">বাংলা</a>
          <a href="#" className="text-blue-500 hover:underline ml-2">తెలుగు</a>
          <a href="#" className="text-blue-500 hover:underline ml-2">मराठी</a>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
