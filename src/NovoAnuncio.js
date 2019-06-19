import React, { Component } from 'react'
import HeaderInterno from './HeaderInterno'
import base,{ storage } from './base'
import { Redirect } from 'react-router-dom'


class NovoAnuncio extends Component{
    constructor(props){
        super(props)
        this.state={
            sucess:false,
            isloading: false,
            erro: ''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.valida=this.valida.bind(this)
        
    }
    valida(dados,tamanho){
        let retorno = true
        if(dados.nome.length <= 3){
            retorno= false
            this.setState({erro:"Digite um nome válido."})
        }
        else if(dados.descricao.length <= 0){
            retorno= false
            this.setState({erro:"Digite uma descrição."})
        }
        else if(dados.preco.length <= 0){
            retorno= false
            this.setState({erro:"Digite um preço válido."})
        }
        else if(dados.telefone.length <= 0){
            retorno= false
            this.setState({erro:"Digite um telefone válido."})
        }
        else if(dados.vendedor.length <= 0){
            retorno= false
            this.setState({erro:"Digite um vendedor válido."})
        }
        console.log(tamanho)
        return retorno
    }

    handleSubmit(e){
        

        const file = this.foto.files[0]
        try{
            const { name, size } = file
            const ref = storage.ref(name)        

            //upload da img
            const NovoAnuncio = {
                nome:this.nome.value,
                descricao:this.descricao.value,
                preco:this.preco.value,
                vendedor:this.vendedor.value,            
                telefone:this.telefone.value,
                categoria:this.categoria.value
            }

            if(this.valida(NovoAnuncio,size)){
                this.setState({isloading:true})
                ref
                .put(file)
                .then(//monta os dados
                    img => { img.ref.getDownloadURL().then(result => {
                        const NovoAnuncio2 =  {...NovoAnuncio , foto : result }            
                        //console.log(NovoAnuncio,NovoAnuncio2)
                        //enviar
                        
                        base.push('anuncios',{
                            data:NovoAnuncio2
                        })
                        .then(()=>{                    
                                this.setState({sucess:true,isloading:false})
                            })          
                    
                    })
                })
            }   
        }
        catch{
            this.setState({erro:"Imagem inválida."})
        }    
        e.preventDefault()
    }
    
    render(){
        if(this.state.sucess){
            return (
                <div className="container fulltela">    
                    <span>Enviado</span>
                    <Redirect to='/' />
                </div>
            )
        }
        if(this.state.isloading){
            return(
                <div className="container fulltela">    
                <div>
                    <h1 class="display-4">
                        <i class="fa fa-spinner"></i> enviando... 
                    </h1>
                </div>
                </div>
            ) 
        }
        return(
            <div>
                
                <div className="container" style={{paddingTop: '120px'}}>
                    <HeaderInterno />
                    { this.state.erro.length>0 && <div className="p-3 mb-2 bg-warning text-dark">{this.state.erro}</div>}

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