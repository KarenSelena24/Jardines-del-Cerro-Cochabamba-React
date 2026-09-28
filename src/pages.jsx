import { useEffect, useState } from 'react'
import BookingWidget from './BookingWidget.jsx'
import { hotelAsset } from './hotelAsset.js'
import {
  AmenityIcon,
  CatalogCard,
  RoomCard,
  SiteFooter,
  SiteHeader,
  TabbedPanel,
} from './components.jsx'

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

const restaurantDishes = [
  {
    image: 'comida uno.png',
    alt: 'Plato especial gourmet elaborado con ingredientes orgánicos',
    badge: 'Especialidad',
    title: 'Platos Gourmet',
    description: 'Preparaciones exclusivas del chef con carnes seleccionadas e ingredientes frescos de la región.',
    action: 'Reservar Mesa',
  },
  {
    image: 'foto pizza.png',
    alt: 'Pizza artesanal recién horneada a la leña',
    badge: 'Artesanal',
    title: 'Pizzas a la Leña',
    description: 'Masas de fermentación lenta, queso fundido de primera calidad e ingredientes tradicionales.',
    action: 'Reservar Mesa',
  },
  {
    image: 'foto helado.png',
    alt: 'Helados y postres artesanales de la casa',
    badge: 'Postres',
    title: 'Helados & Dulces',
    description: 'Postres de autor y helados elaborados en casa para cerrar tu cena con el toque dulce perfecto.',
    action: 'Reservar Mesa',
  },
]

const activities = [
  {
    image: 'a piscina.png',
    alt: 'Piscina climatizada al aire libre con vista panorámica',
    badge: 'Relajación',
    title: 'Piscina Climatizada',
    description: 'Disfruta de nuestra piscina al aire libre con temperatura regulada, ideal para nadar y descansar con vistas panorámicas a la montaña.',
    action: 'Consultar Horarios',
  },
  {
    image: 'a jardin.png',
    alt: 'Jardines y áreas verdes rodeados de vegetación',
    badge: 'Naturaleza',
    title: 'Jardines & Senderos',
    description: 'Recorre nuestras amplias zonas verdes, diseñadas para caminatas matutinas, lectura relajante y desconexión total.',
    action: 'Más Información',
  },
  {
    image: 'Captura de pantalla 2025-06-05 082846.png',
    alt: 'Ambientes comunes y zonas lounge acogedoras',
    badge: 'Confort',
    title: 'Ambientes Exclusivos',
    description: 'Áreas lounge, miradores privados y salones de estar totalmente acogedores para tus momentos de tranquilidad en grupo o pareja.',
    action: 'Más Información',
  },
]

const homeSections = [
  {
    id: 'titulo-habitaciones',
    badge: 'Hospedaje de Lujo',
    title: '8 Exclusivas Habitaciones y Suites',
    description: <>Elige entre nuestras categorías <strong>Deluxe, Suites y Junior Suites</strong>. Todas nuestras habitaciones ofrecen vista a la montaña, aire acondicionado, TV Smart, caja fuerte, minibar, escritorio de trabajo y baño privado con artículos de tocador gratuitos y secador de pelo.</>,
    photos: [
      ['habitacion 1.jpg', 'Suite de lujo con vistas panorámicas'],
      ['habitacion 2.jpg', 'Habitación Deluxe equipada'],
      ['habitacion 3.jpg', 'Junior Suite con baño privado y amenities'],
    ],
    features: ['Vistas panorámicas a la montaña', 'TV Smart y WiFi de alta velocidad', 'Climatización frío/calor'],
    href: '/habitaciones',
    link: 'Ver categorías y fotos',
  },
  {
    id: 'titulo-restaurante',
    badge: 'Gastronomía & Bar',
    title: 'Restaurante, Terraza Bar & Parrilla',
    description: <>Comienza tus mañanas con nuestro <strong>desayuno buffet diario incluido</strong> (servido de 7:30 a 10:00). Deléitate con platillos internacionales y cocina local elaborados con ingredientes orgánicos. Por las tardes, relájate en nuestro bar o disfruta de la zona de parrillas (BBQ) al aire libre.</>,
    photos: [
      ['comida uno.png', 'Desayuno buffet diario e ingredientes orgánicos'],
      ['foto helado.png', 'Postres y cafetería artesanal'],
      ['comida tres.png', 'Bar de cócteles y área de parrilla BBQ'],
    ],
    features: ['Desayuno buffet incluido', 'Opciones vegetarianas e ingredientes orgánicos', 'Cócteles de autor y zona BBQ en terraza'],
    href: '/restaurante',
    link: 'Ver menú y horarios',
    inverse: true,
  },
  {
    id: 'titulo-actividades',
    badge: 'Bienestar & Entorno',
    title: 'Piscina, Sauna y Tours Guiados',
    description: <>Renueva energías en nuestra <strong>piscina al aire libre</strong> y relájate en el <strong>sauna</strong>. Nos encontramos ubicados en una zona residencial privilegiada, a solo <strong>3 minutos a pie del Jardín Botánico Martín Cárdenas</strong>. Además, organizamos recorridos ecológicos y culturales por Cochabamba.</>,
    photos: [
      ['a piscina.png', 'Piscina al aire libre en Cochabamba'],
      ['Captura de pantalla 2025-06-05 082846.png', 'Sauna y área de relax del hotel'],
      ['a jardin.png', 'Proximidad al Jardín Botánico Martín Cárdenas'],
    ],
    features: ['Piscina exterior y área de solárium', 'Servicio de sauna para huéspedes', 'Ubicación estratégica cerca de atractivos turísticos'],
    href: '/actividades',
    link: 'Ver servicios de relax',
  },
]

