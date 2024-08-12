import yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error.js";

function getSaleReceivableValidate(createGetSaleReceivableValidation) {
  return async (req, res, next) => {
    try {
        const validatedData = await createGetSaleReceivableValidation(req.body);

        console.log(validatedData);
        req.body = validatedData;
        next()

    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createGetSaleReceivableValidation(data) {

    const schema = yup.object().shape({
      userId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("Id invalido.")
        .required("El campo id de usuario no puede estar vacio."),
      userBusinessId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("Id invalido.")
        .required("El campo id de la empresa no puede estar vacio."),
      saleReceivableId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .required("El campo Tipo de transacción no puede estar vacio."),
    });

    const validatedData = await schema.validate(data);
    //console.log('log validate',validatedData);

    return validatedData;

}

export { getSaleReceivableValidate, createGetSaleReceivableValidation };