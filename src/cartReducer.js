export default function cartReducer(cart, action){
    switch (action.type){
        case "empty":
            return [];
        case "add":
            const {id, sku} = action; //se destructura
            const itemInCart = cart.find((i) => i.sku === sku);
            if (itemInCart) {
                //retorna un nuevo array con matching item replaced
                //se itera cada eleemnto del array y si se encuentra el item se retorma una copia con la cantidad +1 y sino se encuentra se deja igualß
                return cart.map( (i) => 
                    i.sku === sku ? {...i, quantity: i.quantity +1 } : i 
                ); 
                }else{
                //retorna un nuevo array con el new array appende
                return [...cart, {id, sku, quantity : 1}];
                }
        case "updateQuantity": {
            const { sku, quantity } = action;
            return quantity === 0
                ? cart.filter( (i) => i.sku !== sku)
                : cart.map( (i) => i.sku === sku ? {...i, quantity: quantity } : i);
            }

        default:
            throw new Error("no handle error: " + action.type)
    }
};