function PageFrame({ children, home = false }) {
  return (
    <>
      {children}
      {!home && <SiteFooter />}
    </>
  )
}

function SubpageHeading({ tagline, title, description }) {
  return (
    <div className="subpage-heading">
      <p className="subpage-heading__tagline">{tagline}</p>
      <h1 className="subpage-heading__title">{title}</h1>
      <p className="subpage-heading__description">{description}</p>
    </div>
  )
}

function HomeFeature({ section }) {
  return (
    <section className={`seccion__grid${section.inverse ? ' seccion__grid--inverso' : ''}`} aria-labelledby={section.id}>
      <div className="seccion__gridfotos">
        {section.photos.map(([image, alt]) => (
          <img key={image} className="seccion__gridfotos--imagen" src={hotelAsset(image)} alt={alt} loading="lazy" />
        ))}
      </div>
      <div className="seccion__gridparrafo">
        <span className="badge-seccion">{section.badge}</span>
        <h2 id={section.id} className="seccion__gridparrafo--titulo">{section.title}</h2>
        <p className="seccion__gridparrafo--texto">{section.description}</p>
        <ul className="lista-caracteristicas">
          {section.features.map((feature) => (
            <li key={feature}><AmenityIcon icon="fa-solid fa-check">{feature}</AmenityIcon></li>
          ))}
        </ul>
        <a className="seccion__gridparrafo--enlace" href={section.href}>{section.link} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
      </div>
    </section>
  )
}

export function HomePage() {
  const [preloaderHidden, setPreloaderHidden] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setPreloaderHidden(true), 900)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div className="page-home">
      <div className={`preloader${preloaderHidden ? ' preloader--oculto' : ''}`} aria-hidden={preloaderHidden}>
        <div className="preloader__contenido">
          <img src={hotelAsset('Artboard 1.png')} alt="Cargando Jardines del Cerro" className="preloader__logo" width="120" height="120" />
          <div className="preloader__spinner" />
          <p className="preloader__texto">Cargando experiencia...</p>
        </div>
      </div>

      <SiteHeader home>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="hero__tagline">HOTEL BOUTIQUE & SPA · COCHABAMBA, BOLIVIA</p>
            <h1 id="hero-title" className="hero__title">Jardines del Cerro Hotel Boutique</h1>
            <p className="hero__description">Tu refugio de descanso en Cochabamba. Disfruta de confort exclusivo, piscina, sauna, desayuno buffet y vistas panorámicas a solo 3 minutos a pie del Jardín Botánico Martín Cárdenas.</p>
            <div className="hero__badges">
              <AmenityIcon icon="fa-solid fa-wifi">WiFi Gratis</AmenityIcon>
              <AmenityIcon icon="fa-solid fa-utensils">Desayuno Incluido</AmenityIcon>
              <AmenityIcon icon="fa-solid fa-square-parking">Estacionamiento Seguro</AmenityIcon>
              <AmenityIcon icon="fa-solid fa-clock">Recepción 24/7</AmenityIcon>
            </div>
            <div className="hero__actions">
              <a href="/contacto" className="btn btn--primario" aria-label="Reservar estancia en Cochabamba">Ver Disponibilidad y Tarifas</a>
              <a href="https://wa.me/59112345678?text=Hola,%20quisiera%20más%20información%20sobre%20el%20hotel" target="_blank" rel="noopener noreferrer" className="btn btn--secundario" aria-label="Contactar por WhatsApp">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp Directo
              </a>
            </div>
          </div>
        </section>
      </SiteHeader>

      <main className="seccion">
        <section className="seccion__ScrollFotos" aria-label="Galería fotográfica de nuestras instalaciones">
          <div className="seccion__ScrollFotos--header">
            <h2>Conoce Nuestras Instalaciones</h2>
            <a href="/habitaciones" className="enlace-galeria">Ver galería completa <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
          </div>
          <div className="seccion__ScrollFotos--track">
            {[
              ['habitacion 1.jpg', 'Habitación Suite con vista a la montaña en Cochabamba'],
              ['habitacion 2.jpg', 'Habitación Deluxe con cama King y aire acondicionado'],
              ['habitacion 3.jpg', 'Junior Suite equipada con TV Smart y minibar'],
              ['a piscina.png', 'Piscina al aire libre en Jardines del Cerro'],
              ['a jardin.png', 'Jardines y área de relax cerca del Jardín Botánico'],
              ['foto pizza.png', 'Gastronomía local e internacional en el restaurante'],
              ['comida uno.png', 'Plato gourmet preparado con ingredientes orgánicos'],
              ['comida tres.png', 'Cócteles y bebidas en la terraza bar con parrilla'],
            ].map(([image, alt]) => <img key={image} className="seccion__Scrollfotos--imagen" src={hotelAsset(image)} alt={alt} loading="lazy" />)}
          </div>
        </section>

        <section className="seccion__nosotros" aria-label="Bienvenida a Jardines del Cerro">
          <p className="seccion__nosotros--mensaje">Bienvenido a <span>Jardines del Cerro Hotel Boutique</span>. Te invitamos a desconectar de la rutina urbana y disfrutar de una estancia de lujo con atención personalizada en la mejor zona residencial de Cochabamba, Bolivia.</p>
        </section>

        {homeSections.map((section) => <HomeFeature key={section.id} section={section} />)}

        <section className="banner-cta" aria-label="Llamado a la acción para reservar">
          <h2>¿Listo para tu escapada a Cochabamba?</h2>
          <p>Garantiza el mejor precio reservando directamente con nosotros. Wifi gratis, desayuno buffet e impuestos incluidos.</p>
          <div className="banner-cta__botones">
            <a href="/contacto" className="btn btn--primario">Consultar Disponibilidad</a>
            <a href="https://wa.me/59112345678?text=Deseo%20reservar%20una%20habitación" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
              <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Reservar por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export function RoomsPage() {
  return (
    <PageFrame>
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
    </PageFrame>
  )
}

