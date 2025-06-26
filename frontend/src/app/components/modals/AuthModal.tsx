'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        username: email,
        password,
      })

      if (res?.ok) {
        setSuccess('Login realizado com sucesso.')
        setIsOpen(false)
      } else {
        setError('Credenciais inválidas.')
      }
    } else {
      const res = await fetch('/api/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      })

      if (res.ok) {
        setSuccess('Cadastro realizado! Faça login.')
        setIsLogin(true)
      } else {
        setError('Erro ao registrar usuário.')
      }
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <DialogPanel className="bg-zinc-900 text-white p-6 rounded-xl max-w-md w-full shadow-xl">
        <DialogTitle className="text-center text-3xl font-bold mb-2 text-purple-500">
          Sci-Fi AI
        </DialogTitle>

        <p className="text-center mb-6 text-gray-400">
          {isLogin ? 'Faça login para continuar' : 'Crie sua conta no agente IA'}
        </p>

        {/* Google */}
        <button
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 py-2 rounded hover:bg-gray-100 mb-3"
        >
          <FcGoogle className="w-5 h-5" />
          Continuar com Google
        </button>

        {/* Facebook */}
        <button
          onClick={() => signIn('facebook')}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-6"
        >
          <FaFacebook className="w-5 h-5" />
          Continuar com Facebook
        </button>

        {/* Email */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 mb-3"
        />

        {/* Senha */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 mb-3"
        />

        {/* Confirmar senha (apenas se cadastro) */}
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 mb-3"
          />
        )}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white font-semibold mt-2"
        >
          {isLogin ? 'Entrar' : 'Criar conta'}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 hover:underline">
            {isLogin ? 'Cadastre-se' : 'Fazer login'}
          </button>
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="text-sm text-gray-500 hover:underline mt-4 block mx-auto"
        >
          Cancelar
        </button>
      </DialogPanel>
    </Dialog>
  )
}