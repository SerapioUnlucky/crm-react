import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Index } from '../components/Index'
import { Layout } from '../components/Layout'
import { RegisterClient } from '../components/RegisterClient'
import { UpdateClient } from '../components/UpdateClient'

export const Routing = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Layout />}>

                    <Route index element={<Index />} />
                    <Route path='index' element={<Index />} />
                    <Route path='registrar/cliente' element={<RegisterClient />} />
                    <Route path='editar/cliente/:id' element={<UpdateClient />} />

                </Route>

            </Routes>

        </BrowserRouter>
    )
}
