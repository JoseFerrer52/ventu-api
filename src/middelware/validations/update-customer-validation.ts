import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  userBusinessId?: number;
  customerId?: number;
  customerName?: string;
  customerPhone?: string;
  customerAlias?: string;
}

function updateCustomerValidate(
  createUpdateCustomerValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createUpdateCustomerValidation(req.body);

      req.body = validatedData;
      console.log(validatedData);

      next();
    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createUpdateCustomerValidation(
  data: unknown
): Promise<ValidationSchema> {
  const schema = yup.object().shape({
    userId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Id incorrecto")
      .required("El campo id de usuario no puede estar vacio."),
    userBusinessId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Id incorrecto")
      .required("El campo id de la empresa no puede estar vacio."),
    customerId: yup
      .number()
      .transform((value) => {
        console.log("this", value);

        return parseInt(value);
      })
      .typeError("Id incorrecto")
      .required("El campo id del cliente no puede estar vacio."),
    customerName: yup
      .string()
      .max(50, "El nombre no puede contener más de 50 caracteres")
      .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Nombre incorrecto")
      .optional(),
    customerPhone: yup
      .string()
      .max(13, "Numero de telefono invalido.")
      .matches(
        /^\+58(412|414|416|424|426)\d{7}$/,
        "Numero de telefono invalido."
      )
      .optional(),
    customerAlias: yup
      .string()
      .max(20, "El nombre no puede contener más de 20 caracteres.")
      .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Alias invalido.")
      .optional(),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { updateCustomerValidate, createUpdateCustomerValidation };
