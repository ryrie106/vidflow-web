import React from 'react';
import './Description.css';

const Description = ({writer, content}) => {
    return (
        <div className="discription-wrapper">
            <div>
                @{writer}
            </div>
            <div>
                {content}
            </div>
        </div>
    );
};

export default Description;