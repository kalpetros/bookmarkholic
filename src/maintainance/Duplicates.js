import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBookmarks, findDuplicates, useDidMount } from '../utils';

export const Duplicates = () => {
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
      const duplicates = findDuplicates(bookmarks);
      setBookmarks(duplicates);
    });
  };

  const handleClick = () => {
    setStatus('deleting');
    setTimeout(() => {
      bookmarks.forEach((bookmark, index) => {
        chrome.bookmarks.remove(bookmark.id);
        if (index === bookmarks.length - 1) {
          getData();
        }
      });
    }, 1000);
  };

  const button =
    bookmarks.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-teal-400 to-blue-500 focus:from-pink-500 focus:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Remove {bookmarks.length} duplicates
      </button>
    ) : (
      <p className="font-semibold">0 duplicates</p>
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
          Deleting {bookmarks.length} duplicate bookmarks
        </div>
        <div className="mt-4">
          <FontAwesomeIcon icon="spinner" size="lg" spin />
        </div>
      </>
    ) : null;

  return (
    <div className="bg-white p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl">Duplicates</p>
        {content}
      </div>
    </div>
  );
};
