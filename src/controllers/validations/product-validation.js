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

function productValidate(createProductValidation, createFileProductValidation) {
  return async (req, res, next) => {
    try {
        const validatedData = await createProductValidation(req.body);
        const validatedFile = await createFileProductValidation(req.file);

      req.file = validatedFile;
      req.body = validatedData;
      console.log(req.body);
      console.log(req.file);

      next();
    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createProductValidation(data) {
  const schema = yup.object().shape({
    userId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Id incorrecto")
      .required("El campo id de usuario no puede estar vacio"),
    userBusinessId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Id incorrecto")
      .required("El campo id de la empresa no puede estar vacio"),
    productName: yup
      .string("Este campo solo debe conterner una cadena de texto")
      .max(50, "El nombre no puede contener más de 50 caracteres")
      .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Nombre incorrecto")
      .required("El campo nombre de la empresa no puede estar vacio"),
    productDescription: yup
      .string()
      .max(255, "La descripcion debe tener un maximo de 255 caracteres")
      .required("El campo descripción no puede estar vacio"),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

async function createFileProductValidation(file) {
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

export { productValidate, createProductValidation, createFileProductValidation };
