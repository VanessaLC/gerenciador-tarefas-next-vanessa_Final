import type { NextPage } from 'next'
import { useState } from 'react'
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';

type HeaderProps = {
    sair() : void
    setShowModal(b:boolean):void
}

const Header: NextPage<HeaderProps> = ({ sair , setShowModal}) => {
  
    const fullName = localStorage.getItem('userName');
    const UserName = fullName?.split(' ')[0] || '';

   return (
    <div className="container-header">
        <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
        <button onClick={() => setShowModal(true)}><span>+</span>Adicionar Tarefa </button>
        <div className = "mobile">
            <span>Olá, {UserName} </span>
            <img src="/exit-mobile.svg" alt="Deslogar" className="sair" onClick={sair}/>
        </div>
        <div className = "desktop">
            <span>Olá, {UserName} </span>
            <img src="/exit-desktop.svg" alt="Deslogar" className="sair" onClick={sair}/>
        </div>
      </div>
  )
}

export { Header }