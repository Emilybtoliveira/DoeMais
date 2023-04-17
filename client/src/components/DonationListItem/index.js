import React from 'react';
import {Textos} from './styles';
import icon from './blood_drop_donation_icon.svg';
import { durationInMonths } from '@progress/kendo-date-math';


function DonationListItem (props){
    const start = new Date(props.date[0], props.date[1], props.date[2]);
    const current = new Date();
    const end = new Date (current.getFullYear(), current.getMonth()+1, current.getDate());
    const duration = durationInMonths(start, end);
    let duracaodoacao;
    if (duration == 1) {
        duracaodoacao = <p className='solong'>Há {duration} mês</p>;    
    } 
    else {
        duracaodoacao = <p className='solong'>Há {duration} meses</p>;    }
    

    return(
        <Textos>
            <div className='first'>
                <div className='icon'>
                <img src = {icon} ></img>
                </div>
                <div className='text'>
                    <h1>Doação dia {props.date[2]}/{props.date[1]}/{props.date[0]}</h1>
                    <h3>{props.location}</h3>
            </div>
            </div>
            {duracaodoacao}
        </Textos>    
    )
}

export default DonationListItem