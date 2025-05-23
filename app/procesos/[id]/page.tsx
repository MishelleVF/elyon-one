"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProcessDetail from "@/components/ProcessDetail"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import Link from "next/link"
import { FileText } from "lucide-react"

export default function ProcessDetailPage() {
  const { id } = useParams()
  const { user, isLoading } = useAuth()
  const [process, setProcess] = useState(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }

    // Simulación de carga de datos
    const fetchData = async () => {
      try {
        // Aquí se conectaría con la API real
        // const response = await fetch(`/api/processes/${id}`)
        // const data = await response.json()

        // Datos de ejemplo
        const mockData = {
          id: id,
          clientId: "C123",
          estado: "En proceso",
          fechaInicio: "2023-05-01",
          etapas: [
            {
              departamento: "Carga",
              trabajador: "Juan Pérez",
              descripcion: "Recepción de mercancía",
              tarea: "Completado",
              tiempoAhorrado: "1 día",
            },
            {
              departamento: "Carga",
              trabajador: "María López",
              descripcion: "Verificación de documentos",
              tarea: "Completado",
              tiempoAhorrado: "0.5 días",
            },
            {
              departamento: "Aduanas",
              trabajador: "Carlos Rodríguez",
              descripcion: "Trámite aduanero",
              tarea: "En proceso",
              tiempoAhorrado: "0 días",
            },
            {
              departamento: "Aduanas",
              trabajador: "Ana Martínez",
              descripcion: "Liberación de mercancía",
              tarea: "Pendiente",
              tiempoAhorrado: "0 días",
            },
          ],
        }

        setProcess(mockData)
        setIsLoadingData(false)
      } catch (error) {
        console.error(`Error al cargar el proceso ${id}:`, error)
        setIsLoadingData(false)
      }
    }

    if (!isLoading && user) {
      fetchData()
    }
  }, [id, isLoading, user])

  if (isLoading || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!process) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Proceso no encontrado</h2>
        <p className="text-gray-500 mt-2">El proceso que estás buscando no existe o no tienes permisos para verlo.</p>
        <Link href="/historial" className="mt-4 inline-block text-blue-500 hover:underline">
          Volver al historial
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Detalle del Proceso {process.id}</h1>
          <p className="text-gray-500">
            Cliente: {process.clientId} | Estado: {process.estado}
          </p>
        </div>
        <Link
          href={`/procesos/${id}/documentos`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FileText size={18} />
          <span>Documentos</span>
        </Link>
      </div>

      <ProcessDetail process={process} />
    </div>
  )
}
