import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Header, QABox, MyButton } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'

import './EditarPerfil.css'

export class EditarPerfil extends Component {

    constructor() {

        super()
        this.state = {
            nomeCompleto: '',
            apelido: '',
            imagemPerfil: '',
            id: '',
            deveRedirecionarParaLogin: false,
            deveRedirecionarParaPerfil: false
        }
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {

        if (!this.usuarioService.getToken()) {
            this.setState({ deveRedirecionarParaLogin: true })
        }

        this.usuarioService.usuarioLogado().then(result => {

            this.setState({
                nomeCompleto: result.data.nomeCompleto,
                apelido: result.data.apelido,
                senha: result.data.senha,
                imagemPerfil: result.data.imagemPerfil,
                id: result.data.id
            });
        }
        )
    }

    onChange = (event) => {

        const target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    onSubmit = (e) => {

        e.preventDefault()
        this.usuarioService.editar(this.state.nomeCompleto, this.state.apelido,
            this.state.imagemPerfil).then(() => {

                this.setState({ deveRedirecionarParaPerfil: true })
            })
    }

    render() {
        return (this.state.deveRedirecionarParaPerfil ? <Redirect to={`/perfil/${this.state.id}`} /> :
            this.state.deveRedirecionarParaLogin ? <Redirect to="/" exact /> :

                <Fragment>
                    <Header history={this.props.history} />
                    <form className="containerCadastro" onSubmit={this.onSubmit}>
                        <p className="tituloCadastro">Edite seu perfil aqui!</p>
                        <QABox question="Nome Completo" placeholder="Nome Completo" value={this.state.nomeCompleto}
                            onChange={this.onChange} inputType="text" name="nomeCompleto" />
                        <QABox question="Apelido" placeholder="Apelido" value={this.state.apelido}
                            onChange={this.onChange} inputType="text" name="apelido" />
                        <QABox question="Foto de Perfil" placeholder="Foto de Perfil" value={this.state.imagemPerfil}
                            onChange={this.onChange} inputType="text" name="imagemPerfil" />
                        <MyButton message="Salvar" />
                    </form>
                </Fragment>
        );
    }
}
