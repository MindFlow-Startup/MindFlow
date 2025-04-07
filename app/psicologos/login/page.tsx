"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Brain,
  User,
  Shield,
  BookOpen,
  BarChart2,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/components/images/Logo1.png";
import Link from "next/link";

export default function LoginPsicologo() {
  const [formData, setFormData] = useState({
    email: "",
    crp: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Lógica de login aqui
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row h-[90vh] max-h-[800px]">
        {/* Seção esquerda - Branding e Benefícios */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 p-10 text-white flex-col">
          <div className="flex flex-col items-center mb-12">
            <Image
              src={Logo}
              alt="MindFlow Logo"
              width={120}
              height={120}
              className="mb-6"
            />
            <h1 className="text-3xl font-bold mb-3 text-center">
              Bem-vindo de volta
            </h1>
            <p className="text-lg opacity-90 text-center">
              Acesse sua conta para continuar sua jornada
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="p-2 bg-white/20 rounded-lg w-max mb-2">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">Ferramentas Clínicas</h3>
              <p className="text-white/90 text-sm">Protocolos validados</p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="p-2 bg-white/20 rounded-lg w-max mb-2">
                <User className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">Gestão de Pacientes</h3>
              <p className="text-white/90 text-sm">Acompanhamento completo</p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="p-2 bg-white/20 rounded-lg w-max mb-2">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">Biblioteca Técnica</h3>
              <p className="text-white/90 text-sm">Materiais atualizados</p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="p-2 bg-white/20 rounded-lg w-max mb-2">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">Relatórios</h3>
              <p className="text-white/90 text-sm">Análises detalhadas</p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4" />
            <span>Plataforma segura e LGPD compliant</span>
          </div>
        </div>

        {/* Seção direita - Formulário */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 overflow-y-auto">
          {/* Header mobile */}
          <div className="lg:hidden mb-8 bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white text-center rounded-xl">
            <div className="flex flex-col items-center">
              <Image
                src={Logo}
                alt="MindFlow Logo"
                width={80}
                height={80}
                className="mb-4"
              />
              <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
              <p className="mt-2">
                Acesse sua conta para continuar sua jornada
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <h2 className="hidden lg:block text-2xl font-bold text-gray-800 mb-2">
              Faça login
            </h2>
            <p className="hidden lg:block text-gray-600 mb-6">
              Use suas credenciais para acessar
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail Profissional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CRP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="crp"
                    value={formData.crp}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                    placeholder="Seu CRP"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Lembrar de mim
                  </label>
                </div>
                <Link
                  href="/recuperar-crp"
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Esqueceu seu CRP?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Acessando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Acessar minha conta
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-pink-100 rounded-lg mr-3">
                  <Sparkles className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Novo na plataforma?
                </h3>
              </div>
              <p className="text-gray-600 mb-5">
                Descubra como a MindFlow pode transformar sua prática clínica.
                Cadastre-se agora e ganhe:
              </p>

              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Acesso a todas as ferramentas profissionais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>7 dias gratuitos para experimentar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span>Suporte especializado</span>
                </li>
              </ul>

              <Link href="/cadastro" className="w-full">
                <button className="w-full py-3 px-4 bg-white border-2 border-pink-300 text-pink-600 font-medium rounded-lg shadow-sm hover:border-pink-400 hover:bg-pink-50 hover:shadow-md transition-all duration-200 flex items-center justify-center">
                  Criar conta gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}