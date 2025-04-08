"use client";

import { useState } from "react";
import { User, Shield, ArrowRight, Eye, EyeOff, Loader, AlertCircle } from "lucide-react";
import Image from "next/image";
import Logo from "@/components/images/Logo1.png";
import Link from "next/link";

export default function LoginPsicologo() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    crp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validação básica
      if (!formData.nomeCompleto || !formData.crp) {
        throw new Error("Preencha todos os campos");
      }

      // Simulação de chamada à API (substitua pelo seu endpoint real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aqui você faria a chamada real à API
      // const response = await fetch("/api/login-psicologo", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error("Credenciais inválidas");
      
      // Redirecionamento após login bem-sucedido
      // router.push("/dashboard");
      
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao fazer login"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Seção esquerda - Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-12 text-white relative overflow-hidden">
        {/* Efeito de bolhas decorativas */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute top-1/3 -right-10 w-48 h-48 rounded-full bg-white/7"></div>

        <div className="max-w-md mx-auto flex flex-col h-full justify-between relative z-10">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <Image
                src={Logo}
                alt="MindFlow Logo"
                width={160}
                height={160}
                className="mb-6 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                Bem-vindo de volta
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Acesse sua conta para continuar sua jornada profissional
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors duration-300">
            <div className="p-2 bg-white/20 rounded-full">
              <Shield className="h-5 w-5" />
            </div>
            <span>Plataforma segura e LGPD compliant</span>
          </div>
        </div>
      </div>

      {/* Seção direita - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 transition-all duration-300 hover:shadow-xl">
          {/* Header mobile */}
          <div className="lg:hidden mb-8 text-center">
            <div className="animate-bounce-in">
              <Image
                src={Logo}
                alt="MindFlow Logo"
                width={100}
                height={100}
                className="mx-auto mb-6 transform hover:rotate-6 transition-transform duration-500"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta</h1>
            <p className="text-gray-600">Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Acesse sua conta</h2>
            <p className="text-gray-500 mb-6">Informe seu nome completo e CRP</p>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>{error}</div>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 hover:border-gray-400"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CRP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Shield className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="crp"
                    value={formData.crp}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 hover:border-gray-400"
                    placeholder="Digite seu CRP"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Exemplo de formato: 00/00000
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg text-base transition-all duration-300 flex items-center justify-center ${
                isSubmitting 
                  ? "opacity-80 cursor-not-allowed" 
                  : "hover:from-purple-700 hover:to-pink-600 hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Acessando...
                </>
              ) : (
                <>
                  Acessar minha conta
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link
                href="cadastro"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}