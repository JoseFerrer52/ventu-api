import { response } from "../../utilities/response.js";
import { registerproduct, resgiterSale, resgitreSaleReceivable, registerCustomerPaymentReceivable, registerOtherIncome, registerExpenses } from "../../services/DB/query-database.js";


 export const postProducts = async (req, res) => {
    const data = req.body
    const query = await registerproduct(data)

    response(res, 200, query, {})
}


export const postSale = async (req, res) =>{
    const data = req.body
    const query = await resgiterSale(data)

    response(res, 200, query, {})
}

export const postSaleReceivable = async (req, res) =>{
    const data = req.body
    const query = await resgitreSaleReceivable(data)

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