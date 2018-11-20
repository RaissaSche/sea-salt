import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LikeButton } from '../../Components'
import xButton from '../../Assets/x-button.png'
import oButton from '../../Assets/o-button.png'
import UsuarioService from '../../Services/UsuarioService'
import './Post.css'
import PostService from '../../Services/PostService'

export class Post extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            posts: [],
            mensagemErroUsuario: '',
            mensagemErroPosts: ''
        }
        this.usuarioService = new UsuarioService()
        this.postService = new PostService()
    }

    componentDidMount() {

        this.usuarioService.usuarioLogado().then((response) => {
            this.setState({
                usuario: response.data
            })

            this.postService.buscarPostagensUsuario(parseInt(this.state.usuario.id)).then((result) => {

                this.setState({
                    posts: result.data.content
                });
            })

        }).catch((err) => {
            this.setState({ mensagemErroUsuario: err.response.data.detail })
        })
    }

    render() {
        return (this.state.posts.map((item, key) => {
            return <div className="posts" key={key}>
                <div className="containerPost">
                    <div className="containerInfos">
                        <div className="fotoDePerfilMask">
                            <Link to={`/perfil/${this.state.id}`}>
                                <img className="fotoDePerfil" alt="foto de perfil"
                                    src={item.usuario.imagemPerfil} />
                            </Link>
                        </div>
                        <div className="infos">
                            <strong className="info1">@{item.usuario.apelido}</strong>
                            <span className="info2">Hoje às 15:34</span>
                        </div>
                    </div>
                    <div className="containerTextos">
                        <span className="tituloPost">{item.titulo}</span>
                        <span className="texto">{item.texto}</span>
                    </div>
                    <img className="imagemPost" src={item.imagem} alt="imagem da Postagem" />
                    <div className="containerBotao">
                        <LikeButton src={xButton} message="Gostar" />
                        <LikeButton src={oButton} message="Comentar" />
                    </div>
                </div>
            </div>
        }));
    }
}