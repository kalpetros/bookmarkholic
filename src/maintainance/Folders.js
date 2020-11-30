import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFolderIds, getFolders } from '../utils';
import { StoreContext } from '../store';

export const Folders = () => {
  const { loading, data, getData } = useContext(StoreContext);
  const [active, setActive] = useState(false);
  const [folders, setFolders] = useState([]);
  let content = null;

  useEffect(() => {
    setTimeout(() => {
      const folders = getFolders([], data);
      setFolders(folders);
    }, 1000);
  }, [data]);

  const deleteFolders = () => {
    chrome.bookmarks.getTree((response) => {
      const folders = getFolderIds([], response);
      folders.forEach((folder, index) => {
        chrome.bookmarks.removeTree(folder, () => {});

        if (index === folders.length - 1) {
          getData();
          setActive(false);
        }
      });
    });
  };

  const moveBookmarks = () => {
    folders.forEach((folder, index) => {
      chrome.bookmarks.getSubTree(folder.id, (response) => {
        response.forEach((r) => {
          r.children.forEach((item) => {
            if (Object.keys(item).includes('url')) {
              chrome.bookmarks.move(item.id, { parentId: '1' }, () => {});
            }
          });
        });
      });

      if (index === folders.length - 1) {
        deleteFolders();
      }
    });
  };

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      moveBookmarks();
    }, 1000);
  };

  const button =
    folders.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-teal-400 to-red-500 focus:from-pink-500 focus:to-red-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Delete {folders.length} folders
      </button>
    ) : (
      <p className="font-semibold">0 folders</p>
    );

  if (loading) {
    content = (
      <div className="mt-4">
        <FontAwesomeIcon icon="spinner" size="lg" spin />
      </div>
    );
  } else {
    if (active) {
      content = (
        <>
          <div className="mt-4">Deleting {folders.length} folders</div>
          <div className="mt-4">
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
        <p className="text-xl">Delete Folders</p>
        {content}
      </div>
    </div>
  );
};
