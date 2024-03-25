import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Index = () => {

    const [clients, setClients] = useState([]);

    useEffect(() => {

        fetchClients()

    }, []);

    const fetchClients = async () => {

        const response = await fetch('http://localhost:3000/clients');
        const data = await response.json();
        setClients(data);

    }

    const deleteClient = async (id) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {

                    const response = await fetch(`http://localhost:3000/clients/${id}`, {
                        method: 'DELETE'
                    });

                    if (response.status === 200) {

                        Swal.fire(
                            'Eliminado!',
                            'El cliente ha sido eliminado.',
                            'success'
                        );

                        fetchClients();

                    }

                } catch (error) {
                    
                    Swal.fire(
                        'Error!',
                        'Hubo un error al eliminar el cliente.',
                        'error'
                    );

                }

            }
        })

    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus Clientes</p>

            {clients.length ? (
                <table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white text-left'>
                        <tr>
                            <th className='p-4'>Cliente</th>
                            <th className='p-4'>Notas</th>
                            <th className='p-4'>Contacto</th>
                            <th className='p-4'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.map((client, index) => (

                            <tr className="border-b" key={index}>

                                <td className='p-4 space-y-2'>
                                    <p className="text-gray-800">{client.name}</p>
                                    <p>{client.company}</p>
                                </td>

                                <td className='p-4'>
                                    <p className="text-gray-800">{client.notes ? client.notes : "Sin notas"}</p>
                                </td>

                                <td className="p-4">
                                    <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{client.email}</p>
                                    <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Tel: </span>+569{client.phone}</p>
                                </td>

                                <td className="flex gap-3 p-4">
                                    <Link
                                        to={`/editar/cliente/${client.id}`}
                                        type="button"
                                        className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs cursor-pointer"

                                    >
                                        Editar
                                    </Link>

                                    <button
                                        type="submit"
                                        className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                                        onClick={() => deleteClient(client.id)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            ) : (

                <p className="text-center mt-10">No Hay clientes registrados</p>

            )}
        </>
    )
}
