import React, { Component } from 'react'
import { MyButton } from '../Button/Button'
import UsuarioService from '../../Services/UsuarioService'
import './Resultado.css'

export class Resultado extends Component {

    constructor() {

        super()
        this.state = {
            deveRedirecionarParaLogin: false
        }
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken() == null)
            this.setState({ deveRedirecionarParaLogin: true })
    }

    render() {

        return (
            <div className="containerAmigo">
                <div className="imagemAmigoMask">
                    <img className="imagemAmigo" src={this.props.imagemPerfil} alt="imagem de perfil" />
                </div>
                <div className="containerAmigoAuxiliar">
                    <p className="nomePerfil">{this.props.nomeCompleto}</p>
                    <p className="apelidoPerfil">@{this.props.apelido}</p>
                </div>
                <MyButton message={this.props.message} onClick={this.props.onClick} />
            </div>
        )
    }
}