import axios from 'axios'
import BaseService from './BaseService'

export default class PostService extends BaseService {

    constructor() {

        super()
        this.TOKEN_KEY = 'TOKEN'
    }

    buscarPostagensUsuario(id) {

        const token = this.getToken()
        return axios.get(`${this.baseUrl}/postagens/${id}`, {
            headers: {
                'Authorization': `${token}`
            },
            params: {
                id: id
            }
        })
    }

    criar(titulo, texto, imagem, isPublic, id) {

        const token = this.getToken()
        const dados = {
            titulo: titulo,
            texto: texto,
            imagem: imagem,
            isPublic: isPublic,
            idUsuario: id
        }

        return axios.post(`${this.baseUrl}/postagens/${id}`, dados, {
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