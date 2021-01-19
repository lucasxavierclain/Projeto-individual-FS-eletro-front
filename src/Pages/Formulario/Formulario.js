import { Form, Button, Row } from 'react-bootstrap';
import React,{ useState, useEffect } from 'react';
import Pedidos from '../../Componentes/Pedidos/Pedidos'

export default function Formulario() {



    const [pedidos, setPedidos] = useState([])
    const [form, setForm] = React.useState({
        nome: "",
        quantidade: "",
        idprodutos: "",
        email: "",
        telefone:""
    })
    const [response, setResponse]=React.useState(null)
    function handleChange({ target }) {
        const { id, value } = target
        setForm({ ...form, [id]: value })
        console.log({...form, [id]: value })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:3000/Formulario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then((resposta) => {
            setResponse(resposta);
        })
        
    }

    useEffect(() => {
        async function atualizarPedido() {
            const url = "http://localhost:3000/Formulario";
            const resposta = await fetch(url);
            const resultado = await resposta.json();
            setPedidos(resultado);
            console.log(resultado)
        }

        atualizarPedido();
    }, [])
    return (
        <Row>
            <div className='container container-fluid formulario'>
                <div className="col lg-6 mx-auto">
                    {/* <Form onSubmit={envioPedido} > */}
                    <Form onSubmit={handleSubmit} >    
                    <h2 className='titulo-formulario'>Pedido</h2>
                        <Form.Group>
                            <Form.Label>Nome </Form.Label>
                            <Form.Control type="text" id="nome" name="nome"
                                value={form.nome}
                            onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" id="email" name="email"
                            value={form.email}    onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="number" id="telefone" name="telefone"
                                value={form.telefone}
                            onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Produto</Form.Label>
                            <Form.Control id='idprodutos' name="idprodutos" as="select"
                                value={form.idprodutos}
                            onChange={handleChange}>
                                <option value='1 '>Celular V8</option>
                                <option value='2' >Celular Samsung A23</option>
                                <option value='3'>Iphone11</option>
                                <option value='4'>Geladeira Consul</option>
                                <option value='5'>Geladeira Electrolux</option>
                                <option value='6'>Geladeira Electrolux Inox</option>
                                <option value='7'>TV LG</option>
                                <option value='8'>TV Philco</option>
                                <option value='9'>TV Samsung</option>
                                <option value='10'>Máquina de lavar Consul</option>
                                <option value='11'>Microondas Electrolux</option>
                                <option value='12'>Microondas Ret</option>


                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quatidade </Form.Label>
                            <Form.Control type="number" id="quantidade" name="quantidade"
                                value={form.quantidade}
                            onChange={handleChange}></Form.Control>
                        </Form.Group>
                        

                        <Button variant='success' type='submit'>Enviar</Button>
                    </Form>

                </div>
                <div className="row">
                    <table className="table table-striped mt-4 text-center">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Produto</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos && pedidos.map(pedido => <Pedidos idpedido={pedido.idpedido} nome={pedido.nome} produto={pedido.produto} descricao={pedido.descricao} quantidade={pedido.quantidade} precoFinal={pedido.quantidade * pedido.preco} />)}
                            {response && response.ok && alert("Pedido enviado")}
                        </tbody>
                    </table>
                </div>
            </div>

        </Row>
    )


}