import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userName?: string;
  userPassword?: string;
}

function singInValidate(
  createSingInValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createSingInValidation(req.body);

      req.body = validatedData;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createSingInValidation(
  data: unknown
): Promise<ValidationSchema> {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .max(20, "Nombre de uario o contraseña invalada.")
      .matches(/^[a-zA-Z0-9_]+$/, "Nombre de uario o contraseña invalada.")
      .required("El campo nombre de usuario no puede estar vacio."),
    userPassword: yup
      .string()
      .min(8, "Nombre de uario o contraseña invalada.")
      .max(20, "Nombre de uario o contraseña invalada.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/,
        "Nombre de uario o contraseña invalada."
      )
      .required("Este campo Contraseña no puede estar vacio."),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { singInValidate, createSingInValidation };
