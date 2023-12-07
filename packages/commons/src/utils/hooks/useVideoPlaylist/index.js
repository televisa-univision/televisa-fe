import { useState, useEffect } from 'react';
import { fetchPlaylistApi } from '../../api/fetchApi';

const DEFAULT_LIMIT = 10;

/**
 * Fetches playlist from web-api
 * @param {string} contentId current video id
 * @param {Object} page  current page data
 * @param {number} limit number of videos to fetch
 * @returns {Object}
 */
function useVideoPlaylist(contentId, page, limit) {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    /**
     * Async fetch to playlsit API
     */
    const getVideos = async () => {
      // Fetch videos from API
      const currentLimit = limit || DEFAULT_LIMIT;
      const offset = page * currentLimit;
      try {
        const response = await fetchPlaylistApi(contentId, offset, currentLimit);
        setVideos(response);
        setLoading(false);
      } catch (e) {
        setVideos([]);
        setLoading(false);
      }
    };

    if (contentId && page) {
      setLoading(true);
      getVideos();
    }
  }, [contentId, page, limit]);

  return { loading, videos };
}

export default useVideoPlaylist;
