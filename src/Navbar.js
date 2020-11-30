import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from './store';

export const Navbar = (props) => {
  const view = 'grid';
  const { onTriggerPanel } = props;
  const { data, handleSearch, handleBackClick } = useContext(StoreContext);

  let backButton = null;
  if (data.length > 0) {
    if (data[0].id > 0) {
      backButton = (
        <div>
          <FontAwesomeIcon
            icon="chevron-left"
            size="lg"
            className="cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
      );
    }
  }

  return (
    <div className="bg-dark text-gray-200 sticky top-0 p-8 grid grid-cols-2">
      <div className="grid grid-flow-col auto-cols-min gap-8 items-center">
        {backButton}
        <div>
          <input
            className="bg-dark-light text-gray-200 placeholder-gray-400 appearance-none border border-transparent w-56 py-2 px-4 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Search bookmarks..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-min gap-8 items-center justify-end">
        <div>
          <div onClick={() => setView('grid')}>
            <FontAwesomeIcon
              icon="folder"
              size="lg"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div>
          <div onClick={() => setView('list')}>
            <FontAwesomeIcon icon="list" size="lg" className="cursor-pointer" />
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            icon="cog"
            size="lg"
            className="cursor-pointer"
            onClick={onTriggerPanel}
          />
        </div>
      </div>
    </div>
  );
};
