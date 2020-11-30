import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from './store';

export const Bookmarks = () => {
  const { data, handleClick } = useContext(StoreContext);
  const view = 'grid';

  let items = data.map((node) => {
    return node.children.map((child, index) => {
      const dateAdded = new Date(child.dateAdded).toDateString();
      const className =
        view === 'list'
          ? 'grid card bg-dark-light mb-4 p-4  border rounded-xl cursor-pointer block'
          : 'grid card bg-dark-light h-auto p-4 border rounded-xl cursor-pointer';

      if (typeof child.url !== 'undefined') {
        return (
          <a
            key={`bookmark-${child.id}-${index}`}
            className={className}
            href={child.url}
            target="__blank"
          >
            <div className="mb-4">
              <div className="bg-dark rounded-full h-8 w-8 flex items-center justify-center">
                <img
                  src={`https://plus.google.com/_/favicon?domain_url=${child.url}`}
                />
              </div>
            </div>
            <div className="text-white text-base mb-4 truncate">
              {child.title}
            </div>
            <div className="text-gray-500 text-xs">{dateAdded}</div>
          </a>
        );
      }

      return (
        <div
          key={`bookmark-${child.id}-${index}`}
          id={child.id}
          className={className}
          onClick={handleClick}
        >
          <div className="text-gray-200 mb-4">
            <div className="bg-dark rounded-full h-8 w-8 flex items-center justify-center">
              <FontAwesomeIcon icon="folder" size="lg" />
            </div>
          </div>
          <div className="text-white text-base mb-4 truncate">
            {child.title}
          </div>
          <div className="text-gray-500 text-xs">{dateAdded}</div>
        </div>
      );
    });
  });

  const className =
    view === 'list' ? 'container mx-auto' : 'grid grid-cols-4 gap-8 p-8';

  return <div className={className}>{items}</div>;
};
