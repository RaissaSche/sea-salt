import axios from 'axios'
import BaseService from './BaseService'

export default class AmizadeService extends BaseService {

    constructor() {

        super()
        this.TOKEN_KEY = 'TOKEN'
    }

    checarStatus(idLogado, idOutroUsuario) {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/amizades`, {
            headers: {
                'Authorization': `${token}`
            },
            params: {
                idLogado: idLogado,
                idOutroUsuario: idOutroUsuario
            }
        })
    }

    buscarAmigos() {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/amizades/amigos`, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    criar(idLogado, idOutroUsuario) {

        const token = this.getToken()
        const dados = {
            idLogado,
            idOutroUsuario
        }

        return axios.post(`${this.baseUrl}/amizades`, dados, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    aceitar(idLogado, idOutroUsuario) {

        const token = this.getToken()
        const dados = {
            idLogado,
            idOutroUsuario
        }

        return axios.post(`${this.baseUrl}/amizades/aceitar`, dados, {
            headers: {
                'Authorization': `${token}`
            }
        })
    }

    desfazer(idLogado, idOutroUsuario) {

        const token = this.getToken()
        const dados = {
            idLogado,
            idOutroUsuario
        }

        return axios.post(`${this.baseUrl}/amizades/desfazer`, dados, {
            headers: {
                'Authorization': `${token}`
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