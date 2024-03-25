import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Form } from './Form';
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import * as Yup from "yup";

export const UpdateClient = () => {

    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        fetchClient();

    }, []);

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
        validateOnChange: true,
        onSubmit: async (values) => {

            try {

                values.name = cleanChain(values.name);
                values.company = cleanChain(values.company);
                values.notes = cleanChain(values.notes);

                const response = await fetch(`http://localhost:3000/clients/${id}`, {
    
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
    
                });
    
                if (response.status === 200) {
    
                    Swal.fire(
                        'Cliente Actualizado',
                        'El cliente se actualizó correctamente',
                        'success'
                    );
    
                }
    
            } catch (error) {
    
                Swal.fire(
                    'Error',
                    'Ocurrió un error al actualizar el cliente',
                    'error'
                );
    
            }

        }

    });

    const fetchClient = async () => {

        try {

            const response = await fetch(`http://localhost:3000/clients/${id}`);
            const data = await response.json();
            formik.setValues(data);

        } catch (error) {

            setRedirect(true);

        }

    }

    if (redirect) return <Navigate to='/' />

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>

            <div className="flex justify-end">
                <Link
                    to='/'
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                >
                    Volver
                </Link>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>


                <form onSubmit={formik.handleSubmit}>

                    <Form formik={formik} />

                    <button
                        type="submit"
                        className="bg-yellow-600 w-full p-3 mt-4 text-white uppercase font-bold hover:bg-yellow-700"
                    >
                        Actualizar Cliente
                    </button>

                </form>
            </div>
        </>
    )
}
