import { useEffect, useState } from 'react'

import { getPets } from './services/petService'

const API = 'http://localhost:3000/api/mascotas'

const initialForm = {
  nombre: '',
  especie: '',
  raza: '',
  edad: '',
  foto: '',
  esSano: true,
}

function App() {

  // =========================================================
  // 1. ESTADOS
  // =========================================================

  // Lista de mascotas obtenida desde el API
  const [pets, setPets] = useState([])

  // Estado para saber si estamos cargando
  const [loading, setLoading] = useState(true)

  // Estado para mostrar/ocultar el formulario
  const [showForm, setShowForm] = useState(false)

  // Estado para saber si estamos editando
  // null = nueva mascota
  // valor = mascota que estamos editando
  const [editingId, setEditingId] = useState(null)

  // Datos del formulario
  const [formData, setFormData] = useState(initialForm)

  // Mensaje informativo
  const [message, setMessage] = useState('')


  // =========================================================
  // 2. CARGAR MASCOTAS
  // =========================================================

  async function loadPets() {
    setLoading(true)
    setMessage('')
    try {
      const data = await getPets()
      setPets(data)
    } catch (error) {
      console.error(error)
      setPets([])
      setMessage(
        'Verifica que el servidor esté ejecutándose en localhost:3000.'
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================================================
  // 3. CARGAR MASCOTAS AL INICIAR REACT
  // =========================================================

  useEffect(() => {
    loadPets()
  }, [])


  // =========================================================
  // 4. MOSTRAR NUEVO FORMULARIO
  // =========================================================

  function handleNewPet() {
    // Limpiamos formulario
    setFormData(initialForm)
    // No estamos editando ninguna mascota
    setEditingId(null)
    // Mostramos formulario
    setShowForm(true)
    // Limpiamos mensaje
    setMessage('')
  }


  // =========================================================
  // 5. CANCELAR FORMULARIO
  // =========================================================

  function handleCancel() {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialForm)
  }

  // =========================================================
  // 6. ACTUALIZAR CAMPOS DEL FORMULARIO
  // =========================================================

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox'
        ? checked
        : value,
    }))
  }

  // =========================================================
  // 7. GUARDAR / ACTUALIZAR MASCOTA
  // =========================================================

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      // Convertimos edad de texto a número
      const data = {
        ...formData,
        edad: Number(formData.edad),
      }

      // Si hay editingId -> PUT
      // Si no hay editingId -> POST
      const response = await fetch(
        editingId
          ? `${API}/${editingId}`
          : API,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      if (!response.ok) {
        throw new Error('No se pudo guardar la mascota')
      }
      // Ocultamos formulario
      setShowForm(false)
      // Limpiamos estado edición
      setEditingId(null)
      // Limpiamos formulario
      setFormData(initialForm)
      // Mostramos mensaje
      setMessage('Mascota guardada correctamente.')
      // Recargamos lista
      await loadPets()
    } catch (error) {
      console.error(error)
      setMessage('No se pudo guardar la mascota.')
    }
  }


  // =========================================================
  // 8. EDITAR MASCOTA
  // =========================================================
  async function handleEdit(id) {
    try {
      const response = await fetch(`${API}/${id}`)
      if (!response.ok) {
        throw new Error('No se pudo cargar la mascota')
      }
      const pet = await response.json()
      // Guardamos ID de la mascota que estamos editando
      setEditingId(id)
      // Cargamos los datos en el formulario
      setFormData({
        nombre: pet.nombre ?? '',
        especie: pet.especie ?? '',
        raza: pet.raza ?? '',
        edad: pet.edad ?? '',
        foto: pet.foto ?? '',
        esSano: !!pet.esSano,
      })
      // Mostramos formulario
      setShowForm(true)
      // Limpiamos mensaje
      setMessage('')
    } catch (error) {
      console.error(error)
      setMessage('No se pudo cargar la mascota.')
    }
  }

  // =========================================================
  // 9. ELIMINAR MASCOTA
  // =========================================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      '¿Eliminar esta mascota?'
    )
    if (!confirmed) {
      return
    }
    try {
      const response = await fetch(
        `${API}/${id}`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        throw new Error('No se pudo eliminar la mascota')
      }
      setMessage('Mascota eliminada.')
      await loadPets()
    } catch (error) {
      console.error(error)
      setMessage('No se pudo eliminar la mascota.')
    }
  }

  // =========================================================
  // 10. OBTENER ID DE MASCOTA
  // =========================================================

  function getPetId(pet) {
    return pet._id || pet.id
  }


  // =========================================================
  // 11. RENDERIZADO
  // =========================================================
  return (
    <main className="container py-4">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header
        className="
          d-flex
          flex-column
          flex-md-row
          justify-content-between
          align-items-md-center
          gap-3
          mb-4
        "
      >
        <div>
          <h1 className="mb-1">
            Listado de mascotas
          </h1>
          <p className="text-body-secondary mb-0">
            Administra las mascotas registradas en PetMatch.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNewPet}
        >
          + Nueva mascota
        </button>
      </header>


      {/* =====================================================
          CARD PRINCIPAL
      ===================================================== */}
      <section className="card shadow-sm">

        {/* =================================================
            FORMULARIO
        ================================================= */}
        {showForm && (

          <form
            className="row g-3 p-4 border-bottom"
            onSubmit={handleSubmit}
          >

            {/* Nombre */}

            <div className="col-md-6">

              <label
                htmlFor="nombre"
                className="form-label"
              >
                Nombre
              </label>

              <input
                id="nombre"
                name="nombre"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

            </div>


            {/* Especie */}
            <div className="col-md-6">
              <label
                htmlFor="especie"
                className="form-label"
              >
                Especie
              </label>
              <input
                id="especie"
                name="especie"
                className="form-control"
                value={formData.especie}
                onChange={handleChange}
                required
              />
            </div>

            {/* Raza */}
            <div className="col-md-6">
              <label
                htmlFor="raza"
                className="form-label"
              >
                Raza
              </label>
              <input
                id="raza"
                name="raza"
                className="form-control"
                value={formData.raza}
                onChange={handleChange}
                required
              />
            </div>

            {/* Edad */}
            <div className="col-md-6">
              <label
                htmlFor="edad"
                className="form-label"
              >
                Edad
              </label>
              <input
                id="edad"
                name="edad"
                className="form-control"
                type="number"
                min="0"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>


            {/* Foto */}
            <div className="col-12">
              <label
                htmlFor="foto"
                className="form-label"
              >
                URL de foto
              </label>
              <input
                id="foto"
                name="foto"
                className="form-control"
                type="url"
                placeholder="https://..."
                value={formData.foto}
                onChange={handleChange}
              />
            </div>

            {/* Estado saludable */}
            <div className="col-12 form-check">
              <input
                id="esSano"
                name="esSano"
                className="form-check-input"
                type="checkbox"
                checked={formData.esSano}
                onChange={handleChange}
              />
              <label
                htmlFor="esSano"
                className="form-check-label"
              >
                Está sano
              </label>
            </div>

            {/* Botones */}
            <div className="col-12 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-success"
              >
                {editingId
                  ? 'Actualizar'
                  : 'Guardar'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}


        {/* =================================================
            MENSAJE
        ================================================= */}

        {message && (
          <div
            className="alert alert-info mx-4 mt-4"
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        {/* =================================================
            TABLA
        ================================================= */}
        <div className="table-responsive">
          <table
            className="
              table
              table-striped
              table-hover
              align-middle
              mb-0
            "
          >
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Cargando */}
              {loading && (
                <tr>
                  <td
                    colSpan="7"
                    className="
                      text-center
                      text-body-secondary
                      py-4
                    "
                  >
                    Cargando mascotas...
                  </td>
                </tr>
              )}

              {/* Sin mascotas */}
              {!loading && pets.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="
                      text-center
                      text-body-secondary
                      py-4
                    "
                  >
                    No hay mascotas registradas.
                  </td>
                </tr>
              )}

              {/* Mascotas */}
              {!loading && pets.map((pet) => {
                const id = getPetId(pet)
                return (
                  <tr key={id}>
                    {/* Foto */}
                    <td>
                      {pet.foto && (
                        <img
                          className="img-fluid rounded"
                          style={{
                            width: '4rem',
                            height: '4rem',
                            objectFit: 'cover',
                          }}
                          src={pet.foto}
                          alt={`Foto de ${pet.nombre}`}
                          onError={(event) => {
                            event.currentTarget.style.visibility =
                              'hidden'
                          }}
                        />
                      )}
                    </td>
                    {/* Nombre */}
                    <td>
                      {pet.nombre}
                    </td>
                    {/* Especie */}
                    <td>
                      {pet.especie}
                    </td>
                    {/* Raza */}
                    <td>
                      {pet.raza}
                    </td>
                    {/* Edad */}
                    <td>
                      {pet.edad}
                    </td>
                    {/* Estado */}
                    <td>
                      <span
                        className={
                          pet.esSano
                            ? 'badge text-bg-success'
                            : 'badge text-bg-warning'
                        }
                      >
                        {pet.esSano
                          ? 'Sano'
                          : 'Necesita atención'}
                      </span>
                    </td>
                    {/* Acciones */}
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="
                            btn
                            btn-sm
                            btn-outline-primary
                          "
                          onClick={() => handleEdit(id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="
                            btn
                            btn-sm
                            btn-outline-danger
                          "
                          onClick={() => handleDelete(id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>

  )
}

export default App