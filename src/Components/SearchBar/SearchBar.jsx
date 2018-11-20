import React, { Component, Fragment } from 'react'
import lupa from '../../Assets/pesquisa.svg'
import UsuarioService from '../../Services/UsuarioService'
import './SearchBar.css'

export class SearchBar extends Component {

    constructor() {

        super()
        this.state = {
            nomeOuEmail: '',
            deveRedirecionarParaPesquisa: false
        }
        this.usuarioService = new UsuarioService()
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            const nomeOuEmail = e.target.value

            this.props.history.push(`/pesquisa/${nomeOuEmail}`)
        }
    }

    render() {

        return (
            <Fragment>
                <img src={lupa} alt="lupa de pesquisa" />
                <input className="pesquisa" text="text" placeholder={this.props.placeholder}
                    onChange={this.props.onChange} type="search" onKeyDown={this.keyPress}
                    name={this.props.name} value={this.props.value} />
            </Fragment>
        )
    }
}