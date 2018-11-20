import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Header, Resultado } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import AmizadeService from '../../Services/AmizadeService'
import './Amizades.css'

export class Amizades extends Component {

    constructor() {

        super()
        this.state = {
            amigos: [],
            deveRedirecionarParaDashboard: false
        }
        this.usuarioService = new UsuarioService()
        this.amizadeService = new AmizadeService()
    }

    componentDidMount() {

        if (this.usuarioService.getToken() == null)
            this.setState({ deveRedirecionarParaDashboard: true })

        this.amizadeService.buscarAmigos().then((result) => {
            this.setState({
                amigos: result.data.content
            })

            if (this.state.amigos.length === 0) {
                alert("Você não tem amigos ainda!");

                this.setState({
                    deveRedirecionarParaDashboard: true
                });
            }
        })
    }

    render() {

        return (this.state.deveRedirecionarParaDashboard ? <Redirect to="/dashboard" /> :
            this.state.amigos.map((item, key) => {
                return <div className="posts" key={key}>
                    <Header history={this.props.history} />
                    <div className="amizades">
                        <Resultado imagemPerfil={item.imagemPerfil} nomeCompleto={item.nomeCompleto}
                            apelido={item.apelido} mensagemPorStatusDeAmizade={item.mensagemPorStatusDeAmizade} />
                    </div>
                </div>
            })
        )
    }
}
