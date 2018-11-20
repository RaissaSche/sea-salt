import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert2'
import { Header, QABox, MyButton } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import PostService from '../../Services/PostService'
import './CriarPost.css'

export class CriarPost extends Component {

    constructor() {

        super()
        this.state = {
            id: "",
            titulo: "",
            texto: "",
            imagem: "",
            isPublic: "",
            deveRedirecionarParaLogin: '',
            deveRedirecionarParaDashboard: ''
        }
        this.postService = new PostService()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken() === null) {
            this.setState({ deveRedirecionarParaLogin: true })
        }

        this.usuarioService.usuarioLogado().then((response) => {
            this.setState({
                id: response.data.id
            });
        })
    }

    onChange = (event) => {

        const target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    onSelectPublic = (event) => {
        this.setState({ isPublic: true })
    }

    onSelectPrivate = (event) => {
        this.setState({ isPublic: false })
    }

    onSubmit = (e) => {

        e.preventDefault();
        this.postService.criar(this.state.titulo, this.state.texto, this.state.imagem,
            this.state.isPublic, this.state.id).then(() => {

                swal({
                    text: "Postado!",
                    confirmButtonColor: 'rgba(40, 112, 106)'
                })

                this.setState({
                    deveRedirecionarParaDashboard: true
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
            this.state.deveRedirecionarParaDashboard ? <Redirect to="/dashboard" /> :
                <Fragment>
                    <Header history={this.props.history} />
                    <form onSubmit={this.onSubmit} className="containerCadastro">
                        <p className="tituloCadastro">O que quer dizer pro mundo?</p>
                        <QABox question="Título" placeholder="Título"
                            onChange={this.onChange} inputType="text" name="titulo" />
                        <QABox question="Texto" placeholder="Texto"
                            onChange={this.onChange} inputType="text" name="texto" />
                        <QABox question="Imagem" placeholder="Imagem"
                            stateUrl={this.state.imagemPerfil} onChange={this.onChange}
                            inputType="text" name="imagem" />
                        <QABox question="Público? (s/n)" placeholder="s"
                            stateUrl={this.state.isPublic} onChange={this.onChange}
                            inputType="text" name="isPublic" />
                        <MyButton message="Postar" />
                    </form>
                </Fragment>
        );
    }
}
