'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, redirect } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

// Tipos
interface Etapa {
  paso: number
  departamento: string
  trabajador: string
  descripcion: string
  tarea: string
  tiempoAhorrado: string
}

interface FormState {
  clientId: string
  estado: string
  fechaInicio: string      // YYYY-MM-DD
  etapas: Etapa[]
}

export default function EditProcessPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [form, setForm] = useState<FormState | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  // Carga mock de prueba
  useEffect(() => {
    if (!isLoading && !user) {
      redirect('/login')
      return
    }

    const mockData: FormState = {
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

    setForm(mockData)
    setLoadingData(false)
  }, [isLoading, user])

  // Manejo de cambios
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx?: number,
    field?: keyof Etapa
  ) => {
    if (idx !== undefined && field) {
      const nuevas = form!.etapas.map((et, i) =>
        i === idx ? { ...et, [field]: e.target.value } : et
      )
      setForm({ ...form!, etapas: nuevas })
    } else {
      setForm({ ...form!, [e.target.name]: e.target.value } as FormState)
    }
  }

  // Simulación de submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos enviados:', form)
    router.push(`/procesos/${id}`)
  }

  if (isLoading || loadingData || !form) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Editar Proceso {id}</h1>

      {/* Datos generales */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">ID Cliente</label>
          <input
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          >
            <option>En proceso</option>
            <option>Completado</option>
            <option>Pendiente</option>
            <option>Atrasado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha Inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Tabla de pasos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left">Paso</th>
              <th className="px-2 py-2 text-left">Departamento</th>
              <th className="px-2 py-2 text-left">Trabajador</th>
              <th className="px-2 py-2 text-left">Descripción</th>
              <th className="px-2 py-2 text-left">Tarea</th>
              <th className="px-2 py-2 text-left">Tiempo Ahorrado</th>
            </tr>
          </thead>
          <tbody>
            {form.etapas.map((et, idx) => (
              <tr key={et.paso}>
                <td className="px-2 py-1">Paso {et.paso}</td>
                <td className="px-2 py-1">{et.departamento}</td>
                <td className="px-2 py-1">
                  <select
                    value={et.trabajador}
                    onChange={(e) => handleChange(e, idx, 'trabajador')}
                    className="w-full border rounded px-1 py-1"
                  >
                    <option value="">— Seleccionar —</option>
                    <option>María López</option>
                    <option>Carlos Ruiz</option>
                    <option>Ana Pérez</option>
                    <option>Luis García</option>
                    <option>José Navarro</option>
                    <option>Mariana Torres</option>
                    <option>Carlos Mendoza</option>
                    <option>Patricia Gómez</option>
                    <option>Mario Paredes</option>
                    <option>Laura Castillo</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    value={et.descripcion}
                    onChange={(e) => handleChange(e, idx, 'descripcion')}
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="px-2 py-1">
                  <select
                    value={et.tarea}
                    onChange={(e) => handleChange(e, idx, 'tarea')}
                    className="w-full border rounded px-1 py-1"
                  >
                    <option>— Seleccionar —</option>
                    <option>Completado</option>
                    <option>En proceso</option>
                    <option>Pendiente</option>
                    <option>Atrasado</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    value={et.tiempoAhorrado}
                    onChange={(e) => handleChange(e, idx, 'tiempoAhorrado')}
                    placeholder="e.g. 1 día, 3h"
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2">
        <Link href={`/procesos/${id}`} className="px-4 py-2 border rounded hover:bg-gray-100">
          Cancelar
        </Link>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  )
}
