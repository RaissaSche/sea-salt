import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Cadastro, Login, Dashboard, MeuPerfil, Amizades, EditarPerfil, CriarPost, Pesquisa } from './Pages'
import './App.css';
import { MinhasPostagens } from './Pages/MinhasPostagens/MinhasPostagens';

class App extends Component {

  render() {
    return (
      <div className="App">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Route component={Cadastro} path="/cadastro" />
        <Route component={Login} path="/" exact />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={MeuPerfil} path="/perfil/:id" />
        <Route component={Amizades} path="/amigos" />
        <Route component={Pesquisa} path="/pesquisa/:nomeOuEmail?" />
        <Route component={EditarPerfil} path="/editar-perfil" />
        <Route component={CriarPost} path="/criar-post" />
        <Route component={MinhasPostagens} path="/postagens/:id" />
      </div >
    );
  }
}

export default App
