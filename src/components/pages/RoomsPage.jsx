import RoomCard from '../RoomCard.jsx'
import SiteFooter from '../SiteFooter.jsx'
import SiteHeader from '../SiteHeader.jsx'
import SubpageHeading from '../SubpageHeading.jsx'

const rooms = [
  {
    image: 'habitacion doble 2.jpg',
    alt: 'Habitación Simple con cama individual y escritorio',
    badge: 'Individual',
    title: 'Habitación Simple',
    description: 'Cama individual, baño privado con artículos de tocador, escritorio de trabajo, aire acondicionado y WiFi de alta velocidad.',
    action: 'Reservar esta habitación',
  },
  {
    image: 'habitacion doble.jpg',
    alt: 'Habitación Estándar con cama matrimonial y balcón',
    badge: 'Popular',
    title: 'Habitación Estándar',
    description: 'Cama Queen Size, baño privado, balcón panorámico a la montaña, minibar equipado y Smart TV.',
    action: 'Reservar esta habitación',
  },
  {
    image: 'habitacion 3.jpg',
    alt: 'Suite Deluxe con cama King y jacuzzi',
    badge: 'Premium',
    title: 'Suite Deluxe',
    description: 'Cama King Size, área de estar privada, jacuzzi, balcón con vista panorámica a la ciudad y amenidades premium.',
    action: 'Reservar esta habitación',
  },
]

export default function RoomsPage() {
  return (
    <>
      <SiteHeader />
      <main className="contenedor-habitaciones">
        <section className="habitaciones-seccion" aria-labelledby="habitaciones-titulo">
          <SubpageHeading tagline="ALOJAMIENTO & CONFORT" title="Nuestras Habitaciones" description="Espacios diseñados para tu máximo confort, tranquilidad y descanso en la montaña." />
          <div className="habitaciones__grid" aria-label="Catálogo de habitaciones disponible">
            {rooms.map((room) => <RoomCard key={room.title} room={room} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}