import yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error.js";

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "image/gif",
];

const allowedResolutions = ["1920x1080", "1280x720", "720x480", "426x240"];

function validate(createFileValidation, createFormValidation) {
  return async (req, res, next) => {
    try {
      const validatedFile = await createFileValidation(req.file);
      const validatedData = await createFormValidation(req.body);

      req.file = validatedFile;
      req.body = validatedData;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createFormValidation(data) {
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,20}$/,
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
    sectorId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Sector de empresa incorrecto")
      .min(1, "Sector de empresa incorrecto")
      .max(5, "Sector de empresa incorrecto")
      .required("El campo sector de empresa no puede estar vacío"),
    businessName: yup
      .string("Este campo solo debe conterner una cadena de texto")
      .max(50, "El nombre no puede contener más de 50 caracteres")
      .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Nombre incorrecto")
      .required("El campo nombre de la empresa no puede estar vacio"),
    businessDateCreation: yup
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
    businessUpdateDate: yup
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
    businessDescription: yup
      .string()
      .max(255, "La descripcion debe tener un maximo de 255 caracteres")
      .required("El campo descripción no puede estar vacio"),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

async function createFileValidation(file) {
  const schema = yup.object().shape({
    mimetype: yup
      .string()
      .oneOf(allowedMimeTypes, "El tipo de archivo es invalido")
      .required("El tipo de archivo es requerido"),
    originalname: yup
      .string()
      .matches(
        /^.{0,255}$/,
        "El nombre original no debe exceder los 255 caracteres"
      )
      .required("El nombre del archivo es requerido"),
  });

  const validatedFile = await schema.validate(file);
  return validatedFile;
}

export { validate, createFileValidation, createFormValidation };
