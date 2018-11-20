import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert2'
import { Header, QABox, MyButton } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import './Login.css'

export class Login extends Component {

    constructor() {

        super()
        this.state = {
            id: '',
            email: '',
            senha: '',
            mensagemErro: '',
            deveMostarTelaCarregando: false,
            deveRedirecionarParaDashboard: false,
            deveRedirecionarParaCadastro: false
        }
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken())
            this.setState({ deveRedirecionarParaDashboard: true })
    }

    onChange = (e) => {

        const target = e.target
        this.setState({
            [target.name]: target.value
        })
    }

    onSubmit = (e) => {

        e.preventDefault()
        this.setState({ deveMostarTelaCarregando: true })

        this.usuarioService.login(this.state.email, this.state.senha).then((response) => {

            this.usuarioService.salvarToken(response.data)
            swal({
                text: "Usuário logado!",
                confirmButtonColor: 'rgba(40, 112, 106)'
            })

            this.usuarioService.usuarioLogado().then((response) => {

                swal({
                    text: "Usuário logado!",
                    confirmButtonColor: 'rgba(40, 112, 106)'
                })
                this.setState({
                    id: response.id,
                    deveRedirecionarParaDashboard: true
                })
            })

        }).catch((err) => {

            this.setState({ mensagemErro: err.response.data.detail })
            if (err.message === "Request failed with status code 403") {
                swal({
                    text: "Email ou Senha errados! Você também pode não estar cadastrado.",
                    confirmButtonColor: 'rgba(40, 112, 106)'
                })
            }
        })
    }

    redirectToCadastro = () =>
        this.setState({ deveRedirecionarParaCadastro: true })

    render() {

        return (this.state.deveRedirecionarParaDashboard ? <Redirect to={`/dashboard/${this.state.id}`} /> :
            this.state.deveRedirecionarParaCadastro ? <Redirect to="/cadastro" /> :
                <Fragment>
                    <Header history={this.props.history} />
                    <div className="containerLogin">
                        <p className="tituloLogin">Faça login para continuar!</p>
                        <form>
                            <QABox question="Email" placeholder="Usuário" inputType="text"
                                onChange={this.onChange} name="email" />
                            <QABox question="Senha" placeholder="Senha" inputType="password"
                                onChange={this.onChange} name="senha" />
                            <div className="containerLogin">
                                <MyButton message="Entrar" function={this.onSubmit} />
                                <MyButton message="Criar Conta" function={this.redirectToCadastro} />
                            </div>
                        </form>
                    </div>
                </Fragment>
        );
    }
}