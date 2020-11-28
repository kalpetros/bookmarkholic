import { useEffect, useRef } from 'react';

export const getBookmarkIds = (ids, data) => {
  // Get all root level bookmark ids
  data.forEach((d) => {
    if (
      [0, 1, 2].some((s) => parseInt(s) === parseInt(d.parentId)) &&
      ![0, 1, 2].some((s) => parseInt(s) === parseInt(d.id))
    ) {
      ids.push(d.id);
    }

    if (Object.keys(d).includes('children')) {
      return getBookmarkIds(ids, d.children);
    }
  });

  return ids;
};

export const getFolderIds = (ids, data) => {
  // Get all root level bookmark ids
  data.forEach((d) => {
    if (
      [0, 1, 2].some((s) => parseInt(s) === parseInt(d.parentId)) &&
      ![0, 1, 2].some((s) => parseInt(s) === parseInt(d.id)) &&
      !Object.keys(d).includes('url')
    ) {
      ids.push(d.id);
    }

    if (Object.keys(d).includes('children')) {
      return getFolderIds(ids, d.children);
    }
  });

  return ids;
};

export const getFolders = (results, data) => {
  if (data.length === 0) {
    return results;
  }

  data.forEach((d) => {
    if (
      ![0, 1, 2].some((s) => parseInt(s) === parseInt(d.id)) &&
      !Object.keys(d).includes('url')
    ) {
      results.push(d);
    }

    if (Object.keys(d).includes('children')) {
      return getFolders(results, d.children);
    }
  });

  return results;
};

export const getBookmarks = (results, data) => {
  if (data.length === 0) {
    return results;
  }

  data.forEach((d) => {
    if (
      ![0, 1, 2].some((s) => parseInt(s) === parseInt(d.id)) &&
      Object.keys(d).includes('url')
    ) {
      results.push(d);
    }

    if (Object.keys(d).includes('children')) {
      return getBookmarks(results, d.children);
    }
  });

  return results;
};
export const findDuplicates = (data) => {
  let duplicates = [];
  // Sort data
  const sortedData = data.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  for (let i = 0; i < sortedData.length - 1; i++) {
    if (sortedData[i].title === sortedData[i + 1].title) {
      duplicates.push(sortedData[i]);
    }
  }

  return duplicates;
};

export const findBroken = (data) => {
  return [];
};

export const useDidMount = (fn, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      fn();
    } else {
      didMount.current = true;
    }
  }, deps);
};
