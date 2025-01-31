import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  userEmail?: string;
}

function refreshEmailValidate(
  createRefreshEmailValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createRefreshEmailValidation(req.body);

      console.log(validatedData);
      req.body = validatedData;
      next();
    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createRefreshEmailValidation(
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
    userEmail: yup
      .string()
      .email("Correo electronico invalido")
      .required("El campo id de usuario no puede estar vacio."),
  });

  const validatedData = await schema.validate(data);
  //console.log('log validate',validatedData);

  return validatedData;
}

export { refreshEmailValidate, createRefreshEmailValidation };
