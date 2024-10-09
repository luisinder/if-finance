import React, { useState, useMemo } from 'react'
import { Plus, Edit, Trash2, FileUp, Search } from 'lucide-react'

interface Invoice {
  id: number
  supplier: string
  amount: number
  date: string
  status: string
  file?: File
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, supplier: 'TechCorp', amount: 5000, date: '2024-03-15', status: 'Pendiente' },
    { id: 2, supplier: 'SoftwareSolutions', amount: 7500, date: '2024-03-10', status: 'Pagada' },
    { id: 3, supplier: 'NetworkPro', amount: 3000, date: '2024-03-05', status: 'Pendiente' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => 
      invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.amount.toString().includes(searchTerm) ||
      invoice.date.includes(searchTerm) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [invoices, searchTerm])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, invoiceId: number) => {
    const file = event.target.files?.[0]
    if (file) {
      setInvoices(invoices.map(invoice => 
        invoice.id === invoiceId ? { ...invoice, file } : invoice
      ))
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newInvoice: Invoice = {
      id: currentInvoice?.id || invoices.length + 1,
      supplier: formData.get('supplier') as string,
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      status: formData.get('status') as string,
    }

    const file = formData.get('file') as File
    if (file && file.size > 0) {
      newInvoice.file = file
    }

    if (currentInvoice) {
      setInvoices(invoices.map(invoice => invoice.id === currentInvoice.id ? newInvoice : invoice))
    } else {
      setInvoices([...invoices, newInvoice])
    }
    setShowForm(false)
    setCurrentInvoice(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Facturas</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Nueva Factura
        </button>
      </div>

      <div className="mb-4 flex items-center">
        <Search size={20} className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar facturas..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplier">
              Proveedor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="supplier"
              type="text"
              placeholder="Nombre del proveedor"
              name="supplier"
              defaultValue={currentInvoice?.supplier}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Monto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="Monto de la factura"
              name="amount"
              defaultValue={currentInvoice?.amount}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Fecha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              defaultValue={currentInvoice?.date}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Estado
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              name="status"
              defaultValue={currentInvoice?.status || 'Pendiente'}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagada">Pagada</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Archivo PDF
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="file"
              type="file"
              name="file"
              accept=".pdf"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {currentInvoice ? 'Actualizar' : 'Crear'} Factura
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setShowForm(false)
                setCurrentInvoice(null)
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Proveedor</th>
            <th className="py-3 px-4 text-left">Monto</th>
            <th className="py-3 px-4 text-left">Fecha</th>
            <th className="py-3 px-4 text-left">Estado</th>
            <th className="py-3 px-4 text-left">Archivo</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{invoice.id}</td>
              <td className="py-3 px-4">{invoice.supplier}</td>
              <td className="py-3 px-4">${invoice.amount}</td>
              <td className="py-3 px-4">{invoice.date}</td>
              <td className="py-3 px-4">{invoice.status}</td>
              <td className="py-3 px-4">
                {invoice.file ? (
                  <a href={URL.createObjectURL(invoice.file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    Ver PDF
                  </a>
                ) : (
                  <label className="cursor-pointer text-blue-500 hover:text-blue-700">
                    <FileUp size={20} />
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, invoice.id)}
                    />
                  </label>
                )}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => {
                    setCurrentInvoice(invoice)
                    setShowForm(true)
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => setInvoices(invoices.filter(i => i.id !== invoice.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Invoices