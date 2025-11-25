import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    destinatario: '',
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStatus({ type: 'success', message: 'Email enviado correctamente!' })
        setFormData({ destinatario: '', nombre: '', email: '', mensaje: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Error al enviar' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión con el servidor' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Formulario de Contacto</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destinatario">Para (Email destinatario)</label>
          <input
            type="email"
            id="destinatario"
            name="destinatario"
            value={formData.destinatario}
            onChange={handleChange}
            required
            placeholder="destino@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            placeholder="Escribe tu mensaje..."
            rows="5"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>

      {status.message && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  )
}

export default App
