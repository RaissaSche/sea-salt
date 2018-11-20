import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Header, MyButton } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import AmizadeService from '../../Services/AmizadeService'
import PostService from '../../Services/UsuarioService'
import editar from '../../Assets/edit_button.svg'
import './MeuPerfil.css'

export class MeuPerfil extends Component {

    constructor() {

        super()
        this.state = {
            nomeCompleto: '',
            email: '',
            apelido: '',
            senha: '',
            dataNascimento: '',
            imagemPerfil: '',
            id: '',
            posts: [],
            mensagemBotao: 'Summonar Amigos',
            deveRedirecionarParaLogin: false,
            deveRedirecionarParaDashboard: false
        }
        this.usuarioService = new UsuarioService()
        this.AmizadeService = new AmizadeService()
        this.postService = new PostService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken() == null) {

            this.setState({ deveRedirecionarParaLogin: true })
        }

        this.usuarioService.usuarioLogado().then(result => {

            this.setState({
                id: result.data.id
            });

            if (this.state.id !== this.props.match.params.id) {

                this.AmizadeService.checarStatus(this.state.id, parseInt(this.props.match.params.id))
                    .then(result => {

                        this.setState({
                            mensagemBotao: result.data.mensagemBotao
                        });
                    })
            }
        })

        this.usuarioService.buscarPorId(parseInt(this.props.match.params.id)).then(result => {
            this.setState({
                nomeCompleto: result.data.nomeCompleto,
                email: result.data.email,
                apelido: result.data.apelido,
                senha: result.data.senha,
                dataNascimento: result.data.dataNascimento,
                imagemPerfil: result.data.imagemPerfil
            });
        })
    }

    onClick = () => {

        localStorage.removeItem("TOKEN");
        this.setState({ deveRedirecionarParaLogin: true })
    }

    render() {

        return (this.state.deveRedirecionarParaLogin ? <Redirect to="/" exact /> :
            <Fragment>
                <Header history={this.props.history} />
                <div className="perfil">
                    <div className="perfilHeader">
                        <div className="imagemPerfilMask">
                            <img className="imagemPerfil" src={this.state.imagemPerfil} alt="imagem de perfil" />
                        </div>
                    </div>
                    <div className="containerPerfil">
                        <p className="nomePerfil">{this.state.nomeCompleto}</p>
                        {this.props.match.params.id === this.state.id ?
                            null : <Link to="/editar-perfil">
                                <img className="editar" src={editar} alt="editar perfil" />
                            </Link>

                        }
                    </div>
                    <p className="apelidoPerfil">@{this.state.apelido}</p>
                    <p>{this.state.email}</p>
                    <p>{this.state.dataNascimento}</p>
                    <Link to="/amigos">
                        <MyButton message={this.state.mensagemBotao} />
                    </Link>
                    <Link to={`/postagens/${this.state.id}`}>
                        <MyButton message="Minhas postagens" function={this.renderPostagens} />
                    </Link>
                    <MyButton message="Sair do SeaSalt" function={this.onClick} />

                </div>
            </Fragment>
        );
    }
}
