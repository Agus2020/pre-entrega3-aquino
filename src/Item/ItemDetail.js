import {useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCarrito } from "../Carrito/CustomProvider"
import ItemCount from "./ItemCount"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ItemDetail = ({ producto }) => {

    const navigate = useNavigate();

    const { agregarProducto } = useCarrito()
    const [cantidad, setCantidad] = useState(1)
    const [confirmado, setConfirmado] = useState(false)
    

    const handleOnAdd = (cantidad) => {
        setCantidad(cantidad)
        setConfirmado(true)
    }

    const handleClick = () => {
        agregarProducto(producto,cantidad)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <strong>Productos agregados!</strong>,
            icon: 'success'
          })
        navigate("/")
        }


    return (
        <div className="card card-rDetail" >
            
            <img src={producto.images} alt={producto.title} className="card-img-top card-img-r" />
            <div className="card-body card-b">
                <h5 className="card-title">{producto.title}</h5>
                <h2>US${producto.price}</h2>
                <h5 className="card-description description-detail">
                {producto.description}</h5>
                <h5 className="card-description">
                Cantidad disponible:{producto.stock}</h5>
                <div >
                <ItemCount 
                init={cantidad} handleOnAdd={handleOnAdd}  stock={producto.stock}/>
                {confirmado && <button onClick={handleClick} className="btn btn-primary">Confirmar el carrito de  {cantidad} productos</button>}
                </div>
                
            </div>
            
           
        </div>
                    
    )
}
export default ItemDetail