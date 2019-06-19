import React from 'react'
import { Link , Route} from 'react-router-dom'

import HeaderIntenrno from './HeaderInterno'
import Categoria from './Categoria'
import Anuncio from './Anuncio'

const Categorias = (props) => {
    return(
        
        <div>
            <HeaderIntenrno />
               
            <div className="container" style={{paddingTop: '120px'}}>
                <h1> Categorias </h1>
                <div className="area">
                    <div className="row">
                        <div className="col-lg-3 filtro">
                        <ul className="lista">
                            {
                                props.categorias.map( cat => {
                                    return(
                                        <li className="item" key={cat.url}>                                        
                                            <Link to={`/categorias/${cat.url}`}>
                                            <i className={`fa ${cat.icon} `} aria-hidden="true"></i>  {cat.categoria}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </div>
                        <div className="col-lg-8 conteudo">
                            <Route path='/categorias/:urlCategoria' exact component={Categoria} />
                            <Route path='/categorias/:urlCategoria/:idAnuncio' render={(props) => <Anuncio {...props} /> } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}    

export default Categorias;
