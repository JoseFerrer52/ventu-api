import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  sectorId?: number;
  businessName?: string;
  businessDateCreation?: string;
  businessUpdateDate?: string;
  businessDescription?: string;
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

function registerBusinessValidate(
  createFormValidation: (data: unknown) => Promise<ValidationSchema>,
  createFileValidation: (file: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createFormValidation(req.body);
      const validatedFile = await createFileValidation(req.file);

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

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createFormRegisterBusinessValidation(
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
      .string()
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

async function createFileRegisterBussinesValidation(
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
  registerBusinessValidate,
  createFileRegisterBussinesValidation,
  createFormRegisterBusinessValidation,
};
