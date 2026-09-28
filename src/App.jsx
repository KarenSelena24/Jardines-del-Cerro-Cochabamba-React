import { useEffect } from 'react'
import './styles/legacy/index.css'
import './styles/legacy/A.habitaciones.css'
import './styles/legacy/B-restaurante.css'
import './styles/legacy/C-actividades.css'
import './styles/legacy/D-formulario.css'
import './App.css'
import {
  ActivitiesPage,
  BookingPage,
  HomePage,
  RestaurantPage,
  RoomsPage,
} from './pages.jsx'

const routes = {
  '/': { component: HomePage, title: 'Jardines del Cerro Hotel Boutique & Spa' },
  '/index.html': { component: HomePage, title: 'Jardines del Cerro Hotel Boutique & Spa' },
  '/habitaciones': { component: RoomsPage, title: 'Habitaciones & Suites | Jardines del Cerro' },
  '/paginas/a-habitaciones.html': { component: RoomsPage, title: 'Habitaciones & Suites | Jardines del Cerro' },
  '/restaurante': { component: RestaurantPage, title: 'Restaurante & Bar | Jardines del Cerro' },
  '/paginas/b-restaurante.html': { component: RestaurantPage, title: 'Restaurante & Bar | Jardines del Cerro' },
  '/actividades': { component: ActivitiesPage, title: 'Actividades | Jardines del Cerro' },
  '/paginas/c-actividades.html': { component: ActivitiesPage, title: 'Actividades | Jardines del Cerro' },
  '/contacto': { component: BookingPage, title: 'Contacto & Reservas | Jardines del Cerro' },
  '/paginas/d-formulario.html': { component: BookingPage, title: 'Contacto & Reservas | Jardines del Cerro' },
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '').toLowerCase() || '/'
  const { component: Page, title } = routes[path] ?? routes['/']

  useEffect(() => {
    document.title = title
  }, [title])

  return <Page />
}

export default App
