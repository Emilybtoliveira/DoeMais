import styled from 'styled-components'

export const Container = styled.div`
    padding: 4%;
    background-color: rgba(197, 23, 23, 0.06);
    @media (max-width: 720px) {
        flex-direction: column;
        justify-content: start;
        margin-top: 10%;
    }
    button{
        border-radius: 20px;
        background-color: rgba(204, 0, 0, 1);
        padding:1%;
    }
    button a{
        color: white;
        
        text-decoration: none;
        font-family: 'Ropa Sans', sans-serif;
        font-size: 2em;
    }
    .buttonSection{
        display: flex;
        justify-content: space-around;
        padding: 1%;
    }
`

export const ContainerA = styled.div`
    /* height:80vh; */
    padding: 2% ;
    display:block;
    background-color: white;
    border-radius:30px;
    h1{
        color: white;
        font-family: 'Ropa Sans', sans-serif;
        font-size: 4em;
        display:table;
        background-color: rgba(204, 0, 0, 100);
        border-radius:30px 55px;
        padding-left: 2%;
        padding-right: 2%;
    }

    h2{
        color: rgba(204, 0, 0, 100);
        font-family: 'Ropa Sans', sans-serif;
        font-size: 3em;
        text-decoration: underline;
        padding: 2%;

    }
    h3{
        color: rgba(204, 0, 0, 100);
        font-family: 'Ropa Sans', sans-serif;
        font-size: 2em;
        padding: 0% 3%;

    }

    h4{
        font-family: 'Radio Canada', sans-serif;
        font-size: 1.7em;
        font-weight: 900;

    }

    h4 strong{
        color: rgba(204, 0, 0, 1);
    }

    .left{
        text-align: left;
    }
    .right{
        text-align: right;
    }
    .center{
        text-align: center;
    }

    p{
        font-family: 'Radio Canada', sans-serif;
        font-size: 1.3em;
        font-weight: 600; 
        color:rgba(0, 0, 0, 0.77);
        text-indent: 5%;
        text-align:justify;
        padding:0% 5% 1% 5%;
        
    }

    .pictures{
        width: 600px;
        padding 1%;
        margin: auto;
        display: block;

    }
    ul li::marker{
        color: rgba(204, 0, 0, 100);
    }
    ul{
        padding:0 0 0 10%
    }
    li{
        font-family: 'Radio Canada', sans-serif;
        font-weight: 600; 
        color:rgba(0, 0, 0, 0.77);
        text-align:justify;
        padding:0% 0% 1% 0%;

    }
    
`