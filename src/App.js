import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import GiphyBlock from './GiphyBlock';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';

const GiphySearchApp = () => {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const handleSearch = (query) => {
    setQuery(query);
    setOffset(0);
    setGifs([]);
  };

  const fetchMoreGifs = async () => {
    try {
      const apiKey = '39wDC9GZ3EI4U5KhdvU5EFvGzVWBvpMz';
      const limit = 16; // 4 columns * 4 rows
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}`;
      const response = await axios.get(url);

      const gifData = response.data.data;
      const gifUrls = gifData.map((gif) => gif.images.fixed_height.url);
      setGifs((prevGifs) => [...prevGifs, ...gifUrls]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  useEffect(() => {
    if (query !== '') {
      fetchMoreGifs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const breakpointColumnsObj = {
    default: 4, // The number of columns you want at the default breakpoint
    1100: 3,   // Number of columns at the 1100px breakpoint
    700: 2,    // Number of columns at the 700px breakpoint
    500: 1     // Number of columns at the 500px breakpoint
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={gifs.length}
        next={fetchMoreGifs}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="giphy-grid"
          columnClassName="grid-card"
        >
          {gifs.map((url, index) => (
            <GiphyBlock key={index} url={url} />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default GiphySearchApp;
