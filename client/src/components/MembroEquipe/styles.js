import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"

export const MembroCard = styled.div`
 width: 100%;

 padding:10px;


.header {
    background-color:  rgba(204, 0, 0, 0.8);
    border-radius: 10px 10px 0px 0px;
}
img {
    width: 30%;
    border-radius: 50%;
    position: relative;
    bottom: -50px;
    margin: auto;
    display:block;
    
}

.foot {
    background: #FFFFFF;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 10px 10px;
    padding-top: 60px;
    padding-bottom: 20px;
}

.foot h4 {
    color: #6278F7;
    font-size: 100%;
    line-height: 22px;
    font-weight: bold;
    margin-bottom: 8px;
    text-align: center;
}

.foot h5 {
    font-size: 100%;
    line-height: 22px;
    color: rgba(204, 0, 0, 100);
    text-align: center;
}

a{
    text-decoration:none;
    color: rgba(204, 0, 0, 0.7);
}

a:visited {
    text-decoration: none;
    color: rgba(204, 0, 0, 0.7);
}
  
a:hover {
    text-decoration: underline;
    color: rgba(204, 0, 0, 1);
}
  
a:active {
    text-decoration: underline;
}

`