import React, { Component, Fragment } from 'react'
import './Input.css'

export class Input extends Component {

    constructor() {

        super()
        this.state = {
            ehValido: true
        }
    }

    renderMensagemErro() {

        return <p className="mensagem"> Campo Obrigatório </p>
    }

    checagemOnBlur = (event) => {

        if (event.target.value) {
            this.setState({ ehValido: true })
        } else {
            this.setState({ ehValido: false })
        }

    }

    render() {

        return (
            <Fragment>
                <input className="answer" text="text" placeholder={this.props.placeholder}
                    onChange={this.props.onChange} onBlur={this.checagemOnBlur}
                    type={this.props.inputType} name={this.props.name} value={this.props.value} />
                {(!this.state.ehValido) ?
                    this.renderMensagemErro() : null
                }
            </Fragment>
        )
    }
}