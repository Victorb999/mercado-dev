import React, { Component } from 'react'
import HeaderInterno from './HeaderInterno'
import base,{ storage } from './base'
import { Redirect } from 'react-router-dom'

class NovoAnuncio extends Component{
    constructor(props){
        super(props)
        this.state={
            sucess:false
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(e){


        const file = this.foto.files[0]
        console.log(file)
        const { name } = file
        const ref = storage.ref(name)
        //upload da img
        
        
        .put(file)
        .then(//monta os dados
            img => { img.ref.getDownloadURL().then(result => {
                const NovoAnuncio = {
                    nome:this.nome.value,
                    descricao:this.descricao.value,
                    preco:this.preco.value,
                    vendedor:this.vendedor.value,
                    foto:result,
                    telefone:this.telefone.value,
                    categoria:this.categoria.value
                }
                //enviar
                
                base.push('anuncios',{
                    data:NovoAnuncio
                })
                .then(()=>{                    
                        this.setState({sucess:true})
                    })          
            
            })
        }).catch(e=> console.log(e))

        
        e.preventDefault()
    }
    
    render(){
        if(this.state.sucess){
            return <Redirect to='/' />
        }
        return(
            <div>

                <div className="container" style={{paddingTop: '120px'}}>
                    <HeaderInterno />
                    <h1>Novo Anúncio</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                        <label htmlFor="foto">Foto</label>
                            <input type="file" className="form-control" placeholder="Foto" id="foto" ref={(ref)=> this.foto = ref} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" placeholder="Nome" id="nome" ref={(ref)=> this.nome = ref} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoria">Categoria</label>
                            <select ref={(ref)=> this.categoria = ref} className="form-control">
                            { this.props.categorias.map( cat =>
                                <option value={cat.url} key={cat.icon}>{cat.categoria}</option>
                                )
                            }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <input type="text" className="form-control" placeholder="Descrição" id="descricao" ref={(ref)=> this.descricao = ref} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="preco">Preço</label>
                            <input type="text" className="form-control" placeholder="Preço" id="preco" ref={(ref)=> this.preco = ref} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="text" className="form-control" placeholder="Telefone" id="telefone" ref={(ref)=> this.telefone = ref} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vendedor">Vendedor</label>
                            <input type="text" className="form-control" placeholder="Vendedor" id="vendedor" ref={(ref)=> this.vendedor = ref} />
                        </div>

                        <button className="btn btn-primary"> Salvar Anúncio</button>
                    </form>
                </div>
                
            </div>
        )
    }
}
export default NovoAnuncio