function ExperienceFeature({ image, alt, badge, title, description, action = 'Consultar disponibilidad' }) {
  return (
    <article className="experience-feature">
      <img src={hotelAsset(image)} alt={alt} loading="lazy" />
      <div>
        <span className="tarjeta-platillo__etiqueta">{badge}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href="/contacto" className="seccion__gridparrafo--enlace">{action} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
      </div>
    </article>
  )
}

export function RestaurantPage() {
  const tabs = [
    {
      id: 'restaurante',
      label: 'Restaurante',
      content: <div className="restaurante__grid">{restaurantDishes.map((dish) => <CatalogCard key={dish.title} prefix="tarjeta-platillo" {...dish} />)}</div>,
    },
    {
      id: 'bar',
      label: 'Bar',
      content: <ExperienceFeature image="comida tres.png" alt="Cócteles de autor en la terraza bar" badge="Terraza Bar" title="Cócteles de autor" description="Por las tardes, relájate en nuestro bar y disfruta de bebidas y cócteles en la terraza del hotel." />,
    },
    {
      id: 'parrilla',
      label: 'Parrilla',
      content: <ExperienceFeature image="foto cena.png" alt="Cena y parrilla en la terraza del hotel" badge="BBQ" title="Parrilla al aire libre" description="Disfruta de la zona de parrillas al aire libre, junto a nuestra terraza y espacios para compartir." />,
    },
    {
      id: 'piscina',
      label: 'Piscina',
      content: <ExperienceFeature image="a piscina.png" alt="Piscina al aire libre en Jardines del Cerro" badge="Bienestar" title="Piscina al aire libre" description="Renueva energías en la piscina exterior y consulta los horarios de uso para huéspedes y visitantes." action="Consultar horarios" />,
    },
  ]

  return (
    <>
      <SiteHeader />
      <main className="contenedor-restaurante">
        <section className="restaurante-seccion" aria-labelledby="restaurante-titulo">
          <SubpageHeading tagline="GASTRONOMÍA & SABORES" title="Nuestro Restaurante" description="Una experiencia culinaria única que combina ingredientes locales, sazón artesanal y una vista inolvidable." />
          <TabbedPanel tabs={tabs} label="Restaurante, bar, parrilla y piscina" />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

export function ActivitiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="contenedor-actividades">
        <section className="actividades-seccion" aria-labelledby="actividades-titulo">
          <SubpageHeading tagline="EXPERIENCIAS & RECREACIÓN" title="Nuestras Actividades" description="Descubre los mejores espacios de relajación, naturaleza y esparcimiento diseñados para enriquecer tu estadía." />
          <div className="actividades__grid" aria-label="Catálogo de actividades e instalaciones">
            {activities.map((activity) => <CatalogCard key={activity.title} prefix="tarjeta-actividad" {...activity} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

export function BookingPage() {
  return (
    <>
      <SiteHeader />
      <main className="contenedor-formulario">
        <section className="formulario-seccion" aria-labelledby="formulario-titulo">
          <SubpageHeading tagline="RESERVAS & CONSULTAS" title="Solicitud de Servicio" description="Ingresa tus datos a continuación para ponernos en contacto contigo a la brevedad y confirmar tu solicitud." />
          <BookingWidget />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}