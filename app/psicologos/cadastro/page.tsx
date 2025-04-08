"use client";

import { useState } from "react";
import {
  Check,
  ChevronRight,
  ArrowRight,
  Brain,
  Heart,
  Shield,
  CheckCircle,
  Briefcase,
  User,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/images/Logo1.png";

// Tipos
type FormData = {
  crp: string;
  email: string;
  nomeCompleto: string;
  dataNascimento: string;
  especialidades: string[];
};

type StepProps = {
  currentStep: number;
  formData: FormData;
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleEspecialidadesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
};

// Constantes
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
  "Terapia Cognitivo-Comportamental",
];

export default function CadastroPsicologo() {
  const [formData, setFormData] = useState<FormData>({
    crp: "",
    email: "",
    nomeCompleto: "",
    dataNascimento: "",
    especialidades: [],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [registeredId, setRegisteredId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEspecialidadesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          especialidades: [...prev.especialidades, value],
        };
      } else {
        return {
          ...prev,
          especialidades: prev.especialidades.filter((esp) => esp !== value),
        };
      }
    });
  };

  const validateStep1 = (): boolean => {
    if (!formData.nomeCompleto.trim()) {
      setError("Nome completo é obrigatório");
      return false;
    }
    if (!formData.email.trim()) {
      setError("E-mail é obrigatório");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Por favor, insira um e-mail válido");
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!formData.crp.trim()) {
      setError("CRP é obrigatório");
      return false;
    }
    if (!/^\d{2}\/\d{5}$/.test(formData.crp)) {
      setError("Formato do CRP inválido (use 00/00000)");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    setError("");
    
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validação final
    if (formData.especialidades.length === 0) {
      setError("Selecione pelo menos uma especialidade");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dataNascimento: formData.dataNascimento 
            ? new Date(formData.dataNascimento).toISOString() 
            : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar psicólogo");
      }

      const data = await response.json();
      setRegisteredId(data.id);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRegistration = () => {
    setSuccess(false);
    setRegisteredId("");
    setCurrentStep(1);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-pink-100">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-pink-100 mb-6">
            <Heart className="h-10 w-10 text-pink-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Bem-vindo(a) à MindFlow!
          </h2>

          <p className="text-gray-600 mb-6">
            Seu cadastro foi concluído com sucesso. Estamos muito felizes em
            tê-lo(a) como parte da nossa comunidade de psicólogos.
          </p>

          <div className="bg-pink-50 rounded-xl p-4 mb-6 border border-pink-100">
            <h3 className="font-semibold text-pink-800 mb-3 flex items-center justify-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Prepare-se para começar
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start justify-center">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Enviamos um e-mail para ativar sua conta</span>
              </li>
              <li className="flex items-start justify-center">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Explore os recursos da plataforma</span>
              </li>
              <li className="flex items-start justify-center">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Personalize seu perfil profissional</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Qualquer dúvida, nossa equipe está disponível em{" "}
            <span className="text-pink-600">suporte@mindflow.com.br</span>
          </p>

          <div className="flex flex-col space-y-3">
            <Link href="psicologos/dashboard" className="w-full">
              <button className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg transition duration-200">
                Acessar Minha Conta
              </button>
            </Link>
            <button
              onClick={handleNewRegistration}
              className="w-full py-3 px-4 bg-white border border-pink-300 text-pink-600 font-semibold rounded-lg shadow-sm hover:border-pink-400 hover:bg-pink-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-200"
            >
              Acessar minha conta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={Logo}
                alt="MindFlow Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold">Prazer em vê-lo</h1>
            </div>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
              Passo {currentStep} de 3
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-white text-pink-600"
                      : "bg-white/30 text-white"
                  } font-medium`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 w-16 mx-1 ${
                      currentStep > step ? "bg-white" : "bg-white/30"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
              <svg
                className="h-5 w-5 text-red-500 mr-3 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Informações Básicas */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <User className="h-5 w-5 text-pink-500 mr-2" />
                    Informações Pessoais
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="nomeCompleto"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nome Completo <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nomeCompleto"
                        name="nomeCompleto"
                        required
                        value={formData.nomeCompleto}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        E-mail <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dataNascimento"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center group"
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Informações Profissionais */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Briefcase className="h-5 w-5 text-pink-500 mr-2" />
                    Informações Profissionais
                  </h2>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="crp"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CRP <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="crp"
                        name="crp"
                        required
                        value={formData.crp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                        placeholder="Digite seu CRP"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Exemplo: 00/00000
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Especialidades <span className="text-pink-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ESPECIALIDADES.map((especialidade) => (
                          <div
                            key={especialidade}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={`esp-${especialidade}`}
                              name="especialidades"
                              value={especialidade}
                              checked={formData.especialidades.includes(
                                especialidade
                              )}
                              onChange={handleEspecialidadesChange}
                              className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`esp-${especialidade}`}
                              className="ml-3 text-sm text-gray-700"
                            >
                              {especialidade}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center group"
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Revisão e Confirmação */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <CheckCircle className="h-5 w-5 text-pink-500 mr-2" />
                    Confirmação de Dados
                  </h2>

                  <div className="bg-pink-50 rounded-xl p-6 mb-6 border border-pink-100">
                    <h3 className="font-semibold text-pink-800 mb-4 border-b border-pink-200 pb-2">
                      Resumo do Cadastro
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-pink-700 mb-2">
                          Informações Pessoais
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>
                            <span className="font-medium">Nome:</span>{" "}
                            {formData.nomeCompleto || "Não informado"}
                          </li>
                          <li>
                            <span className="font-medium">E-mail:</span>{" "}
                            {formData.email || "Não informado"}
                          </li>
                          <li>
                            <span className="font-medium">Data Nasc.:</span>{" "}
                            {formData.dataNascimento || "Não informada"}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-pink-700 mb-2">
                          Informações Profissionais
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>
                            <span className="font-medium">CRP:</span>{" "}
                            {formData.crp || "Não informado"}
                          </li>
                          <li>
                            <span className="font-medium">Especialidades:</span>
                            {formData.especialidades.length > 0 ? (
                              <ul className="list-disc list-inside mt-1">
                                {formData.especialidades.map((esp) => (
                                  <li key={esp}>{esp}</li>
                                ))}
                              </ul>
                            ) : (
                              " Nenhuma selecionada"
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Termos e Privacidade
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Ao se cadastrar, você concorda com nossos Termos de
                      Serviço e Política de Privacidade. Seus dados estão
                      protegidos conforme a LGPD.
                    </p>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded mt-1"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-700"
                      >
                        Eu li e concordo com os Termos de Serviço e Política de
                        Privacidade
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
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
                      </span>
                    ) : (
                      <span>Confirmar Cadastro</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div className="flex items-center mb-2 md:mb-0">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              <span>Seus dados estão protegidos</span>
            </div>
            <div>
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Faça login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
