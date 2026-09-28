import { useEffect, useRef, useState } from 'react'
import { hotelAsset } from './hotelAsset.js'

const navigationItems = [
  { href: '/habitaciones', label: 'Habitaciones & Suites' },
  { href: '/restaurante', label: 'Restaurante & Bar' },
  { href: '/actividades', label: 'Piscina, Sauna & Tours' },
  { href: '/contacto', label: 'Contacto & Ubicación' },
]

export function SiteHeader({ home = false, children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className={home ? 'header-container' : 'header-simple'}>
      <nav className="nav" aria-label="Navegación principal">
        <div className="nav__logo">
          <a href="/" aria-label="Ir a la página de inicio de Jardines del Cerro">
            <img src={hotelAsset('Artboard 1.png')} alt="Logotipo oficial de Hotel Jardines del Cerro" width="80" height="80" />
          </a>
        </div>

        <div className="nav__acciones">
          <details className="nav__menu" ref={menuRef} open={menuOpen}>
            <summary
              className="nav__boton---mov1"
              aria-haspopup="true"
              aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              onClick={(event) => {
                event.preventDefault()
                setMenuOpen((open) => !open)
              }}
            >
              Menú
            </summary>
            <div className="nav__dialogo--contenedor" role="region" aria-label="Opciones del menú">
              <ul className="nav__dialogo--lista">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <a
            href="https://wa.me/59112345678?text=Hola,%20deseo%20consultar%20disponibilidad%20de%20habitaciones"
            target="_blank"
            rel="noopener noreferrer"
            className="btn--whatsapp-header"
            aria-label="Consultar disponibilidad por WhatsApp"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp
          </a>
          <a href="/contacto" className="nav__boton---mov2" aria-label="Ir al formulario de reserva">Reservar</a>
        </div>
      </nav>
      {children}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="nav3">
      <section className="nav3__contacto">
        <h3>Atención e Informes</h3>
        <p className="footer__direccion">
          <i className="fa-solid fa-location-dot" aria-hidden="true" /> <strong>Dirección:</strong> Urbanización Irlandés, Pasaje Jacaranda #30, Cochabamba, Bolivia.<br />
          <i className="fa-solid fa-clock" aria-hidden="true" /> <strong>Recepción:</strong> Atención las 24 horas.<br />
          <i className="fa-solid fa-envelope" aria-hidden="true" /> <strong>Email:</strong> reservas@jardinesdelcerro.com
        </p>
        <a href="/contacto" className="nav3__boton--reserva" aria-label="Ir al formulario para solicitar una reserva">Reservar Estancia</a>
      </section>

      <section className="nav3__redes">
        <img className="nav3__redes--img" src={hotelAsset('Artboard 1.png')} alt="Logotipo oficial de Jardines del Cerro Hotel Boutique" width="100" height="100" />
        <h2>Jardines del Cerro</h2>
        <p className="footer__subtitulo">Hotel Boutique & Spa · Cochabamba</p>
        <div className="nav3__social-icons">
          <a href="tel:+59112345678" aria-label="Llamar por teléfono al hotel"><i className="fa-solid fa-square-phone" aria-hidden="true" /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Facebook oficial"><i className="fa-brands fa-square-facebook" aria-hidden="true" /></a>
          <a href="https://wa.me/59112345678" target="_blank" rel="noopener noreferrer" aria-label="Escribir al WhatsApp del hotel"><i className="fa-brands fa-square-whatsapp" aria-hidden="true" /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Instagram oficial"><i className="fa-brands fa-square-instagram" aria-hidden="true" /></a>
        </div>
        <p className="copyright">&copy; 2026 Jardines del Cerro Hotel Boutique. Todos los derechos reservados.</p>
      </section>
    </footer>
  )
}

export function AmenityIcon({ icon, children }) {
  return (
    <span className="amenity-icon">
      <i className={icon} aria-hidden="true" />
      {children}
    </span>
  )
}

export function CatalogCard({ prefix, image, alt, badge, title, description, action, href = '/contacto' }) {
  return (
    <article className={prefix}>
      <div className={`${prefix}__media`}>
        <img src={hotelAsset(image)} alt={alt} className={`${prefix}__img`} loading="lazy" />
        <span className={`${prefix}__etiqueta`}>{badge}</span>
      </div>
      <div className={`${prefix}__cuerpo`}>
        <h2 className={`${prefix}__titulo`}>{title}</h2>
        <p className={`${prefix}__texto`}>{description}</p>
        <a href={href} className={`${prefix}__btn`}>{action}</a>
      </div>
    </article>
  )
}

export function RoomCard({ room }) {
  return <CatalogCard prefix="tarjeta-habitacion" {...room} />
}

export function TabbedPanel({ tabs, label }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)
  const selectedTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  return (
    <div className="tabbed-panel">
      <div className="tabbed-panel__tabs" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            className="tabbed-panel__tab"
            aria-selected={activeTab === tab.id}
            aria-controls="experience-panel"
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id="experience-panel" className="tabbed-panel__content" role="tabpanel" aria-labelledby={`tab-${selectedTab.id}`}>
        {selectedTab.content}
      </div>
    </div>
  )
}