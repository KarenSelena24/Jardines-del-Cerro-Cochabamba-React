import { useEffect, useState } from 'react'

const serviceOptions = {
  hospedaje: {
    peopleLabel: 'Cantidad de Huéspedes *',
    people: [
      '1 Persona (Individual)',
      '2 Personas (Pareja / Doble)',
      '3 Personas (Familiar Corta)',
      '4 Personas (Familiar Suite)',
      '5+ Personas (Grupo)',
    ],
    scheduleLabel: 'Horario de Check-in Estimado *',
    schedules: ['Mañana (10:00 AM - 12:00 PM)', 'Tarde (14:00 PM - 18:00 PM)', 'Noche (19:00 PM - 22:00 PM)'],
  },
  restaurante: {
    peopleLabel: 'Cantidad de Comensales *',
    people: ['Mesa para 1 - 2 personas', 'Mesa para 3 - 4 personas', 'Mesa para 5 - 8 personas', 'Mesa para más de 8 personas'],
    scheduleLabel: 'Horario de Reserva *',
    schedules: ['Almuerzo Turno 1 (12:00 PM - 13:30 PM)', 'Almuerzo Turno 2 (13:30 PM - 15:00 PM)', 'Cena Turno 1 (19:00 PM - 20:30 PM)', 'Cena Turno 2 (20:30 PM - 22:00 PM)'],
  },
  piscina: {
    peopleLabel: 'Cantidad de Visitantes *',
    people: ['Pase individual (1 Persona)', 'Pase para 2 Personas', 'Pase Familiar (3 a 5 Personas)', 'Pase Grupal (Más de 5 Personas)'],
    scheduleLabel: 'Turno de Uso *',
    schedules: ['Turno Mañana (09:00 AM - 13:00 PM)', 'Turno Tarde (14:00 PM - 18:00 PM)', 'Día Completo (09:00 AM - 18:00 PM)'],
  },
  eventos: {
    peopleLabel: 'Estimación de Invitados *',
    people: ['Evento Íntimo (10 - 25 Personas)', 'Evento Mediano (25 - 50 Personas)', 'Gran Evento (50 - 100 Personas)', 'Más de 100 Personas'],
    scheduleLabel: 'Jornada del Evento *',
    schedules: ['Jornada Diurna (09:00 AM - 16:00 PM)', 'Jornada Nocturna (17:00 PM - 00:00 AM)', 'Jornada Completa (Todo el Día)'],
  },
}

const initialForm = {
  nombre: '',
  celular: '',
  email: '',
  servicio: '',
  personas: '',
  horario: '',
}

function SelectField({ id, name, label, value, options, placeholder, disabled = false, onChange }) {
  return (
    <div className="campo">
      <label htmlFor={id} className="campo__label">{label}</label>
      <select id={id} name={name} className="campo__input campo__select" value={value} required disabled={disabled} onChange={onChange}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const label = typeof option === 'string' ? option : option.label
          return <option key={value} value={value}>{label}</option>
        })}
      </select>
    </div>
  )
}

export default function BookingWidget() {
  const [form, setForm] = useState(initialForm)
  const [submission, setSubmission] = useState('closed')
  const service = serviceOptions[form.servicio]

  useEffect(() => {
    if (submission !== 'sending') return undefined
    const timeout = window.setTimeout(() => {
      setSubmission('sent')
      setForm(initialForm)
    }, 2200)
    return () => window.clearTimeout(timeout)
  }, [submission])

  useEffect(() => {
    if (submission === 'closed') return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && submission === 'sent') setSubmission('closed')
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [submission])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const updateService = (event) => {
    setForm((current) => ({ ...current, servicio: event.target.value, personas: '', horario: '' }))
  }

  const resetForm = (event) => {
    event.preventDefault()
    setForm(initialForm)
  }

  const submitForm = (event) => {
    event.preventDefault()
    setSubmission('sending')
  }

  return (
    <>
      <form className="formulario__card" onSubmit={submitForm} onReset={resetForm}>
        <fieldset className="formulario__grupo">
          <legend className="formulario__leyenda">Datos de Contacto</legend>

          <div className="formulario__grid">
            <div className="campo">
              <label htmlFor="nombre" className="campo__label">Nombre Completo *</label>
              <input id="nombre" name="nombre" className="campo__input" type="text" placeholder="Ej. Carlos Mendoza" value={form.nombre} required onChange={updateField} />
            </div>
            <div className="campo">
              <label htmlFor="celular" className="campo__label">Número de Teléfono / Celular *</label>
              <input id="celular" name="celular" className="campo__input" type="tel" placeholder="+591 70000000" value={form.celular} required onChange={updateField} />
            </div>
            <div className="campo">
              <label htmlFor="email" className="campo__label">Correo Electrónico *</label>
              <input id="email" name="email" className="campo__input" type="email" placeholder="correo@ejemplo.com" value={form.email} required onChange={updateField} />
            </div>
            <SelectField
              id="servicio"
              name="servicio"
              label="Tipo de Servicio *"
              value={form.servicio}
              placeholder="Selecciona un servicio..."
              options={[
                ['hospedaje', 'Hospedaje y Habitaciones'],
                ['restaurante', 'Restaurante y Gastronomía'],
                ['piscina', 'Uso de Piscina y Jardines'],
                ['eventos', 'Eventos Privados'],
              ].map(([value, label]) => ({ value, label }))}
              onChange={updateService}
            />
          </div>

          {service && (
            <div className="formulario__grid formulario__grid--detalles">
              <SelectField
                id="personas"
                name="personas"
                label={service.peopleLabel}
                value={form.personas}
                placeholder="Selecciona cantidad..."
                options={service.people}
                onChange={updateField}
              />
              <SelectField
                id="horario"
                name="horario"
                label={service.scheduleLabel}
                value={form.horario}
                placeholder="Selecciona un horario..."
                options={service.schedules}
                onChange={updateField}
              />
            </div>
          )}

          <div className="formulario__acciones">
            <button type="reset" className="btn btn--secundario">Limpiar</button>
            <button type="submit" className="btn btn--primario">Enviar Mensaje</button>
          </div>
        </fieldset>
      </form>

      {submission !== 'closed' && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="submission-title">
          <div className="modal-card">
            {submission === 'sending' ? (
              <div className="modal-estado" aria-live="polite">
                <div className="spinner" aria-hidden="true" />
                <h3 id="submission-title" className="modal__titulo">Enviando solicitud...</h3>
                <p className="modal__texto">Por favor espera un momento mientras procesamos tus datos.</p>
              </div>
            ) : (
              <div className="modal-estado">
                <div className="modal__icono-exito"><i className="fa-solid fa-circle-check" aria-hidden="true" /></div>
                <h3 id="submission-title" className="modal__titulo">¡Solicitud Enviada!</h3>
                <p className="modal__texto">Hemos recibido tus datos correctamente. Un asesor se comunicará contigo muy pronto.</p>
                <button type="button" className="btn btn--primario" onClick={() => setSubmission('closed')}>Aceptar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}