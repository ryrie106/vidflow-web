import React, { Component } from 'react';

class RequireLogin extends Component {
    render() {
        return (
            <div>
                {...this.props}
            </div>
        );
    }
}

export default RequireLogin;