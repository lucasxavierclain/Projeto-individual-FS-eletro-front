import { useState } from 'react'
export default function Pedidos(props) {

    const [id, setId]= useState()
    function deletar(target) {
        target.preventDefault()
        fetch("http://localhost:3000/Formulario", {
            method: "DEL",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        }).then((resposta) => {
            setId(resposta);
        })
    }
    return (
        <tr>
            <td>{props.nome}</td>
            <td>{props.produto}</td>
            <td>{props.descricao}</td>
            <td>{props.quantidade}</td>
            <td>R$ {props.precoFinal}</td>
            <button className='btn btn-danger' id={props.idpedido} value={props.idproduto}onClick={deletar}>Deletar</button>
        </tr>
    )


}