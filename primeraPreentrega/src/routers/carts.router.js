import { Router } from "express";
import carts from "../../CartsManager.js";

const cartsRouter = Router();

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cartId = carts.filter(cart => cart.id === Number(cid))
        
        //Verificamos si el carrito está vacio o no existe el ID del mismo
        if (cartId.length === 0){
            res.status(400).send({
                status: 'error',
                message: 'El carrito agregado no existe o está vacío, no se puede agregar',
                carts
            })
        }
        res.status(200).send({
            status: "succes",
            cartId
        })
        
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: 'El carrito está vacio'
        })
        
    }

})

cartsRouter.post('/', async (req, res) => {
    const cart = req.body;
    try {
        cart.id = carts.length + 1
    
        carts.push(cart);
        res.status(201).send({
            status: "success",
            message: 'El producto se ha agregado al carrito',
            carts
        })
        
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error al agregar el producto al carrito',
            error: error.message
        })        
    }

})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cartId = await carts.addProductToCart(Number(cid), Number(pid))

    try {
            res.status(200).send({
                status: "succes",
                message: 'Producto agregado al carrito con éxito',
                payload: cartId,
                carts
            })
        
    } catch (error) {
        res.status(404).send({
            status: 'error',
            mesagge: 'El carrito está vacio',
            carts
        })
        
    }

})

export default cartsRouter