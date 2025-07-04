'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function NewProcessPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [form, setForm] = useState({
    clientId: '',
    estado: 'En proceso',
    fechaInicio: new Date().toISOString().slice(0, 10),
    etapas: Array.from({ length: 11 }, (_, i) => ({
      paso: i + 1,
      trabajador: '',
      descripcion: '',
      tarea: 'Pendiente',
      tiempoAhorrado: ''
    }))
  })

  if (!isLoading && !user) {
    router.replace('/login')
    return null
  }

  const handleChange = (e, idx, field) => {
    if (idx == null) {
      setForm({ ...form, [e.target.name]: e.target.value })
    } else {
      const etapas = [...form.etapas]
      etapas[idx][field] = e.target.value
      setForm({ ...form, etapas })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // aquí enviarías form a tu API: await fetch('/api/processes', { method:'POST', body: JSON.stringify(form) })
    console.log('Enviar a API:', form)
    // al guardar, redirigir al listado o detalle
    router.push('/procesos')
  }

  // lista de trabajadores de ejemplo, podrías cargarla desde el servidor
  const trabajadores = [
    'Juan Pérez', 'María López', 'Carlos Rodríguez',
    'Ana Martínez', 'Luis García', 'Patricia Gómez',
    'Mario Paredes', 'Laura Castillo'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Registrar Nuevo Proceso</h1>

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

      {/* Dinámico: 11 pasos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2">Paso</th>
              <th className="px-2 py-2">Trabajador</th>
              <th className="px-2 py-2">Descripción</th>
              <th className="px-2 py-2">Tarea</th>
              <th className="px-2 py-2">Tiempo Ahorrado</th>
            </tr>
          </thead>
          <tbody>
            {form.etapas.map((etapa, idx) => (
              <tr key={etapa.paso}>
                <td className="px-2 py-1">Paso {etapa.paso}</td>
                <td className="px-2 py-1">
                  <select
                    value={etapa.trabajador}
                    onChange={(e) => handleChange(e, idx, 'trabajador')}
                    className="border rounded px-1 py-1 w-full"
                  >
                    <option value="">— Seleccionar —</option>
                    {trabajadores.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    value={etapa.descripcion}
                    onChange={(e) => handleChange(e, idx, 'descripcion')}
                    className="border rounded px-1 py-1 w-full"
                  />
                </td>
                <td className="px-2 py-1">
                  <select
                    value={etapa.tarea}
                    onChange={(e) => handleChange(e, idx, 'tarea')}
                    className="border rounded px-1 py-1 w-full"
                  >
                    <option value="">— Seleccionar —</option>
                    <option>Completado</option>
                    <option>En proceso</option>
                    <option>Pendiente</option>
                    <option>Atrasado</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    value={etapa.tiempoAhorrado}
                    onChange={(e) => handleChange(e, idx, 'tiempoAhorrado')}
                    placeholder="e.g. 1 día, 3h"
                    className="border rounded px-1 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Crear Proceso
      </button>
    </form>
  )
}
