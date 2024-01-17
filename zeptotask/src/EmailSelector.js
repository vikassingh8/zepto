import React, { useState, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import profiles from './Data';

const EmailSelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const [isAlreadySelectedVisible, setIsAlreadySelectedVisible] = useState(false);

  const handleEmailSelect = (profile) => {
    const isAlreadySelected = selectedEmails.some((selected) => selected.id === profile.id);

    if (!isAlreadySelected) {
      setSelectedEmails((prevSelectedEmails) => [...prevSelectedEmails, profile]);
      setSearchTerm('');
      setSelectedItemIndex(-1);
    } else {
      setIsAlreadySelectedVisible(true);
      setTimeout(() => setIsAlreadySelectedVisible(false), 1500);
    }
  };

  const handleEmailRemove = (index) => {
    setSelectedEmails((prevSelectedEmails) => {
      const newEmails = [...prevSelectedEmails];
      newEmails.splice(index, 1);
      return newEmails;
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedItemIndex((prevIndex) => Math.min(prevIndex + 1, filteredProfiles.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        break;
      case 'Enter':
        if (selectedItemIndex !== -1) {
          handleEmailSelect(filteredProfiles[selectedItemIndex]);
        }
        break;
      default:
        break;
    }

    if (selectedItemIndex !== -1 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.querySelector(`#profile-${selectedItemIndex}`);
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container w-full h-screen border border-black bg-slate-50'>
      <h1 style={{ color: "blue" }} className='text-center font-semibold text-2xl p-4'>Pick Users</h1>
      {isAlreadySelectedVisible && <h1 className='text-center text-sm text-red-500'>User Already Selected!</h1>}
      <div className='flex justify-center'>
        <div style={{ borderBottom: "2px solid blue" }} className="flex flex-wrap w-[95%] lg:w-[40%] md:w-[40%] relative space-x-2">
          {selectedEmails.map((selected, index) => (
            <div key={index} className="flex items-center space-x-2 rounded-full bg-gray-200 p-1 m-1">
              <img src={selected.image} alt="Profile" className="w-6 h-6 rounded-full" />
              <span>{selected.name}</span>
              <HiX className="text-red-500 cursor-pointer" onClick={() => handleEmailRemove(index)} />
            </div>
          ))}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add new user..."
              className="border-none outline-none bg-slate-50 p-2 w-full"
            />
            {searchTerm && (
              <div
                ref={dropdownRef}
                className="absolute max-h-56 overflow-y-auto max-w-fit overflow-x-hidden right-0 top-full bg-white border rounded-md shadow-md"
              >
                {filteredProfiles.map((profile, index) => (
                  <div
                    id={`profile-${index}`}
                    key={profile.id}
                    onClick={() => handleEmailSelect(profile)}
                    className={`cursor-pointer p-2 hover:bg-gray-200 flex items-center ${index === selectedItemIndex ? 'bg-gray-200' : ''
                      }`}
                    onMouseEnter={() => setSelectedItemIndex(index)}
                  >
                    <img src={profile.image} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                    <h1>{profile.name}</h1>
                    <h1 className='mx-3 text-xs text-gray-500'>{`<${profile.email}>`}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSelector;
