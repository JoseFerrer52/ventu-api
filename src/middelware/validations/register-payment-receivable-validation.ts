import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  userBusinessId?: number;
  saleReceivableId?: number;
  saleDate?: string;
  receivableDescription?: string;
  saleAmount?: number;
}

function PaymentReceivableValidate(
  createPaymentReceivableValidation: (
    data: unknown
  ) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createPaymentReceivableValidation(req.body);

      console.log(validatedData);
      req.body = validatedData;
      next();
    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createPaymentReceivableValidation(
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
    saleReceivableId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .required("El campo Tipo de transacción no puede estar vacio."),
    saleDate: yup
      .string()
      .matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha debe estar en el siguiente formato dd/mm/yyyy."
      )
      .transform((value) => {
        if (typeof value === "string") {
          return value.split("/").reverse().join("-");
        }
        return value;
      })
      .required("El campo Fecha no puede estar vacio."),
    receivableDescription: yup
      .string()
      .max(255, "La descripcion debe tener un maximo de 255 caracteres.")
      .required("El campo descripción no puede estar vacio."),
    saleAmount: yup
      .number()
      .transform((value) => {
        if (!value) {
          throw new Error("El monto de la venta es invalido");
        }
        if (value <= 0) {
          throw new Error("El monto de la venta es invalidito");
        }
        if (value > 99999.99) {
          throw new Error("El monto de la venta es invalidito");
        }

        let factor = Math.pow(10, 2);
        let truncado = Math.floor(value * factor) / factor;
        return Number(truncado);
      })
      .typeError("El monto de la venta es invalido.")
      .required("El campo Monto de la venta no puede estar vacio."),
  });

  const validatedData = await schema.validate(data);
  //console.log('log validate',validatedData);

  return validatedData;
}

export { PaymentReceivableValidate, createPaymentReceivableValidation };
