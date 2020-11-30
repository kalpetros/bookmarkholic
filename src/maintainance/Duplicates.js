import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findDuplicates } from '../utils';
import { StoreContext } from '../store';

export const Duplicates = () => {
  const { loading, bookmarks, getData } = useContext(StoreContext);
  const [active, setActive] = useState(false);
  const [duplicates, setDuplicates] = useState([]);
  let content = null;

  useEffect(() => {
    const duplicates = findDuplicates(bookmarks);
    setDuplicates(duplicates);
  }, [bookmarks]);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      duplicates.forEach((bookmark, index) => {
        chrome.bookmarks.remove(bookmark.id);

        if (index === duplicates.length - 1) {
          getData();
          setActive(false);
        }
      });
    }, 2000);
  };

  const button =
    duplicates.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-indigo-300 to-blue-500 focus:from-pink-500 focus:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Remove {duplicates.length} duplicates
      </button>
    ) : (
      <p className="font-semibold text-gray-400">0 duplicates</p>
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
          <div className="mt-4 text-gray-400">
            Deleting {duplicates.length} duplicate bookmarks
          </div>
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
    <div className="bg-dark-light p-4 border rounded-xl shadow-xl">
      <div className="text-center">
        <p className="text-xl text-gray-200">Duplicates</p>
        {content}
      </div>
    </div>
  );
};
