import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  userBusinessId?: number;
  productId?: number;
  productName?: string;
  productDescription?: string;
  mimetype?: string;
  originalname?: string;
  fieldname?: string;
  encoding?: string;
  size?: string;
  stream?: string;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: string;
}

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "image/gif",
];

//const allowedResolutions = ["1920x1080", "1280x720", "720x480", "426x240"];

function productValidate(
  createProductValidation: (data: unknown) => Promise<ValidationSchema>,
  createFileProductValidation: (file: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createProductValidation(req.body);
      const validatedFile = await createFileProductValidation(req.file);

      const mappedFile: any = {
        fieldname: validatedFile.originalname,
        originalname: validatedFile.originalname,
        encoding: validatedFile.encoding,
        mimetype: validatedFile.mimetype,
        size: validatedFile.size,
        stream: validatedFile.buffer,
        destination: validatedFile.destination,
        filename: validatedFile.filename,
        path: validatedFile.path,
        buffer: validatedFile.buffer,
      };

      req.file = mappedFile;
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

async function createProductValidation(
  data: unknown
): Promise<ValidationSchema> {
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
      .string()
      .max(50, "El nombre no puede contener más de 50 caracteres")
      .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Nombre incorrecto")
      .required("El campo nombre de la empresa no puede estar vacio"),
    productDescription: yup
      .string()
      .max(255, "La descripcion debe tener un maximo de 255 caracteres")
      .required("El campo descripción no puede estar vacio"),
    productAmount: yup.number().transform((value) => {
      if (!value) {
        throw new Error("El monto de la venta es invalido");
      }
      if (value <= 0) {
        throw new Error("El monto de la venta es invalido");
      }
      if (value > 99999.99) {
        throw new Error("El monto de la venta es invalido");
      }

      let factor = Math.pow(10, 2);
      let truncado = Math.floor(value * factor) / factor;
      return Number(truncado);
    }),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

async function createFileProductValidation(
  file: unknown
): Promise<ValidationSchema> {
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

export {
  productValidate,
  createProductValidation,
  createFileProductValidation,
};
