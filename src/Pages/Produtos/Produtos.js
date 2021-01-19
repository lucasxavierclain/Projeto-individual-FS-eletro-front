import { useState, useEffect } from 'react';
import { Container, Row, ListGroup } from 'react-bootstrap'
import Produto from '../../Componentes/Produto'

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    useEffect(async () => {
        const resposta = await fetch("http://localhost:3000/Produtos")
        const dados = await resposta.json()
        console.log(dados)

        setProdutos(dados);

    }, []);

    function exibirTodos(){
        let elementos= document.getElementsByClassName("produto");
        for(let i=0; i<elementos.length;i++){
            elementos[i].style="display:block";
        }
    }
    function filtrar(categoria){

        let elementos= document.getElementsByClassName("box-produtos");
        console.log(elementos)
        for(let i=0; i<elementos.length;i++){
            console.log(elementos[i].id);
            if(categoria==elementos[i].id)
                elementos[i].style="display:block";
            else
            elementos[i].style="display:none";
            
        }
    }
    
    

    return (
        <Container fluid>
            <Container fluid>
            <ListGroup>
                    <ListGroup.Item action onclick={exibirTodos}  variant="danger">
                    Todos (12)
                </ListGroup.Item>
                <ListGroup.Item action onclick={filtrar('televisao')} variant="danger">
                    Televisão (3)
                </ListGroup.Item>
                    <ListGroup.Item action onclick={filtrar('celular')} variant="danger">
                    Celular (3)
                </ListGroup.Item>
                    <ListGroup.Item action onclick={filtrar('maquinaDeLavar')} variant="danger">
                    Máquina de lavar (1)
                </ListGroup.Item>
                <ListGroup.Item action onclick={filtrar('geladeira')} variant="danger">
                    Geladeira (3)
                </ListGroup.Item>
                    <ListGroup.Item action onclick={filtrar('microndas')} variant="danger">
                    Microondas (2)
                </ListGroup.Item>

            </ListGroup>
            </Container>

            <Row>

                {produtos && produtos.map(item => <Produto imagem={item.nomeImagem} categoria={item.categoria} nome={item.descricao} precoAnterior={item.precoAnterior} precoFinal={item.preco} />)}
            </Row>
        </Container>

    )
}
export default Produtos