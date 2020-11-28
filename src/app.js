import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBookmark,
  faHistory,
  faList,
  faDownload,
  faCog,
  faTimes,
  faFolder,
  faCheck,
  faExclamationTriangle,
  faSearch,
  faChevronLeft,
  faInfoCircle,
  faSpinner,
  faPause,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import { Maintanance } from './maintainance/main';

library.add(
  faBookmark,
  faHistory,
  faList,
  faDownload,
  faCog,
  faTimes,
  faFolder,
  faCheck,
  faExclamationTriangle,
  faSearch,
  faChevronLeft,
  faInfoCircle,
  faSpinner,
  faPause,
  faTh
);

const App = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('grid');

  useEffect(() => {
    chrome.bookmarks.getTree((response) => {
      setData(response);
    });
  }, []);

  const handleClick = (event) => {
    const id = event.currentTarget.id;
    chrome.bookmarks.getSubTree(id, (response) => {
      setData(response);
    });
  };

  const handleBackClick = () => {
    const parentId = data[0].parentId;
    chrome.bookmarks.getSubTree(parentId, (response) => {
      setData(response);
    });
  };

  const handleMaintainance = () => {
    ReactDOM.render(
      <Maintanance />,
      document.getElementById('modal-container')
    );
  };

  const items = data.map((node) => {
    return node.children.map((child, index) => {
      const dateAdded = new Date(child.dateAdded).toDateString();
      const className =
        view === 'list'
          ? 'bg-dark-light mb-4 p-4  border rounded-xl cursor-pointer block'
          : 'bg-dark-light h-auto p-4 border rounded-xl cursor-pointer';

      if (typeof child.url !== 'undefined') {
        return (
          <a
            key={`bookmark-${child.id}-${index}`}
            className={className}
            href={child.url}
            target="__blank"
          >
            <div className="mb-4">
              <img
                src={`https://plus.google.com/_/favicon?domain_url=${child.url}`}
              />
            </div>
            <div className="text-white text-base mb-4">{child.title}</div>
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
            <FontAwesomeIcon
              icon="folder"
              size="lg"
              className="mr-5 cursor-pointer"
            />
          </div>
          <div className="text-white text-base mb-4">{child.title}</div>
          <div className="text-gray-500 text-xs">{dateAdded}</div>
        </div>
      );
    });
  });

  const className =
    view === 'list' ? 'container mx-auto' : 'grid grid-cols-4 gap-8 p-8';

  return (
    <div>
      <div className="bg-dark text-gray-400 sticky top-0 p-8 grid grid-cols-2">
        <div className="grid grid-flow-col auto-cols-min gap-8">
          <div>
            <FontAwesomeIcon
              icon="chevron-left"
              size="lg"
              className="cursor-pointer"
              onClick={handleBackClick}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon="search"
              size="lg"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="grid grid-flow-col auto-cols-min gap-8 justify-end">
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
              <FontAwesomeIcon
                icon="list"
                size="lg"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              icon="cog"
              size="lg"
              className="cursor-pointer"
              onClick={handleMaintainance}
            />
          </div>
        </div>
      </div>
      <div className={className}>{items}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
