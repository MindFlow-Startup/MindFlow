'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiCalendar, FiAward, FiFileText } from 'react-icons/fi';

type PsicologoFormData = {
  crp: string;
  email: string;
  nomeCompleto: string;
  dataNascimento: string;
  especialidades: string;
};

export default function CadastroPsicologo() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PsicologoFormData>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: PsicologoFormData) => {
    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(await response.text() || 'Erro no cadastro');

      setSuccess(true);
      setError('');
      // Reset form after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Cadastro de Psicólogo</h1>
          <p className="text-gray-500">Preencha os dados abaixo para se cadastrar</p>
        </div>

        {/* Feedback Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
            <FiFileText className="mr-2" />
            <span>Cadastro realizado com sucesso!</span>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
            <FiFileText className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* CRP Field */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="crp">
            <FiAward className="inline mr-2 text-indigo-500" />
            CRP*
          </label>
          <input
            id="crp"
            type="text"
            {...register('crp', { required: 'CRP é obrigatório' })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 ${errors.crp ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Ex: 123456/SP"
          />
          {errors.crp && <p className="mt-1 text-sm text-red-500">{errors.crp.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
            <FiMail className="inline mr-2 text-indigo-500" />
            E-mail*
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Nome Completo Field */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="nomeCompleto">
            <FiUser className="inline mr-2 text-indigo-500" />
            Nome Completo*
          </label>
          <input
            id="nomeCompleto"
            type="text"
            {...register('nomeCompleto', { required: 'Nome é obrigatório' })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 ${errors.nomeCompleto ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Fulano de Tal"
          />
          {errors.nomeCompleto && <p className="mt-1 text-sm text-red-500">{errors.nomeCompleto.message}</p>}
        </div>

        {/* Data Nascimento Field */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="dataNascimento">
            <FiCalendar className="inline mr-2 text-indigo-500" />
            Data de Nascimento*
          </label>
          <input
            id="dataNascimento"
            type="date"
            {...register('dataNascimento', { 
              required: 'Data é obrigatória',
              validate: value => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 18 || 'Você deve ter pelo menos 18 anos';
              }
            })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 ${errors.dataNascimento ? 'border-red-300' : 'border-gray-300'}`}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dataNascimento && <p className="mt-1 text-sm text-red-500">{errors.dataNascimento.message}</p>}
        </div>

        {/* Especialidades Field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="especialidades">
            <FiAward className="inline mr-2 text-indigo-500" />
            Especialidades*
          </label>
          <input
            id="especialidades"
            type="text"
            {...register('especialidades', { required: 'Especialidades são obrigatórias' })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 ${errors.especialidades ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Ex: Ansiedade, Depressão"
          />
          <p className="mt-1 text-sm text-gray-500">Separe por vírgulas</p>
          {errors.especialidades && <p className="mt-1 text-sm text-red-500">{errors.especialidades.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cadastrando...
            </span>
          ) : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}