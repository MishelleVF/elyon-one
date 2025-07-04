
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, redirect } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

// Tipos
interface Etapa {
  paso: number
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
      clientId: 'C999',
      estado: 'En proceso',
      fechaInicio: new Date().toISOString().slice(0, 10),
      etapas: Array.from({ length: 11 }, (_, i) => ({
        paso: i + 1,
        trabajador: i % 2 === 0 ? 'María López' : 'Carlos Ruiz',
        descripcion: '',
        tarea: '',
        tiempoAhorrado: '',
      })),
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
