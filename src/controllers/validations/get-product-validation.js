import yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error.js";

function GetProductValidate(createGetProductVaValidation) {
  return async (req, res, next) => {
    try {
        const validatedData = await createGetProductVaValidation(req.body);

        console.log(validatedData);
        req.body = validatedData;
        next()

    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createGetProductVaValidation(data) {

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
      productId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .required("datos del producto invalidos."),
    });

    const validatedData = await schema.validate(data);
    //console.log('log validate',validatedData);

    return validatedData;

}

export { GetProductValidate, createGetProductVaValidation };