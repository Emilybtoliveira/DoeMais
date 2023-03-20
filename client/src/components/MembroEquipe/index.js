import './styles.js'
import { MembroCard } from './styles.js'

const MembroEquipe = ({nome, imagem, cargo: tiposanguineo, link}) =>{

    return(
        <MembroCard>
            <div className='header'>
                <img src={imagem} alt={nome}/>

            </div>
            <div className='foot'>
                <h4><a href={link} target='_blank'>{nome}</a></h4>
                
                <h5>{tiposanguineo}</h5>

            </div>
        </MembroCard>
    )

}


export default MembroEquipe