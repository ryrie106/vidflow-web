import React, {Component} from 'react';

import Post from '../components/Home/Post';
import { getPostById } from '../utils/APIUtils';


/**
 * Component PostInfo ( App -> PostInfo )
 */
class PostInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.postId);
        getPostById(this.props.match.params.postId).then(response => {
            this.setState({
                post: response
            })
        });
    }

    render() {
        return (
            <div id="postinfo">
                {this.state.post?
                <Post
                    post={this.state.post}
                    currentUser={this.props.currentUser}/>:null}
            </div>
        );
    }
}

export default PostInfo;