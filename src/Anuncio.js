import React, { Component } from 'react'
import axios from 'axios'

//https://mercadodev-8f12c.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22

export default class src extends Component {
    constructor(props){
        super(props)
        this.state={
            anuncio: {},
            isloading:true
        }
        const id = this.props.match.params.idAnuncio
        const url =`https://mercadodev-8f12c.firebaseio.com/anuncios/${id}.json`
        axios.get(url).then(data=>{
            this.setState({anuncio: data.data,isloading:false})
        })
    }
    render() {
        const anuncio = this.state.anuncio

        if(this.state.isloading){
            return <i className="fa fa-circle-notch fa-spin fa-3x fa-fw"></i>
        }
        return (
            <div>
                <h1>{anuncio.nome}</h1>
                <div className="row" style={{"padding":"10px"}}>

                <div className="col-lg-6">
                    <img src={anuncio.foto} alt="foto" className="produto"/>                
                </div>
                <div className="col-lg-6">   
                    <ul className="lista">
                        <li className="item">
                            <span>Categoria: </span> {anuncio.categoria}
                        </li>
                        <li className="item">
                            <span>Descrição: </span>{anuncio.descricao}
                        </li>
                        <li className="item">
                            <span>Preço: </span>{anuncio.preco}
                        </li>
                        <li className="item">
                            <span>Vendedor: </span>{anuncio.vendedor}
                        </li>
                        <li className="item">
                            <span>Telefone: </span>{anuncio.telefone}
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}
