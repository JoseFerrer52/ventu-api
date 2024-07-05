import { response } from "../../utilities/response.js";
import { insertproducts } from "../../services/DB/query-database.js";
import { resgiterSale, registerOtherIncomes } from "../../services/DB/query-database.js";


 export const postProducts = async (req, res) => {
    const data = req.body
    await insertproducts(data)

    response(res, 200, "Producto guardado con exito", {})
}


export const postSale = async (req, res) =>{
    const data = req.body
    const {businessUserID, customerName, customerPhone, productID, saleDate, saleDescription, saleAmount, quantity } = data
    await resgitreSale(data)

    response(res, 200, "Venta registrada con exito", {})
}

export const postOtherIncomes = async(req, res)=>{
    const data = req.body
    const {businessUserID, description, date, amount, additionalNote} = data
    await resgitreOtherIncomes(data)
    response(res, 200, "Ingreso Agregado con exito", {})
}