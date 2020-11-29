import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBookmarkIds, getBookmarks, useDidMount } from '../utils';

export const Sort = () => {
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
    setStatus('sorting');
    setTimeout(() => {
      let groups = {};

      bookmarks.forEach((bookmark, index) => {
        if (groups.hasOwnProperty(bookmark.parentId)) {
          const group = groups[bookmark.parentId];
          group.push(bookmark);
        } else {
          groups[bookmark.parentId] = [bookmark];
        }

        chrome.bookmarks.remove(bookmark.id, () => {});
      });

      Object.keys(groups).forEach((group, index) => {
        const sortedGroup = groups[group].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }

          if (a.title > b.title) {
            return 1;
          }

          return 0;
        });

        sortedGroup.forEach((sg) => {
          chrome.bookmarks.create({
            parentId: group,
            title: sg.title,
            url: sg.url,
          });
        });

        if (index === Object.keys(groups).length - 1) {
          setStatus('loaded');
        }
      });
    }, 1000);
  };

  const button =
    bookmarks.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-teal-400 to-blue-500 focus:from-pink-500 focus:to-red-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Start
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
    ) : status === 'sorting' ? (
      <>
        <div className="mt-4">Sorting {bookmarks.length} bookmarks</div>
        <div className="mt-4">
          <FontAwesomeIcon icon="spinner" size="lg" spin />
        </div>
      </>
    ) : null;

  return (
    <div className="bg-dark-light p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl">Sort</p>
        {content}
      </div>
    </div>
  );
};
