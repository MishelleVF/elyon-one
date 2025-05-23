"use client"
import DataTable from "./DataTable"
import { useRouter } from "next/navigation"

export default function ProcessTable({ data, columns, baseUrl }) {
  const router = useRouter()

  const handleRowClick = (row) => {
    router.push(`${baseUrl}/${row.id}`)
  }

  return <DataTable data={data} columns={columns} onRowClick={handleRowClick} />
}
