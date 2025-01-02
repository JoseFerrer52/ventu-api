import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  firstName?: string;
  lastName?: string;
  userName?: string;
  userPassword?: string;
  userDateCreation?: string;
  updateDate?: string;
  userEmail?: string;
}

function signUpvalidate(
  createFormValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.body);

    try {
      const validatedData = await createFormValidation(req.body);
      req.body = validatedData;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createSignUpValidation(
  data: unknown
): Promise<ValidationSchema> {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .max(20, "El nombre no puede contener más de 20 caracteres")
      .matches(
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
        "Nombre incorrecto"
      )
      .required("El campo Nombre no puede estar vacio"),
    lastName: yup
      .string()
      .max(20, "El Apellido no puede contener más de 20 caracteres")
      .matches(
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
        "Apellido incorrecto"
      )
      .required("El campo Apellido no puede estar vacio"),
    userName: yup
      .string()
      .max(20, "El Nombre de usuario no puede contener más de 20 caracteres")
      .matches(/^[a-zA-Z0-9_]+$/, "Nombre de usario incorrecto")
      .required("Este campo Nombre de usuario no puede estar vacio"),
    userPassword: yup
      .string()
      .min(8, "La contraseña debe contener minimo 8-20 caracteres")
      .max(20, "La contraseña debe contener minimo 8-20 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/,

        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial."
      )
      .required("Este campo Contraseña no puede estar vacio"),
    userDateCreation: yup
      .string()
      .matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha debe estar en el siguiente formato dd/mm/yyyy"
      )
      .transform((value) => {
        // Invertir la fecha después de una validación exitosa
        if (typeof value === "string") {
          return value.split("/").reverse().join("-");
        }
        return value;
      })
      .required("El campo Fecha no puede estar vacio"),
    updateDate: yup
      .string()
      .matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha debe estar en el siguiente formato dd/mm/yyyy"
      )
      .transform((value) => {
        // Invertir la fecha después de una validación exitosa
        if (typeof value === "string") {
          return value.split("/").reverse().join("-");
        }
        return value;
      })
      .required("El campo Fecha no puede estar vacio"),
    userEmail: yup.string().email("Correo electronico invalido").required(),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { signUpvalidate, createSignUpValidation };
