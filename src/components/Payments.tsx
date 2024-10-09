import React, { useState, useMemo } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

interface Payment {
  id: number
  invoiceId: number
  amount: number
  date: string
  method: string
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, invoiceId: 2, amount: 7500, date: '2024-03-12', method: 'Transferencia' },
    { id: 2, invoiceId: 3, amount: 3000, date: '2024-03-18', method: 'Tarjeta de Crédito' },
    { id: 3, invoiceId: 1, amount: 5000, date: '2024-03-20', method: 'Cheque' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => 
      payment.invoiceId.toString().includes(searchTerm) ||
      payment.amount.toString().includes(searchTerm) ||
      payment.date.includes(searchTerm) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [payments, searchTerm])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newPayment: Payment = {
      id: currentPayment?.id || payments.length + 1,
      invoiceId: Number(formData.get('invoiceId')),
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      method: formData.get('method') as string,
    }

    if (currentPayment) {
      setPayments(payments.map(payment => payment.id === currentPayment.id ? newPayment : payment))
    } else {
      setPayments([...payments, newPayment])
    }
    setShowForm(false)
    setCurrentPayment(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pagos</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Pago
        </button>
      </div>

      <div className="mb-4 flex items-center">
        <Search size={20} className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar pagos..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="invoiceId">
              ID de Factura
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="invoiceId"
              type="number"
              placeholder="ID de la factura"
              name="invoiceId"
              defaultValue={currentPayment?.invoiceId}
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
              placeholder="Monto del pago"
              name="amount"
              defaultValue={currentPayment?.amount}
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
              defaultValue={currentPayment?.date}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="method">
              Método de Pago
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="method"
              name="method"
              defaultValue={currentPayment?.method || 'Transferencia'}
              required
            >
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {currentPayment ? 'Actualizar' : 'Crear'} Pago
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 textwhite font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setShowForm(false)
                setCurrentPayment(null)
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
            <th className="py-3 px-4 text-left">ID Factura</th>
            <th className="py-3 px-4 text-left">Monto</th>
            <th className="py-3 px-4 text-left">Fecha</th>
            <th className="py-3 px-4 text-left">Método</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{payment.id}</td>
              <td className="py-3 px-4">{payment.invoiceId}</td>
              <td className="py-3 px-4">${payment.amount}</td>
              <td className="py-3 px-4">{payment.date}</td>
              <td className="py-3 px-4">{payment.method}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => {
                    setCurrentPayment(payment)
                    setShowForm(true)
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => setPayments(payments.filter(p => p.id !== payment.id))}
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

export default Payments