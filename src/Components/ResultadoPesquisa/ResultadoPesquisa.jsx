import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MyButton } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import './ResultadoPesquisa.css'
import AmizadeService from '../../Services/AmizadeService'

export class ResultadoPesquisa extends Component {

    constructor(props) {

        super(props)
        this.state = {
            id: '',
            resultadoPesquisa: [],
            deveRedirecionarParaLogin: false
        }
        this.usuarioService = new UsuarioService()
        this.amizadeService = new AmizadeService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken() == null) {
            this.setState({ deveRedirecionarParaLogin: true })
        }
        this.pesquisar()

        this.usuarioService.usuarioLogado().then((response) => {
            this.setState({
                id: response.data.id
            })
        })
    }

    componentDidUpdate(prevProps) {

        if (this.props.nomeOuEmail !== prevProps.nomeOuEmail) {
            this.setState({
                resultadoPesquisa: []
            });

            this.pesquisar()
        }
    }

    pesquisar() {

        this.usuarioService.pesquisar(this.props.nomeOuEmail,
            this.props.nomeOuEmail).then(pesquisar => {

                this.setState({
                    resultadoPesquisa: pesquisar.data.content
                });

                if (this.state.resultadoPesquisa.length === 0) {
                    alert("Usuário não encontrado");

                    this.setState({
                        deveRedirecionarParaLogin: true
                    });
                }
            })
    }

    onClick = (status, id) => {
        
        if (status === 'DESCONHECIDOS') {
            this.amizadeService.criar(this.state.id, id).then((response) => {
            })
        }
        else if (status === 'SOLICITADO') {
            this.amizadeService.aceitar(this.state.id, id).then((response) => {
            })
        }
        else if (status === 'AMIGOS') {
            this.amizadeService.desfazer(this.state.id, id).then((response) => {
            })
        }
    }

    render() {

        return (this.state.resultadoPesquisa.map((item, key) => {
            return <div className="containerAmigo" key={key}>
                <Link to={`/perfil/${item.usuario.id}`}>
                    <div className="imagemAmigoMask">
                        <img className="imagemAmigo" src={item.usuario.imagemPerfil} alt="imagem de perfil" />
                    </div>
                </Link>
                <Link to={`/perfil/${item.usuario.id}`}>
                    <div className="containerAmigoAuxiliar">
                        <p className="nomePerfil">{item.usuario.nomeCompleto}</p>
                        <p className="apelidoPerfil">@{item.usuario.apelido}</p>
                    </div>
                </Link>
                <MyButton message={item.status} onClick={() => this.onClick(item.status, item.usuario.id)} />
            </div>
        }));
    }
}