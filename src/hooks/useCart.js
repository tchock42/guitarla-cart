import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db";

const useCart = () => {
    
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('carrito')  //obtiene de LS
        return localStorageCart ? JSON.parse(localStorageCart) : [];  // retorna LS convertido a arreglo o []
      }
    
      const [data, setData] = useState(db);
      const [carrito, setCarrito] = useState(initialCart);        //inicializa LS o []
      const MIN_ITEMS = 1;
      const MAX_ITEMS = 10;
    
      useEffect(() => {       //useEffect para agregar a LS el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito))
      }, [carrito]);
    
      //funcion que agrega al carrito y tambien almacena en LocalStorage
      const addToCart = (item) => {
        const itemExist = carrito.findIndex(guitar => guitar.id === item.id); //si encuentra el mismo id, retorna su posición, de lo contrario retorna -1
        
        if( itemExist >= 0 ){                   //si ya existe en el carrito, aumenta quantity
          if(carrito[itemExist].quantity >= MAX_ITEMS) return;  //si ya sobrepasa 10 
          const updatedCarrito = [...carrito];  //se crea una copia modificable del carrito
          updatedCarrito[itemExist].quantity++; //incrementa cantidad
          setCarrito(updatedCarrito);           //Actualiza
        } else{                                 // no existe en el carrito
          item.quantity = 1;
          setCarrito([...carrito, item])        //agrega al carrito
        }
      }
    
      //funcion para eliminar del carrito
      const removeFromCart = (id) =>{
        setCarrito(prevCarrito => prevCarrito.filter(guitar => guitar.id !==id))  //filter crea array con lo que cumple la condición
      }
    
      const increaseQuantity = (id) => {
        const updatedCart = carrito.map( item => {
          if(item.id === id && item.quantity < MAX_ITEMS){
            return{       //retorna el objeto guitarra (item) integro pero cambia la cantidad
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item   //retorna el item que no fue modificado para construir updatedCart
        })
        setCarrito(updatedCart) //actualiza el state carrito
      }
    
      const decreaseQuantity = (id) => {
        const updatedCart = carrito.map(item => {
          if(item.id === id && item.quantity > MIN_ITEMS){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item           //retorna el item que no fue modificado
        })
        setCarrito(updatedCart) //actualiza el state carrito
      }
    
      function clearCart(){
        setCarrito([]);
      }

       //state derivado
        const isEmpty = useMemo( () => carrito.length === 0, [carrito])  //funcion evalua si carrito está vacío. retorna true o false hasta que halla un cambio en carrito
        const cartTotal = useMemo(() => carrito.reduce((total, item) => total + (item.quantity * item.price), 0), [carrito])

    return {
        data,
        carrito,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export default useCart;