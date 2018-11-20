import axios from 'axios'
import BaseService from './BaseService'

export default class UsuarioService extends BaseService {

    constructor() {

        super()
        this.TOKEN_KEY = 'TOKEN'
    }

    usuarioLogado() {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/usuarios/logado`, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    todosUsuarios() {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/usuarios`, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    buscarPorId(id) {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/usuarios/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    login(email, senha) {

        const dados = {
            email,
            senha
        }
        return axios.post(`${this.baseUrl}/usuarios/login`, dados, {

            headers: {
                'Authorization': `Bearer ${this.getToken()}`
            }
        })
    }

    cadastrar(nomeCompleto, email, apelido, senha, dataDeNascimento, imagemPerfil) {

        const dados = {
            nomeCompleto,
            email,
            apelido,
            senha,
            dataDeNascimento,
            imagemPerfil
        }
        return axios.post(`${this.baseUrl}/usuarios`, dados)
    }

    editar(nomeCompleto, apelido, imagemPerfil) {

        const token = this.getToken()
        const dados = {
            nomeCompleto,
            apelido,
            imagemPerfil
        }
        return axios.post(`${this.baseUrl}/usuarios/editar`, dados, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    pesquisar(nome, email) {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/usuarios/pesquisar`, {
            headers: {
                'Authorization': `${token}`
            },
            params: {
                nome: nome,
                nomeOuEmail: email
            }
        })
    }

    salvarToken(token) {

        localStorage.setItem(this.TOKEN_KEY, token)
    }

    getToken() {

        return localStorage.getItem(this.TOKEN_KEY)
    }
}