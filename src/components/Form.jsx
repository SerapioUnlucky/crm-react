
export const Form = ({ formik }) => {

    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Nombre</label>                
                {formik.errors.name ? <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"> <p>{formik.errors.name}</p> </div> : null}          
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese aquí el nombre del cliente"
                    name="name"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.name}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">Empresa</label>
                {formik.errors.company ? <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"> <p>{formik.errors.company}</p> </div> : null}
                <input
                    id="company"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese aquí la empresa del Cliente"
                    name="company"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.company}
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">E-mail</label>
                {formik.errors.email ? <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"> <p>{formik.errors.email}</p> </div> : null}
                <input
                    id="email"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese aquí el email del Cliente"
                    name="email"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.email}
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-800" htmlFor="phone">Teléfono (+569)</label>
                {formik.errors.phone ? <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"> <p>{formik.errors.phone}</p> </div> : null}
                <input
                    id="phone"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese aquí el teléfono del Cliente"
                    name="phone"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.phone}
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-800" htmlFor="notes">Notas</label>
                {formik.errors.notes ? <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"> <p>{formik.errors.notes}</p> </div> : null}
                <textarea
                    id="notes"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50 h-40 align-self"
                    placeholder="Ingrese aquí las notas del Cliente"
                    name="notes"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.notes}
                />
            </div>
        </>
    )
}
