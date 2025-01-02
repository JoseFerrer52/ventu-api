import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  userBusinessId?: number;
  typetransactionId?: number;
  typeIncomeId?: number;
  transactionId?: number;
}

function getTransactionValidate(
  createGetTransactionValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createGetTransactionValidation(req.body);

      console.log(validatedData);
      req.body = validatedData;
      next();
    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createGetTransactionValidation(
  data: unknown
): Promise<ValidationSchema> {
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
    typetransactionId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("El tipo de transacción es invalida.")
      .min(1, "El tipo de transacción es invalida.")
      .max(2, "El tipo de transacción es invalida.")
      .required("El campo Tipo de transacción no puede estar vacio."),
    typeIncomeId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("El tipo de ingreso es invalido.")
      .transform((value) => {
        if (!value) {
          return 0;
        }
        return parseInt(value);
      })
      .typeError("El tipo de venta es invalido.")
      .min(0, "El tipo de ingreso es invalido.")
      .max(2, "El tipo de ingreso es invalido.")
      .optional(),
    transactionId: yup
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

export { getTransactionValidate, createGetTransactionValidation };
