import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Header, MyButton, Post } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import PostService from '../../Services/PostService'
import './Dashboard.css'

export class Dashboard extends Component {

    constructor() {

        super()
        this.state = {
            id: '',
            posts: [],
            deveRedirecionarParaLogin: false
        }
        this.usuarioService = new UsuarioService()
        this.postService = new PostService()
    }

    componentDidMount() {
        if (this.usuarioService.getToken() == null)
            this.setState({ deveRedirecionarParaLogin: true })

        this.usuarioService.usuarioLogado().then(result => {

            this.setState({
                id: result.data.id,
                deveRedirecionarParaDashboardComId: true
            });
        })
    }

    render = () => {

        return (this.state.deveRedirecionarParaLogin ? <Redirect to="/" exact /> :
            <div>
                <Header history={this.props.history} />
                <Link to={`/perfil/${this.state.id}`}><MyButton message="Meu Perfil" /></Link>
                <Link to="/criar-post"><MyButton message="Postar" /></Link>
                <div className="feed">
                    <Post />
                </div>
            </div>
        )
    }
}
