import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findBroken } from '../utils';
import { StoreContext } from '../store';

export const Health = () => {
  const { loading, bookmarks } = useContext(StoreContext);
  const [active, setActive] = useState(false);
  const [broken, setBroken] = useState([]);
  let content = null;

  useEffect(() => {
    setTimeout(() => {
      const broken = findBroken(bookmarks);
      setBroken(broken);
    }, 1000);
  }, []);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      broken.forEach((bookmark, index) => {
        chrome.bookmarks.remove(bookmark.id);

        if (index === broken.length - 1) {
          setActive(false);
        }
      });
    }, 1000);
  };

  const button =
    broken.length > 0 ? (
      <button
        type="button"
        class="bg-gradient-to-r from-indigo-300 to-blue-500 focus:from-pink-500 focus:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Remove {broken.length} broken bookmarks
      </button>
    ) : (
      <p className="font-semibold text-gray-400">0 broken bookmarks</p>
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
          <div className="mt-4 text-gray-400">Deleting {broken.length} broken bookmarks</div>
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
        <p className="text-xl text-gray-200">Broken</p>
        {content}
      </div>
    </div>
  );
};
