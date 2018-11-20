import React, { Component, Fragment } from 'react'
import { Input } from '../Input/Input'
import './QABox.css'

export class QABox extends Component {

    render() {

        return (
            <Fragment>
                <p className="question"> {this.props.question} </p>
                <Input className="answer" placeholder={this.props.placeholder} onChange={this.props.onChange}
                    inputType={this.props.inputType} name={this.props.name} value={this.props.value} />
                <img className="imageQA" src={this.props.stateUrl} alt="" />
            </Fragment>
        )
    }
}