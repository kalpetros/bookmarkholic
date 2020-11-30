import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBookmarkIds } from '../utils';
import { StoreContext } from '../store';

export const Delete = () => {
  const { loading, bookmarks, getData } = useContext(StoreContext);
  const [active, setActive] = useState(false);
  let content = null;

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      // Recursively remove folders and their contents
      chrome.bookmarks.getTree((response) => {
        const ids = getBookmarkIds([], response);
        ids.forEach((id, index) => {
          chrome.bookmarks.removeTree(id, () => {});

          if (index === ids.length - 1) {
            getData();
            setActive(false);
          }
        });
      });
    }, 1000);
  };

  const button =
    bookmarks.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-indigo-300 to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Delete {bookmarks.length} bookmarks
      </button>
    ) : (
      <p className="font-semibold text-gray-400">0 bookmarks</p>
    );

  if (loading) {
    content = (
      <div className="mt-4 text-gray-200">
        <FontAwesomeIcon icon="spinner" size="lg" spin />
      </div>
    );
  } else {
    if (active) {
      content = (
        <>
          <div className="mt-4 text-gray-400">Deleting {bookmarks.length} bookmarks</div>
          <div className="mt-4 text-gray-200">
            <FontAwesomeIcon icon="spinner" size="lg" spin />
          </div>
        </>
      );
    } else {
      content = <div className="mt-4">{button}</div>;
    }
  }

  return (
    <div className="bg-dark-light p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl text-gray-200">Delete all</p>
        {content}
      </div>
    </div>
  );
};
