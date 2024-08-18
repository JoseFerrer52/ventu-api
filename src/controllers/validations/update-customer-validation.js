import yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error.js";


function updateCustomerValidate(createUpdateCustomerValidation) {
    return async (req, res, next) => {
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

async function createUpdateCustomerValidation(data) {
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
            .string("Este campo solo debe conterner una cadena de texto")
            .max(50, "El nombre no puede contener más de 50 caracteres")
            .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Nombre incorrecto")
            .optional(),
        productDescription: yup
            .string()
            .max(255, "La descripcion debe tener un maximo de 255 caracteres")
            .optional(),
        customerPhone: yup
            .string("Este campo solo debe conterner una cadena de texto.")
            .max(13, "Numero de telefono invalido.")
            .matches(
                /^\+58(412|414|416|424|426)\d{7}$/,
                "Numero de telefono invalido."
            )
            .optional()
        ,
        customerAlias: yup
            .string("Este campo solo debe conterner una cadena de texto.")
            .max(20, "El nombre no puede contener más de 20 caracteres.")
            .matches(/^[a-zA-Z0-9 ,.\-]+$/, "Alias invalido.")
            .optional()
    });

    const validatedData = await schema.validate(data);
    return validatedData;
}

export { updateCustomerValidate, createUpdateCustomerValidation, };
