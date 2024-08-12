import yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error.js";

function saleReceivableValidate(createSaleReceivableValidation) {
  return async (req, res, next) => {
    try {
      const saleTypeId = parseInt(req.body.saleTypeId);

      if (saleTypeId === 2) {
        const validatedData = await createSaleReceivableValidation(req.body);

        console.log(validatedData);
        req.body = validatedData;
        next();
      } else {
        throw new Error("El tipo de venta es invalido");
      }
    } catch (error) {
      next(new ValidationError(error));
      console.log(error);
    }
  };
}

async function createSaleReceivableValidation(data) {
  const customerId = parseInt(data.customerId);

  if (!customerId) {
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
      customerName: yup
        .string()
        .max(20, "El nombre no puede contener más de 20 caracteres.")
        .matches(
          /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
          "Nombre de usuario invalido."
        )
        .required("El campo Nombre de usuario no puede estar vacio."),
      customerPhone: yup
        .string("Este campo solo debe conterner una cadena de texto.")
        .max(13, "Numero de telefono invalido.")
        .matches(
          /^\+58(412|414|416|424|426)\d{7}$/,
          "Numero de telefono invalido."
        )
        .required("El campo Numero de telefono no puede estar vacio."),
      customerAlias: yup
        .string("Este campo solo debe conterner una cadena de texto.")
        .max(20, "El nombre no puede contener más de 20 caracteres.")
        .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Alias invalido.")
        .required("El campo Alias no puede estar vacio."),
      productId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("Id invalido")
        .required("El campo id del cliente no puede estar vacio."),
      typeTransactionId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("El tipo de transacción es invalida.")
        .min(1, "El tipo de transacción es invalida.")
        .required("El campo Tipo de transacción no puede estar vacio."),
      typeIncomeId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("El tipo de ingreso es invalido.")
        .min(1, "El tipo de ingreso es invalido.")
        .required("El campo Tipo de ingreso no puede estar vacio."),
      saleTypeId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("El tipo de venta es invalido.")
        .min(1, "El tipo de venta es invalido.")
        .required("El campo Tipo de venta no puede estar vacio."),
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
          if(!value){
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
          return parseFloat(truncado);
        })
        .typeError("El monto de la venta es invalido.")
        .optional(),
      intemQuantity: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .min(1, "La cantidad de productos debe ser minimo de 1 producto y maximo 100.")
        .max(100, "La cantidad de productos debe ser minimo de 1 producto y maximo 100.")
        .typeError("La cantidad de productos es invalido.")
        .required(
          "El campo cantidad de productos de la venta no puede estar vacio."
        ),
      additionalNote: yup
        .string()
        .transform((value)=>{
            if(!value){
                return "null"
            }
            return value
        })
        .typeError("La descripcion incorrecta.")
        .max(255, "La descripcion debe tener un maximo de 255 caracteres.")
        .optional(),
      debtAmount: yup
        .number()
        .transform((value) => {
          if (value <= 0) {
            throw new Error("El monto de la venta es invalidito");
          }
          if (value > 99999.99) {
            throw new Error("El monto de la venta es invalidito");
          }

          let factor = Math.pow(10, 2);
          let truncado = Math.floor(value * factor) / factor;
          return parseFloat(truncado);
        })
        .typeError("El monto de la venta es invalido.")
        .required("El campo Monto de la venta no puede estar vacio."),
    });

    const validatedData = await schema.validate(data);
    //console.log('log validate',validatedData);

    return validatedData;
  } else {
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
      customerId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("Id invalido.")
        .required("El campo id de la empresa no puede estar vacio."),
      productId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("Id invalido")
        .required("El campo id del cliente no puede estar vacio."),
      typeTransactionId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("El tipo de transacción es invalida.")
        .min(1, "El tipo de transacción es invalida.")
        .required("El campo Tipo de transacción no puede estar vacio."),
      typeIncomeId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("El tipo de ingreso es invalido.")
        .min(1, "El tipo de ingreso es invalido.")
        .required("El campo Tipo de ingreso no puede estar vacio."),
      saleTypeId: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .typeError("El tipo de venta es invalido.")
        .min(1, "El tipo de venta es invalido.")
        .required("El campo Tipo de venta no puede estar vacio."),
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
          if(!value){
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
          return parseFloat(truncado);
        })
        .typeError("El monto de la venta es invalido.")
        .optional(),
      intemQuantity: yup
        .number()
        .transform((value) => {
          return parseInt(value);
        })
        .min(1, "La cantidad de productos debe ser minimo de 1 producto y maximo 100.")
        .max(100, "La cantidad de productos debe ser minimo de 1 producto y maximo 100.")
        .typeError("La cantidad de productos es invalido.")
        .required(
          "El campo cantidad de productos de la venta no puede estar vacio."
        ),
      additionalNote: yup
        .string()
        .transform((value)=>{
            if(!value){
                return "null"
            }
            return value
        })
        .typeError("La descripcion incorrecta.")
        .max(255, "La descripcion debe tener un maximo de 255 caracteres.")
        .optional(),
      debtAmount: yup
        .number()
        .transform((value) => {
          if (value <= 0) {
            throw new Error("El monto de la venta es invalidito");
          }
          if (value > 99999.99) {
            throw new Error("El monto de la venta es invalidito");
          }

          let factor = Math.pow(10, 2);
          let truncado = Math.floor(value * factor) / factor;
          return parseFloat(truncado);
        })
        .typeError("El monto de la venta es invalido.")
        .required("El campo Monto de la venta no puede estar vacio."),
    });

    const validatedData = await schema.validate(data);
    //console.log('log validate',validatedData);

    return validatedData;
  }
}

export { saleReceivableValidate, createSaleReceivableValidation };
