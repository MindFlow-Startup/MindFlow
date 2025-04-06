"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  User,
  Mail,
  Calendar,
  Award,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type PsicologoFormData = {
  crp: string
  email: string
  nomeCompleto: string
  dataNascimento: string
  especialidades: string
}

export default function CadastroPsicologo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<PsicologoFormData>()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  // Watch all fields for validation
  const watchedFields = watch()

  const totalSteps = 3

  const onSubmit = async (data: PsicologoFormData) => {
    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error((await response.text()) || "Erro no cadastro")

      setSuccess(true)
      setError("")
      // Reset form after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    }
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof PsicologoFormData)[] = []

    // Define which fields to validate based on current step
    if (step === 1) {
      fieldsToValidate = ["crp", "email"]
    } else if (step === 2) {
      fieldsToValidate = ["nomeCompleto", "dataNascimento"]
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setDirection("forward")
      setIsAnimating(true)
      setTimeout(() => {
        setStep((prev) => Math.min(prev + 1, totalSteps))
        setIsAnimating(false)
      }, 300)
    }
  }

  const prevStep = () => {
    setDirection("backward")
    setIsAnimating(true)
    setTimeout(() => {
      setStep((prev) => Math.max(prev - 1, 1))
      setIsAnimating(false)
    }, 300)
  }

  // Calculate progress percentage
  const progress = ((step - 1) / (totalSteps - 1)) * 100

  // Check if fields are valid
  const isFieldValid = (fieldName: keyof PsicologoFormData) => {
    return watchedFields[fieldName] && !errors[fieldName]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <TooltipProvider>
        <Card className="w-full max-w-md border-0 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 w-full">
            <div
              className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <CardHeader className="pb-4 pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                      step > idx + 1
                        ? "bg-indigo-600 text-white"
                        : step === idx + 1
                          ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-600"
                          : "bg-gray-100 text-gray-400",
                    )}
                  >
                    {step > idx + 1 ? <Check className="h-4 w-4" /> : idx + 1}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                Passo {step} de {totalSteps}
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-indigo-700 text-center">
              {step === 1 && "Informações Profissionais"}
              {step === 2 && "Dados Pessoais"}
              {step === 3 && "Especialidades e Confirmação"}
            </CardTitle>
            <p className="text-gray-500 text-sm text-center mt-1">
              {step === 1 && "Informe seus dados profissionais"}
              {step === 2 && "Preencha seus dados pessoais"}
              {step === 3 && "Confirme suas especialidades e finalize"}
            </p>
          </CardHeader>

          <CardContent>
            <form id="psicologo-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Feedback Messages */}
              {success && (
                <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center animate-in fade-in duration-300">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Cadastro realizado com sucesso!</span>
                </div>
              )}
              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center animate-in fade-in duration-300">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 1: Professional Information */}
              <div
                className={cn(
                  "space-y-5 transition-all duration-300",
                  isAnimating && direction === "forward"
                    ? "opacity-0 translate-x-full"
                    : isAnimating && direction === "backward"
                      ? "opacity-0 -translate-x-full"
                      : step !== 1
                        ? "hidden"
                        : "opacity-100 translate-x-0",
                )}
              >
                {/* CRP Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="crp" className="flex items-center text-gray-700 font-medium">
                      <Award className="h-4 w-4 mr-2 text-indigo-500" />
                      CRP<span className="text-indigo-500 ml-0.5">*</span>
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Número do Conselho Regional de Psicologia, incluindo a região (ex: 123456/SP)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      id="crp"
                      type="text"
                      placeholder="Ex: 123456/SP"
                      className={cn(
                        "pl-3 pr-10 py-3 h-12 transition-all duration-200",
                        errors.crp
                          ? "border-red-300 focus-visible:ring-red-200"
                          : "border-gray-300 focus-visible:ring-indigo-200 focus-visible:border-indigo-500",
                      )}
                      {...register("crp", { required: "CRP é obrigatório" })}
                    />
                    {isFieldValid("crp") && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.crp && (
                    <p className="text-sm text-red-500 flex items-start mt-1 animate-in fade-in duration-200">
                      <AlertCircle className="h-3 w-3 mr-1 mt-0.5" />
                      {errors.crp.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="flex items-center text-gray-700 font-medium">
                      <Mail className="h-4 w-4 mr-2 text-indigo-500" />
                      E-mail<span className="text-indigo-500 ml-0.5">*</span>
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Este e-mail será usado para comunicações importantes</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className={cn(
                        "pl-3 pr-10 py-3 h-12 transition-all duration-200",
                        errors.email
                          ? "border-red-300 focus-visible:ring-red-200"
                          : "border-gray-300 focus-visible:ring-indigo-200 focus-visible:border-indigo-500",
                      )}
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "E-mail inválido",
                        },
                      })}
                    />
                    {isFieldValid("email") && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-start mt-1 animate-in fade-in duration-200">
                      <AlertCircle className="h-3 w-3 mr-1 mt-0.5" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 2: Personal Information */}
              <div
                className={cn(
                  "space-y-5 transition-all duration-300",
                  isAnimating && direction === "forward"
                    ? "opacity-0 translate-x-full"
                    : isAnimating && direction === "backward"
                      ? "opacity-0 -translate-x-full"
                      : step !== 2
                        ? "hidden"
                        : "opacity-100 translate-x-0",
                )}
              >
                {/* Nome Completo Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="nomeCompleto" className="flex items-center text-gray-700 font-medium">
                    <User className="h-4 w-4 mr-2 text-indigo-500" />
                    Nome Completo<span className="text-indigo-500 ml-0.5">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="nomeCompleto"
                      type="text"
                      placeholder="Fulano de Tal"
                      className={cn(
                        "pl-3 pr-10 py-3 h-12 transition-all duration-200",
                        errors.nomeCompleto
                          ? "border-red-300 focus-visible:ring-red-200"
                          : "border-gray-300 focus-visible:ring-indigo-200 focus-visible:border-indigo-500",
                      )}
                      {...register("nomeCompleto", { required: "Nome é obrigatório" })}
                    />
                    {isFieldValid("nomeCompleto") && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.nomeCompleto && (
                    <p className="text-sm text-red-500 flex items-start mt-1 animate-in fade-in duration-200">
                      <AlertCircle className="h-3 w-3 mr-1 mt-0.5" />
                      {errors.nomeCompleto.message}
                    </p>
                  )}
                </div>

                {/* Data Nascimento Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dataNascimento" className="flex items-center text-gray-700 font-medium">
                      <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                      Data de Nascimento<span className="text-indigo-500 ml-0.5">*</span>
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Você deve ter pelo menos 18 anos para se cadastrar</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      id="dataNascimento"
                      type="date"
                      className={cn(
                        "pl-3 pr-10 py-3 h-12 transition-all duration-200",
                        errors.dataNascimento
                          ? "border-red-300 focus-visible:ring-red-200"
                          : "border-gray-300 focus-visible:ring-indigo-200 focus-visible:border-indigo-500",
                      )}
                      max={new Date().toISOString().split("T")[0]}
                      {...register("dataNascimento", {
                        required: "Data é obrigatória",
                        validate: (value) => {
                          const birthDate = new Date(value)
                          const today = new Date()
                          const age = today.getFullYear() - birthDate.getFullYear()
                          return age >= 18 || "Você deve ter pelo menos 18 anos"
                        },
                      })}
                    />
                    {isFieldValid("dataNascimento") && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.dataNascimento && (
                    <p className="text-sm text-red-500 flex items-start mt-1 animate-in fade-in duration-200">
                      <AlertCircle className="h-3 w-3 mr-1 mt-0.5" />
                      {errors.dataNascimento.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3: Specialties and Confirmation */}
              <div
                className={cn(
                  "space-y-5 transition-all duration-300",
                  isAnimating && direction === "forward"
                    ? "opacity-0 translate-x-full"
                    : isAnimating && direction === "backward"
                      ? "opacity-0 -translate-x-full"
                      : step !== 3
                        ? "hidden"
                        : "opacity-100 translate-x-0",
                )}
              >
                {/* Especialidades Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="especialidades" className="flex items-center text-gray-700 font-medium">
                      <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                      Especialidades<span className="text-indigo-500 ml-0.5">*</span>
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Liste suas especialidades separadas por vírgulas</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      id="especialidades"
                      type="text"
                      placeholder="Ex: Ansiedade, Depressão, Terapia Cognitivo-Comportamental"
                      className={cn(
                        "pl-3 pr-10 py-3 h-12 transition-all duration-200",
                        errors.especialidades
                          ? "border-red-300 focus-visible:ring-red-200"
                          : "border-gray-300 focus-visible:ring-indigo-200 focus-visible:border-indigo-500",
                      )}
                      {...register("especialidades", { required: "Especialidades são obrigatórias" })}
                    />
                    {isFieldValid("especialidades") && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-1">Separe por vírgulas</p>
                  {errors.especialidades && (
                    <p className="text-sm text-red-500 flex items-start mt-1 animate-in fade-in duration-200">
                      <AlertCircle className="h-3 w-3 mr-1 mt-0.5" />
                      {errors.especialidades.message}
                    </p>
                  )}
                </div>

                {/* Summary */}
                {watchedFields.crp && watchedFields.email && watchedFields.nomeCompleto && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h3 className="text-sm font-medium text-indigo-700 mb-2">Resumo do cadastro:</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <span className="font-medium mr-1">CRP:</span> {watchedFields.crp}
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium mr-1">E-mail:</span> {watchedFields.email}
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium mr-1">Nome:</span> {watchedFields.nomeCompleto}
                      </li>
                      {watchedFields.dataNascimento && (
                        <li className="flex items-start">
                          <span className="font-medium mr-1">Data de Nascimento:</span>{" "}
                          {new Date(watchedFields.dataNascimento).toLocaleDateString("pt-BR")}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="pb-6 pt-2 flex justify-between">
            {step > 1 ? (
              <Button type="button" onClick={prevStep} variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <div></div> // Empty div to maintain layout with justify-between
            )}

            {step < totalSteps ? (
              <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                form="psicologo-form"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Finalizar Cadastro
                    <Check className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </TooltipProvider>
    </div>
  )
}

