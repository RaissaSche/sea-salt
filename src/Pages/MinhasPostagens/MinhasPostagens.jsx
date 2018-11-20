import React, { Component } from 'react'
import { Post, Header } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import PostService from '../../Services/PostService'
import './MinhasPostagens.css'

export class MinhasPostagens extends Component {

    constructor(props) {

        super(props)
        this.state = {
            posts: [],
            deveRedirecionarParaLogin: false,
            deveRedirecionarParaDashboard: false
        }
        this.usuarioService = new UsuarioService()
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
        })

        this.postService.buscarPostagensUsuario(parseInt(this.props.match.params.id)).then((result) => {
            this.setState({
                posts: result.data.content
            });
        })

        this.usuarioService.buscarPorId(parseInt(this.props.match.params.id)).then((result) => {
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

        return <div className="feed">
            <Header history={this.props.history} />
            <Post />
        </ div>
    }
}
