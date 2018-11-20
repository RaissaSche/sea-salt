import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert2'
import { Header, QABox, MyButton } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import './Cadastro.css'

export class Cadastro extends Component {

    constructor() {

        super()
        this.state = {
            nomeCompleto: '',
            email: '',
            apelido: '',
            senha: '',
            dataNascimento: '',
            imagemPerfil: '',
            deveRedirecionarParaDashboard: false
        }
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken())
            this.setState({ deveRedirecionarParaDashboard: true })
    }

    onChange = (event) => {

        const target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    onSubmit = (e) => {

        e.preventDefault()

        this.usuarioService.cadastrar(this.state.nomeCompleto, this.state.email, this.state.apelido,
            this.state.senha, this.state.dataNascimento, this.state.imagemPerfil).then((response) => {

                swal({
                    text: "Usuário cadastrado! Faça login para continuar.",
                    confirmButtonColor: 'rgba(40, 112, 106)'
                })
                this.setState({
                    deveRedirecionarParaLogin: true
                })

            }).catch((err) => {
                this.setState({ mensagemErro: err.response.data.detail })
                swal({
                    text: err.response.data.message,
                    confirmButtonColor: 'rgba(40, 112, 106)'
                })
            })
    }

    render() {

        return (this.state.deveRedirecionarParaLogin ? <Redirect to="/" exact /> :
            <Fragment>
                <Header history={this.props.history} />
                <form className="containerCadastro" onSubmit={this.onSubmit}>
                    <p className="tituloCadastro">Cadastre-se para continuar!</p>
                    <QABox question="Nome Completo" placeholder="Nome Completo"
                        onChange={this.onChange} inputType="text" name="nomeCompleto" />
                    <QABox question="Email" placeholder="Email"
                        onChange={this.onChange} inputType="text" name="email" />
                    <QABox question="Apelido" placeholder="Apelido"
                        onChange={this.onChange} inputType="text" name="apelido" />
                    <QABox question="Senha" placeholder="Senha"
                        onChange={this.onChange} inputType="password" name="senha" />
                    <QABox question="Data de Nascimento" placeholder="Data de Nascimento"
                        onChange={this.onChange} inputType="date" name="dataNascimento" />
                    <QABox question="Foto de Perfil" placeholder="Foto de Perfil"
                        stateUrl={this.state.imagemPerfil} onChange={this.onChange}
                        inputType="text" name="imagemPerfil" />
                    <MyButton message="Cadastrar" />
                </form>
            </Fragment>
        );
    }
}
