'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function NewProcessPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // Lista de trabajadores disponibles
  const trabajadores = [
    'Roberto Jiménez',
    'Isabela Martínez',
    'Carmen Sánchez',
    'Víctor Torres',
    'Ana Fernández',
    'Luis Delgado',
    'Mariana Ortiz',
    'Javier Ruiz',
    'Clara Morales',
    'Diego Navarro',
    'Sofía Herrera'
  ]

  // Asignación por defecto para cada uno de los 11 pasos
  const defaultAsignados = [
    'Roberto Jiménez',
    'Isabela Martínez',
    'Carmen Sánchez',
    'Víctor Torres',
    'Ana Fernández',
    'Luis Delgado',
    'Mariana Ortiz',
    'Javier Ruiz',
    'Clara Morales',
    'Diego Navarro',
    'Sofía Herrera'
  ]

  // Descripciones extraídas del procedimiento
  const defaultDescriptions = [
    'Envía correo informativo al área de PRICING en el que informan que la cotización ha sido aprobada',
    'Envía correo informativo al área de Operaciones. En este correo avisa del ingreso de un despacho nuevo y traslada responsabilidad',
    'Apertura una Orden de Servicio de Carga en el sistema. Envía correo al cliente, solicitando los documentos necesarios para el agenciamiento de aduanas',
    'Envía correo al área de Operaciones (Aduanas) con la ASIGNACIÓN (previa revisión y conformidad del cliente)',
    'Apertura una Orden de Servicio de Aduanas',
    'Revisa que todos los documentos recibidos estén conformes y, en caso de no conformidad, envía correo al cliente con las observaciones; envía correo al “liquidador” entregando los documentos conformes',
    'Revisa los documentos, envía correo con observaciones o consultas y, una vez todo conforme, procede con la liquidación y envía por correo el “formato C” al área de Operaciones (Aduanas)',
    'Actualiza la proforma y envía correo informativo a Operaciones (Aduanas)',
    'Envía correo informativo al cliente adjuntando la proforma actualizada y solicita abono',
    'Retira la carga (previo pago de derechos y pagos a terceros), coordina con la empresa de transporte y registra la fecha de retiro en SINTAD; acopia la documentación en la carpeta “Anticipos y gastos”; genera en SINTAD la incidencia 666 (Pase de Operaciones a facturación)',
    'Recibe correo “Pase de Operaciones a Facturación”; concilia los documentos de la carpeta “Anticipos y gastos” versus los pagos realizados; da conformidad, emite factura y envía correo al cliente con toda la documentación'
  ]

  // Genera el array inicial de etapas con trabajador y descripción por defecto
  const initialEtapas = Array.from({ length: 11 }, (_, i) => ({
    paso: i + 1,
    trabajador: defaultAsignados[i] || '',
    descripcion: defaultDescriptions[i] || '',
    tarea: 'Pendiente',
    tiempoEsperado: ''    // <--- renombrado aquí
  }))

  const [form, setForm] = useState({
    clientId: '',
    estado: 'En proceso',
    fechaInicio: new Date().toISOString().slice(0, 10),
    etapas: initialEtapas
  })

  // Redirige al login si no hay usuario
  if (!isLoading && !user) {
    router.replace('/login')
    return null
  }

  // Maneja cambios en inputs y selects
  const handleChange = (e, idx, field) => {
    if (idx == null) {
      setForm({ ...form, [e.target.name]: e.target.value })
    } else {
      const etapas = [...form.etapas]
      etapas[idx][field] = e.target.value
      setForm({ ...form, etapas })
    }
  }

  // Al enviar, enviamos a la API (dummy) y redirigimos
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Enviar a API:', form)
    // await fetch('/api/processes', { method: 'POST', body: JSON.stringify(form) })
    router.push('/procesos')
  }

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

      {/* Tabla dinámica de 11 pasos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left">Paso</th>
              <th className="px-2 py-2 text-left">Trabajador</th>
              <th className="px-2 py-2 text-left">Descripción</th>
              <th className="px-2 py-2 text-left">Tarea</th>
              <th className="px-2 py-2 text-left">Tiempo Esperado</th> {/* <--- aquí */}
            </tr>
          </thead>
          <tbody>
            {form.etapas.map((etapa, idx) => (
              <tr key={etapa.paso} className="odd:bg-white even:bg-gray-50">
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
                    <option>Completado</option>
                    <option>En proceso</option>
                    <option>Pendiente</option>
                    <option>Atrasado</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    value={etapa.tiempoEsperado}         // <--- y aquí
                    onChange={(e) => handleChange(e, idx, 'tiempoEsperado')}
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
