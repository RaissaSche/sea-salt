import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
import iconText from '../../Assets/iconText.png'
import sino from '../../Assets/sino.svg'
import './Header.css'

export class Header extends Component {

    render() {

        return (
            <header>
                <Link to="/dashboard">
                    <img className="icon" src={iconText} alt="icon" />
                </Link>

                <label className="barraPesquisa">
                    <SearchBar history={this.props.history} className="pesquisa" placeholder="Pesquisar" />
                </label>
                <button type="button" className="sino">
                    <img src={sino} alt="notificações" />
                </button>
            </header >
        )
    }
}