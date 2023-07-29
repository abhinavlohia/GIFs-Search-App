import React from 'react';

const GiphyBlock = ({ url }) => {
    return (
        <div className="giphy-block">
            <img src={url} alt="GIF" />
        </div>
    );
};

export default GiphyBlock;

