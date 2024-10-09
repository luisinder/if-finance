import React, { useState, useMemo } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

interface Supplier {
  id: number
  name: string
  contact: string
  email: string
  phone: string
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'TechCorp', contact: 'John Doe', email: 'john@techcorp.com', phone: '+1 234-567-8901' },
    { id: 2, name: 'SoftwareSolutions', contact: 'Jane Smith', email: 'jane@softwaresolutions.com', phone: '+1 987-654-3210' },
    { id: 3, name: 'NetworkPro', contact: 'Bob Johnson', email: 'bob@networkpro.com', phone: '+1 456-789-0123' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.includes(searchTerm)
    )
  }, [suppliers, searchTerm])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newSupplier: Supplier = {
      id: currentSupplier?.id || suppliers.length + 1,
      name: formData.get('name') as string,
      contact: formData.get('contact') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    }

    if (currentSupplier) {
      setSuppliers(suppliers.map(supplier => supplier.id === currentSupplier.id ? newSupplier : supplier))
    } else {
      setSuppliers([...suppliers, newSupplier])
    }
    setShowForm(false)
    setCurrentSupplier(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Proveedores</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Proveedor
        </button>
      </div>

      <div className="mb-4 flex items-center">
        <Search size={20} className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar proveedores..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nombre del proveedor"
              name="name"
              defaultValue={currentSupplier?.name}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
              Contacto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contact"
              type="text"
              placeholder="Nombre del contacto"
              name="contact"
              defaultValue={currentSupplier?.contact}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email del contacto"
              name="email"
              defaultValue={currentSupplier?.email}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Teléfono
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Teléfono del contacto"
              name="phone"
              defaultValue={currentSupplier?.phone}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {currentSupplier ? 'Actualizar' : 'Crear'} Proveedor
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setShowForm(false)
                setCurrentSupplier(null)
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
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Contacto</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Teléfono</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{supplier.id}</td>
              <td className="py-3 px-4">{supplier.name}</td>
              <td className="py-3 px-4">{supplier.contact}</td>
              <td className="py-3 px-4">{supplier.email}</td>
              <td className="py-3 px-4">{supplier.phone}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => {
                    setCurrentSupplier(supplier)
                    setShowForm(true)
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => setSuppliers(suppliers.filter(s => s.id !== supplier.id))}
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

export default Suppliers