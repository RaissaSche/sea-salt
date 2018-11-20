import React, { Component } from 'react'
import './Button.css'

export class MyButton extends Component {

    checagemCampoPreenchido() {

        if (this.state.url && this.state.name) {
            return false
        }
        return true
    }

    render() {

        return (
            <button className="carregarMais buttonCarregarMais" onClick={this.props.function}>
                {this.props.message}
            </button>
        );
    }
}