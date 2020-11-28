import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBookmarks, findBroken, useDidMount } from '../utils';

export const Health = () => {
  const [status, setStatus] = useState('loading');
  const [broken, setBroken] = useState([]);

  useDidMount(() => {
    setStatus('loaded');
  }, [broken]);

  useEffect(() => {
    setTimeout(() => {
      getBroken();
    }, 1000);
  }, []);

  const getBroken = () => {
    chrome.bookmarks.getTree((response) => {
      const bookmarks = getBookmarks([], response);
      const broken = findBroken(bookmarks);
      setBroken(broken);
    });
  };

  const handleClick = () => {
    setStatus('deleting');
    setTimeout(() => {
      broken.forEach((bookmark, index) => {
        chrome.bookmarks.remove(bookmark.id);
        if (index === broken.length - 1) {
          getBroken();
        }
      });
    }, 1000);
  };

  const button =
    broken.length > 0 ? (
      <button
        type="button"
        class="bg-gradient-to-r from-teal-400 to-blue-500 focus:from-pink-500 focus:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Remove {broken.length} broken bookmarks
      </button>
    ) : (
      <p className="font-semibold">0 broken bookmarks</p>
    );

  const content =
    status === 'loading' ? (
      <div className="mt-4">
        <FontAwesomeIcon icon="spinner" size="lg" spin />
      </div>
    ) : status === 'loaded' ? (
      <div className="mt-4">{button}</div>
    ) : status === 'deleting' ? (
      <>
        <div className="mt-4">
          Deleting {broken.length} broken bookmarks
        </div>
        <div className="mt-4">
          <FontAwesomeIcon icon="spinner" size="lg" spin />
        </div>
      </>
    ) : null;

  return (
    <div className="bg-white p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl">Broken</p>
        {content}
      </div>
    </div>
  );
};
