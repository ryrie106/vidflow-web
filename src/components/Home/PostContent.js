import React from 'react';
import { TextareaItem } from 'antd-mobile';
import './PostContent.css';

const PostContent = ({writer, content}) => {
    return (
        <div className="post-content">
            <div className="writer">
                @{writer}
            </div>
            <TextareaItem
                className="content"
                value={content}
                rows={4}
                editable={false}
            />
        </div>
    );
};

export default PostContent;