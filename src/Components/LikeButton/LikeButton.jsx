import React, { Component } from 'react'
import './LikeButton.css'

export class LikeButton extends Component {

    render() {

        return (
            <button className="gostei">
                <img className="svgGostei" alt="" src={this.props.src} />
                {this.props.message}
            </button>
        );
    }
}