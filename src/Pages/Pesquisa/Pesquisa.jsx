import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Header, ResultadoPesquisa } from '../../Components'
import UsuarioService from '../../Services/UsuarioService'
import './Pesquisa.css'

export class Pesquisa extends Component {

    constructor(props) {

        super(props)
        this.state = {
            deveRedirecionarParaLogin: false,
            nomeOuEmail: props.match.params.nomeOuEmail
        }
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {
        if (this.usuarioService.getToken() == null) {
            this.setState({ deveRedirecionarParaLogin: true })
        }

        if (!this.props.match.params.nomeOuEmail) {
            this.props.history.replace('/dashboard')
        }
    }

    componentDidUpdate() {
        const { nomeOuEmail } = this.props.match.params

        if (nomeOuEmail !== this.state.nomeOuEmail) {
            this.setState({
                nomeOuEmail
            })
        }
    }

    render() {

        return (this.state.deveRedirecionarParaLogin ? <Redirect to="/" exact /> :
            <Fragment>
                <Header history={this.props.history} />

                <div className="resultadoPesquisa">
                    <ResultadoPesquisa nomeOuEmail={this.state.nomeOuEmail} />
                </div>
            </Fragment>
        )
    }
}
