"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import { Clock, FileText, Edit, Save } from "lucide-react"
import Image from "next/image"

export default function PerfilPage() {
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(null)

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }

    // Simulación de carga de datos
    const fetchData = async () => {
      try {
        // Aquí se conectaría con la API real
        // const response = await fetch('/api/profile')
        // const data = await response.json()

        // Datos de ejemplo
        const mockData = {
          id: 1,
          nombre: "Juan Pérez",
          email: "juan.perez@example.com",
          telefono: "+1234567890",
          departamento: "Carga",
          cargo: "Agente de Carga",
          avatar: "/placeholder.svg?height=150&width=150",
          biografia:
            "Especialista en logística internacional con más de 5 años de experiencia en el sector. Experto en optimización de procesos de carga y documentación aduanera.",
          ranking: {
            posicionTiempo: 1,
            tiempoAhorrado: "15 días",
            posicionDocumentos: 2,
            documentosProcesados: 42,
          },
          obligaciones: [
            "Gestión de documentación de carga",
            "Coordinación con agentes de aduanas",
            "Seguimiento de procesos de importación",
            "Optimización de tiempos de entrega",
          ],
        }

        setProfile(mockData)
        setEditedProfile(mockData)
        setIsLoadingData(false)
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
        setIsLoadingData(false)
      }
    }

    if (!isLoading && user) {
      fetchData()
    }
  }, [isLoading, user])

  const handleSaveProfile = () => {
    // Aquí se implementaría la lógica para guardar los cambios en el servidor
    console.log("Perfil actualizado:", editedProfile)

    // Simulación de guardado exitoso
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    })
  }

  if (isLoading || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Perfil no encontrado</h2>
        <p className="text-gray-500 mt-2">No se pudo cargar la información del perfil.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <button
          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isEditing ? (
            <>
              <Save size={18} />
              <span>Guardar</span>
            </>
          ) : (
            <>
              <Edit size={18} />
              <span>Editar</span>
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Información personal */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 text-center">
              <div className="mb-4 mx-auto relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.nombre}
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={editedProfile.nombre}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={editedProfile.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{profile.nombre}</h2>
                  <p className="text-gray-500">{profile.cargo}</p>
                  <p className="text-gray-500">{profile.departamento}</p>

                  <div className="mt-4 space-y-2">
                    <p className="flex items-center justify-center gap-2">
                      <span className="text-gray-500">Email:</span>
                      <span>{profile.email}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <span className="text-gray-500">Teléfono:</span>
                      <span>{profile.telefono}</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mi Ranking */}
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="bg-blue-500 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">Mi Ranking</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock size={20} className="text-blue-500 mr-1" />
                    <span className="font-medium">Tiempo Ahorrado</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">{profile.ranking.tiempoAhorrado}</p>
                  <p className="text-sm text-gray-500">Posición #{profile.ranking.posicionTiempo}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FileText size={20} className="text-green-500 mr-1" />
                    <span className="font-medium">Documentos</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">{profile.ranking.documentosProcesados}</p>
                  <p className="text-sm text-gray-500">Posición #{profile.ranking.posicionDocumentos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biografía y Obligaciones */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h2 className="text-lg font-semibold">Biografía</h2>
            </div>
            <div className="p-6">
              {isEditing ? (
                <textarea
                  name="biografia"
                  value={editedProfile.biografia}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-700">{profile.biografia}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h2 className="text-lg font-semibold">Obligaciones</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-2">
                {profile.obligaciones.map((obligacion, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 mt-1 mr-3"></div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.obligaciones[index]}
                        onChange={(e) => {
                          const newObligaciones = [...editedProfile.obligaciones]
                          newObligaciones[index] = e.target.value
                          setEditedProfile({
                            ...editedProfile,
                            obligaciones: newObligaciones,
                          })
                        }}
                        className="flex-grow px-3 py-1 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <span>{obligacion}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
