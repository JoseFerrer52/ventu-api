import { response } from "../../utilities/response.js";
import { uploadImageToServer } from "../../services/generate_image_link/upload-image-to-server.js";
import { registerproduct, resgiterSale, resgiterSaleReceivable, registerCustomerPaymentReceivable, registerOtherIncome, registerExpenses } from "../../services/DB/query-database.js";


 export const postProducts = async (req, res) => {
    const userId = req.params.id
    const data = req.body
    const file = req.file
    
    const productImage = await uploadImageToServer(file)

    const query = await registerproduct(data, productImage)

    response(res, 200, query, {})
}

export const postSale = async (req, res) =>{
    const data = req.body
    const query = await resgiterSale(data)

    response(res, 200, query, {})
}

export const postSaleReceivable = async (req, res) =>{
    const data = req.body
    const query = await resgiterSaleReceivable(data)

    response(res, 200, query, {})
}

export const postSaleCustomerPaymentReceivable = async (req, res) =>{
    const data = req.body
    const query = await registerCustomerPaymentReceivable(data)

    response(res, 200, query, {})
}

export const postOtherIncome = async(req, res)=>{
    const data = req.body
    const query = await registerOtherIncome(data)
    response(res, 200, query, {})
}

export const postExpenses = async(req, res)=>{
    const data = req.body
    const query = await registerExpenses(data)
    response(res, 200, query, {})
}