import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBookmarkIds, getBookmarks, useDidMount } from '../utils';

export const Delete = () => {
  const [status, setStatus] = useState('loading');
  const [bookmarks, setBookmarks] = useState([]);

  useDidMount(() => {
    setStatus('loaded');
  }, [bookmarks]);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  const getData = () => {
    chrome.bookmarks.getTree((response) => {
      const bookmarks = getBookmarks([], response);
      setBookmarks(bookmarks);
    });
  };

  const handleClick = () => {
    setStatus('deleting');
    setTimeout(() => {
      // Recursively remove folders and their contents
      chrome.bookmarks.getTree((response) => {
        const ids = getBookmarkIds([], response);
        ids.forEach((id, index) => {
          chrome.bookmarks.removeTree(id, () => {});
          if (index === ids.length - 1) {
            getData();
          }
        });
      });
    }, 1000);
  };

  const button =
    bookmarks.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-teal-400 to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Delete {bookmarks.length} bookmarks
      </button>
    ) : (
      <p className="font-semibold">0 bookmarks</p>
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
        <div className="mt-4">Deleting {bookmarks.length} bookmarks</div>
        <div className="mt-4">
          <FontAwesomeIcon icon="spinner" size="lg" spin />
        </div>
      </>
    ) : null;

  return (
    <div className="bg-dark-light p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl">Delete all</p>
        {content}
      </div>
    </div>
  );
};
