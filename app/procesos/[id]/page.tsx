'use client'

import { useEffect, useState } from 'react'
import { useParams, redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import ProcessDetail from '@/components/ProcessDetail'

export default function ProcessDetailPage() {
  const { id } = useParams()
  const { user, isLoading } = useAuth()
  const [process, setProcess] = useState(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      redirect('/login')
    }

    const fetchData = async () => {
      try {
        // Aquí iría tu llamada real a la API:
        // const res = await fetch(`/api/processes/${id}`)
        // const data = await res.json()

        // Mock para desarrollo:
        const mockData = {
          id,
          clientId: 'C123',
          estado: 'En proceso',
          fechaInicio: '2023-05-01',
          etapas: [
            {
              paso: 1,
              departamento: 'Cliente',
              trabajador: 'Luis García',
              descripcion: 'Envía correo informativo al área de Pricing aprobando cotización',
              tarea: 'Completado',
              tiempoAhorrado: '1 hora',
            },
            {
              paso: 2,
              departamento: 'Pricing',
              trabajador: 'Mariana Torres',
              descripcion: 'Envía correo a Operaciones notificando nuevo despacho',
              tarea: 'Completado',
              tiempoAhorrado: '0.5 días',
            },
            {
              paso: 3,
              departamento: 'Carga',
              trabajador: 'José Navarro',
              descripcion: 'Apertura de Orden de Servicio de Carga y solicitud de documentos',
              tarea: 'Completado',
              tiempoAhorrado: '1 día',
            },
            {
              paso: 4,
              departamento: 'Carga',
              trabajador: 'Ana Ruiz',
              descripcion: 'Envía asignación a Aduanas con documentos',
              tarea: 'Atrasado',
              tiempoAhorrado: '0 días',
            },
            {
              paso: 5,
              departamento: 'Aduanas',
              trabajador: 'Carlos Mendoza',
              descripcion: 'Apertura de Orden de Servicio de Aduanas',
              tarea: 'Completado',
              tiempoAhorrado: '2 horas',
            },
            {
              paso: 6,
              departamento: 'Aduanas',
              trabajador: 'Patricia Gómez',
              descripcion: 'Revisión de documentos y envío a liquidador',
              tarea: 'En proceso',
              tiempoAhorrado: '0.5 días',
            },
            {
              paso: 7,
              departamento: 'Liquidador',
              trabajador: 'Mario Paredes',
              descripcion: 'Revisión y liquidación de documentos (formato C)',
              tarea: 'Completado',
              tiempoAhorrado: '3 horas',
            },
            {
              paso: 8,
              departamento: 'Pricing',
              trabajador: 'Mariana Torres',
              descripcion: 'Actualiza proforma y envía a Aduanas',
              tarea: 'Completado',
              tiempoAhorrado: '1 hora',
            },
            {
              paso: 9,
              departamento: 'Aduanas',
              trabajador: 'Patricia Gómez',
              descripcion: 'Envía proforma actualizada al cliente y solicita abono',
              tarea: 'Pendiente',
              tiempoAhorrado: '0 días',
            },
            {
              paso: 10,
              departamento: 'Aduanas',
              trabajador: 'Carlos Mendoza',
              descripcion: 'Coordinación de retiro de carga y generación de incidencia 666',
              tarea: 'Completado',
              tiempoAhorrado: '1 día',
            },
            {
              paso: 11,
              departamento: 'Finanzas',
              trabajador: 'Laura Castillo',
              descripcion: 'Concilia documentos y emite factura',
              tarea: 'En proceso',
              tiempoAhorrado: '0.5 días',
            },
          ],
        }

        setProcess(mockData)
      } catch (error) {
        console.error(`Error al cargar el proceso ${id}:`, error)
      } finally {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!process) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Proceso no encontrado</h2>
        <p className="text-gray-500 mt-2">
          El proceso que estás buscando no existe o no tienes permisos para verlo.
        </p>
        <Link href="/historial" className="mt-4 inline-block text-blue-500 hover:underline">
          Volver al historial
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
            <div className="flex justify-between items-center">
        {/* Izquierda: título */}
        <div>
          <h1 className="text-2xl font-bold">Detalle del Proceso {process.id}</h1>
          <p className="text-gray-500">
            Cliente: {process.clientId} | Estado: {process.estado}
          </p>
        </div>

        {/* Derecha: grupo de botones */}
        <div className="flex items-center gap-2">
          <Link
            href={`/procesos/${id}/documentos`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FileText size={18} />
            <span>Documentos</span>
          </Link>

          <Link
            href={`/procesos/${id}/editar`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FileText size={18} />
            <span>Editar Proceso</span>
          </Link>
        </div>
      </div>
      <ProcessDetail process={process} />

    </div>
  )
}
