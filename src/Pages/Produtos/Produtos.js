import { useState, useEffect } from 'react';
import { Container, Row, ListGroup } from 'react-bootstrap'
import { lazy, Suspense } from 'react';

const Produto = lazy(() => import('../../Componentes/Produto'));
function Produtos() {
    const [produtos, setProdutos] = useState([]);
    useEffect(async () => {
        const resposta = await fetch("http://localhost:3000/Produtos")
        const dados = await resposta.json()


        setProdutos(dados);

    }, []);





    return (
        <Container fluid>
            <Container fluid>
                <ListGroup>
                    <ListGroup.Item action variant="danger">
                        Todos (12)
                </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                        Televisão (3)
                </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                        Celular (3)
                </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                        Máquina de lavar (1)
                </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                        Geladeira (3)
                </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                        Microondas (2)
                </ListGroup.Item>

                </ListGroup>
            </Container>
            <Suspense fallback={<h2 className='carregando '>Carregando</h2>}>
                <Row>

                    {produtos && produtos.map(item => <Produto imagem={item.nomeImagem} categoria={item.categoria} nome={item.descricao} key={item.idprodutos} precoAnterior={item.precoAnterior} precoFinal={item.preco} />)}

                </Row>
            </Suspense>
        </Container >

    )
}
export default Produtos