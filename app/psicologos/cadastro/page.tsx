"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FiUser, FiMail, FiCalendar, FiAward, FiFileText, FiChevronDown, FiCheck } from "react-icons/fi"
import { toast } from "react-hot-toast"

const SPECIALTIES_OPTIONS = [
  "Ansiedade",
  "Depressão",
  "Transtornos alimentares",
  "Estresse pós-traumático",
  "Terapia de casal",
  "Terapia infantil",
  "Orientação profissional",
  "Dependência química",
  "Distúrbios do sono",
  "Autoestima"
]

export default function PsychologistRegistration() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    crp: "",
    email: "",
    nomeCompleto: "",
    dataNascimento: "",
    especialidades: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSpecialties, setShowSpecialties] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.includes(specialty)
        ? prev.especialidades.filter(s => s !== specialty)
        : [...prev.especialidades, specialty]
    }))
  }

  const validateForm = () => {
    if (!formData.crp) {
      toast.error("CRP é obrigatório")
      return false
    }
    if (!formData.email) {
      toast.error("E-mail é obrigatório")
      return false
    }
    if (!formData.nomeCompleto) {
      toast.error("Nome completo é obrigatório")
      return false
    }
    if (!formData.dataNascimento) {
      toast.error("Data de nascimento é obrigatória")
      return false
    }
    if (formData.especialidades.length === 0) {
      toast.error("Selecione pelo menos uma especialidade")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro no cadastro")
      }

      const data = await response.json()
      toast.success("Cadastro realizado com sucesso!")
      router.push(`/confirmacao?email=${encodeURIComponent(data.email)}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro desconhecido")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdown = document.getElementById("specialties-dropdown")
      if (dropdown && !dropdown.contains(target)) {
        setShowSpecialties(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Cadastro de Psicólogo</h1>
              <p className="mt-2 text-gray-600">
                Preencha seus dados para se cadastrar em nossa plataforma
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* CRP */}
                <div className="sm:col-span-2">
                  <label htmlFor="crp" className="block text-sm font-medium text-gray-700">
                    CRP*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiAward className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="crp"
                      id="crp"
                      value={formData.crp}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                      placeholder="Ex: 12345/SP"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Nome Completo */}
                <div className="sm:col-span-2">
                  <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700">
                    Nome Completo*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nomeCompleto"
                      id="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                    Data de Nascimento*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dataNascimento"
                      id="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Especialidades */}
                <div>
                  <label htmlFor="especialidades" className="block text-sm font-medium text-gray-700">
                    Especialidades*
                  </label>
                  <div className="mt-1 relative" id="specialties-dropdown">
                    <button
                      type="button"
                      className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onClick={() => setShowSpecialties(!showSpecialties)}
                    >
                      <span className="block truncate">
                        {formData.especialidades.length > 0
                          ? formData.especialidades.join(", ")
                          : "Selecione as especialidades"}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <FiChevronDown className="h-5 w-5 text-gray-400" />
                      </span>
                    </button>

                    {showSpecialties && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {SPECIALTIES_OPTIONS.map((specialty) => (
                          <div
                            key={specialty}
                            className={`cursor-default select-none relative py-2 pl-8 pr-4 ${
                              formData.especialidades.includes(specialty)
                                ? "bg-indigo-100 text-indigo-900"
                                : "text-gray-900 hover:bg-indigo-50"
                            }`}
                            onClick={() => toggleSpecialty(specialty)}
                          >
                            <span className="block truncate">{specialty}</span>
                            {formData.especialidades.includes(specialty) && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <FiCheck className="h-5 w-5" />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}