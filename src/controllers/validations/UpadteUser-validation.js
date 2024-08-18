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

function validateUpadteUser(createFormUpadteUserValidation, createFileUpadteUserValidation) {
  return async (req, res, next) => {
    try {
      const validatedData = await createFormUpadteUserValidation(req.body);
      const validatedFile = await createFileUpadteUserValidation(req.file);

      req.body = validatedData;
      req.file = validatedFile;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createFormUpadteUserValidation(data) {
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
    firstName: yup
      .string()
      .max(20, "El nombre no puede contener más de 20 caracteres")
      .matches(
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
        "Nombre incorrecto"
      )
      .optional(),
    lastName: yup
      .string()
      .max(20, "El Apellido no puede contener más de 20 caracteres")
      .matches(
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
        "Apellido incorrecto"
      )
      .optional(),
    userName: yup
      .string()
      .max(20, "El Nombre de usuario no puede contener más de 20 caracteres")
      .matches(/^[a-zA-Z0-9_]+$/, "Nombre de usario incorrecto")
      .optional(),
    userPassword: yup
      .string()
      .min(8, "La contraseña debe contener minimo 8-20 caracteres")
      .max(20, "La contraseña debe contener minimo 8-20 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/,

        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial."
      )
      .optional(),
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
      .optional(),
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
      .optional(),
    sectorId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Sector de empresa incorrecto")
      .min(1, "Sector de empresa incorrecto")
      .max(5, "Sector de empresa incorrecto")
      .optional(),
    businessName: yup
      .string("Este campo solo debe conterner una cadena de texto")
      .max(50, "El nombre no puede contener más de 50 caracteres")
      .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Nombre incorrecto")
      .optional(),
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
      .optional(),
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
      .optional(),
    businessDescription: yup
      .string()
      .max(255, "La descripcion debe tener un maximo de 255 caracteres")
      .optional(),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

async function createFileUpadteUserValidation(file) {
  const schema = yup.object().shape({
    mimetype: yup
      .string()
      .oneOf(allowedMimeTypes, "El tipo de archivo es invalido")
      .optional(),
    originalname: yup
      .string()
      .matches(
        /^.{0,255}$/,
        "El nombre original no debe exceder los 255 caracteres"
      )
      .optional(),
  });

  const validatedFile = await schema.validate(file);
  return validatedFile;
}

export { validateUpadteUser, createFormUpadteUserValidation, createFileUpadteUserValidation };
