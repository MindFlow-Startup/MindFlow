'use client';

import { useState } from 'react';

// Lista de especialidades disponíveis
const ESPECIALIDADES = [
  "Psicologia Clínica",
  "Psicologia Organizacional",
  "Psicologia Educacional",
  "Psicologia Esportiva",
  "Psicologia Jurídica",
  "Psicologia Hospitalar",
  "Neuropsicologia",
  "Psicopedagogia",
  "Psicanálise",
  "Terapia Cognitivo-Comportamental"
];

export default function CadastroPsicologo() {
  const [formData, setFormData] = useState({
    crp: '',
    email: '',
    nomeCompleto: '',
    dataNascimento: '',
    especialidades: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredId, setRegisteredId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEspecialidadesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          especialidades: [...prev.especialidades, value]
        };
      } else {
        return {
          ...prev,
          especialidades: prev.especialidades.filter(esp => esp !== value)
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    // Validação básica
    if (formData.especialidades.length === 0) {
      setError('Selecione pelo menos uma especialidade');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dataNascimento: new Date(formData.dataNascimento).toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar psicólogo');
      }

      const data = await response.json();
      setRegisteredId(data.id);
      setSuccess(true);
      
      // Limpa o formulário após o sucesso
      setFormData({
        crp: '',
        email: '',
        nomeCompleto: '',
        dataNascimento: '',
        especialidades: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
      console.error('Erro no cadastro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRegistration = () => {
    setSuccess(false);
    setRegisteredId('');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-green-50 border border-green-200 p-8 rounded-lg shadow-md text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Cadastro realizado com sucesso!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Psicólogo cadastrado com ID: {registeredId}
          </p>
          <div className="mt-6">
            <button
              onClick={handleNewRegistration}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cadastrar novo psicólogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro de Psicólogo</h1>
          <p className="mt-2 text-gray-600">Preencha seus dados para se cadastrar</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="crp" className="block text-sm font-medium text-gray-700">
              CRP
            </label>
            <input
              type="text"
              id="crp"
              name="crp"
              required
              value={formData.crp}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              required
              value={formData.nomeCompleto}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              required
              value={formData.dataNascimento}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especialidades
            </label>
            <div className="space-y-2">
              {ESPECIALIDADES.map(especialidade => (
                <div key={especialidade} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`esp-${especialidade}`}
                    name="especialidades"
                    value={especialidade}
                    checked={formData.especialidades.includes(especialidade)}
                    onChange={handleEspecialidadesChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`esp-${especialidade}`}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {especialidade}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}