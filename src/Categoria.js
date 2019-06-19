import React,{ Component } from 'react';
import axios from 'axios'
import AnuncioHome from './AnuncioHome'

//https://mercadodev-8f12c.firebaseio.com/anuncios.json?orderby=


class Categoria extends Component {
    constructor(props){
        super(props)
        

        this.state={
            anuncios:{},
            isloading:false
        }
        this.loadAnuncios = this.loadAnuncios.bind(this)

        this.loadAnuncios(this.props.match.params.urlCategoria)
    }

    loadAnuncios(urlCategoria){
        this.setState({isloading:true,anuncios:{}})
        //carregar dados
        const url = `https://mercadodev-8f12c.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22`
        axios.get(url).then(
            data => {
                this.setState({anuncios: data.data,isloading:false})
                this.categoria = urlCategoria  //tem que setar um novo estado
            }
        )
    }

    //receber propriedades novas ele executa de novo
    componentWillReceiveProps(newProps){
        if(newProps.match.params.urlCategoria){
            if(this.categoria !==newProps.match.params.urlCategoria){
                this.loadAnuncios(newProps.match.params.urlCategoria)
            }
        }
    }

    render(){
        return(
            <div>
                <h1 className="titulo">
                    {this.props.match.params.urlCategoria}
                </h1>
                {
                    this.state.isloading && <i className="fa fa-circle-notch fa-spin fa-3x fa-fw"></i>
                }
                {
                    !this.state.isloading && Object.keys(this.state.anuncios).length === 0 && <p>Nenhum produto cadastrado</p>
                }
                <div className="row">

                    { Object.keys(this.state.anuncios).map(key =>{
                        const anuncios = this.state.anuncios[key]
                        return <AnuncioHome anuncio={anuncios} key={key} id={key}/>
                    }) }
                
                </div>



            </div>
        )
    }
  
}

export default Categoria;
