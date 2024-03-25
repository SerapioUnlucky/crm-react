import { Form } from './Form';
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import * as Yup from "yup";

export const RegisterClient = () => {

    const FormValidation = Yup.object().shape({

        name: Yup.string()
                .required('El nombre del cliente es obligatorio')
                .trim()
                .min(3, 'El nombre debe contener al menos 3 caracteres')
                .max(50, 'El nombre no puede contener más de 50 caracteres')
                .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'El nombre solo puede contener letras'),
        company: Yup.string()
                .required('La empresa del cliente es obligatoria')
                .trim()
                .min(3, 'La empresa debe contener al menos 3 caracteres')
                .max(50, 'La empresa no puede contener más de 50 caracteres')
                .matches(/^[a-zA-ZÀ-ÿ0-9\s]*$/, 'La empresa solo puede contener letras, números'),
        email: Yup.string()
                .email('El email no es válido')
                .required('El email del cliente es obligatorio'),
        phone: Yup.string()
                .required('El teléfono del cliente es obligatorio')
                .trim()
                .matches(/^\d{8}$/, 'El teléfono debe contener exactamente 8 dígitos sin espacios en blanco'),
        notes: Yup.string()
                .max(100, 'Las notas no pueden contener más de 100 caracteres')
                .trim().min(1, 'El texto no puede contener solo espacios en blanco')
                
    });

    const cleanChain = (chain) => {

        return chain.replace(/\s+/g, ' ').trim();

    }

    const formik = useFormik({

        initialValues: {

            name: '',
            company: '',
            email: '',
            phone: '',
            notes: ''

        },
        validationSchema: FormValidation,
        onSubmit: async (values) => {

            try {

                values.name = cleanChain(values.name);
                values.company = cleanChain(values.company);
                values.notes = cleanChain(values.notes);

                const response = await fetch('http://localhost:3000/clients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
    
                if (response.status === 201) {
         
                    Swal.fire(
                        'Cliente registrado!',
                        'El cliente ha sido registrado correctamente.',
                        'success'
                    );

                }
    
            } catch (error) {
    
                Swal.fire(
                    'Error!',
                    'Hubo un error al registrar el cliente.',
                    'error'
                );
    
            }

        }

    });

    return (
        <div>

            <h1 className='text-center text-2xl font-bold uppercase mt-5 mb-10'>Formulario para registrar un nuevo cliente</h1>

            <form onSubmit={formik.handleSubmit}>

                <Form formik={formik} />

                <button
                    type="submit"
                    className="bg-green-600 w-full p-3 mt-4 text-white uppercase font-bold hover:bg-green-700"
                    disabled={formik.isSubmitting}
                >
                    Registrar Cliente
                </button>

            </form>

        </div>
    )
}
