'use client'

import React, { useState } from 'react'
import { ExternalLink, CheckCircle, AlertCircle, Copy, Eye, EyeOff, MessageSquare, Shield, Zap } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useSession } from 'next-auth/react'

const Integrations = () => {
  const [whatsappToken, setWhatsappToken] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast('URL copiada para a área de transferência');
};

const handleSaveIntegration = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!whatsappToken || !phoneNumberId || !businessName) {
    toast.error('Preencha todos os campos');
    return;
  } else if (whatsappToken.length !== 256) {
    toast.error('Token do WhatsApp inválido');
    return;
  } else if (phoneNumberId.length !== 18) {
    toast.error('ID do número de telefone inválido');
    return;
  }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/integration/whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session?.user.id,
          whatsapp_token: whatsappToken,
          phone_number_id: phoneNumberId,
          business_name: businessName,
        }),
      });

      if (res.ok) {
        setIsConnected(true);
        toast.success('WhatsApp conectado com sucesso!');
      } else {
        toast.error('Erro ao salvar integração');
      }

    } catch(err) {
      console.error("Error registering user integration", err)
      toast.error("Error registering user integration");
    }
  };

  return (
    <div className="p-6 w-full bg-gradient-to-b from-primary-darker to-primary-200">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-purple-400">Integrações</h1>
        <p className="text-gray-400 mt-1">Configure suas integrações para automatizar o atendimento</p>
      </header>

      {/* WhatsApp Card */}
      <div className="bg-zinc-900 text-white border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">WhatsApp Business API</h2>
              <p className="text-gray-400 text-sm">Conecte sua conta do Meta WhatsApp</p>
            </div>
          </div>
          {isConnected && (
            <span className="flex items-center gap-1 border border-green-500 text-green-500 text-sm px-2 py-1 rounded">
              <CheckCircle className="w-3 h-3" /> Conectado
            </span>
          )}
        </div>

        {!isConnected ? (
          <>
            {/* Instruções */}
            <div className="bg-zinc-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-500" />
                Como obter suas credenciais do Meta WhatsApp
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-mono">1</span>
                  <div>
                    <p>Acesse o <strong>Meta for Developers</strong></p>
                    <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline inline-flex items-center mt-1">
                      developers.facebook.com <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-mono">2</span>
                  <p>Crie um app ou acesse um existente e vá para <strong>WhatsApp Business API</strong></p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-mono">3</span>
                  <p>Copie o <strong>Token de Acesso</strong> e o <strong>ID do Número de Telefone</strong></p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-mono">4</span>
                  <div>
                    <p>Configure o webhook com esta URL:</p>
                    <div className="flex items-center space-x-2 mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded">
                      <code className="text-xs text-gray-300 flex-1">https://your-domain.com/webhook/whatsapp</code>
                      <button onClick={() => copyToClipboard('https://your-domain.com/webhook/whatsapp')} className="text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Formulário */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="token" className="block text-sm">Token de Acesso do WhatsApp *</label>
                <div className="relative">
                  <input
                    id="token"
                    type={showToken ? 'text' : 'password'}
                    placeholder="EAABskCs2KWUB..."
                    value={whatsappToken}
                    onChange={(e) => setWhatsappToken(e.target.value)}
                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="phoneId" className="block text-sm">ID do Número de Telefone *</label>
                <input
                  id="phoneId"
                  placeholder="123456789012345"
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="businessName" className="block text-sm">Nome do Negócio (opcional)</label>
                <input
                  id="businessName"
                  placeholder="Minha Empresa"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-yellow-200">Mantenha seu token seguro. Nunca compartilhe essas credenciais.</p>
              </div>

              <button onClick={handleSaveIntegration} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> Conectar WhatsApp
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">WhatsApp Conectado!</h3>
            <p className="text-gray-400 mb-4">Sua integração está ativa. {businessName && `Negócio: ${businessName}`}</p>
            <button onClick={() => setIsConnected(false)} className="border cursor-pointer border-gray-600 text-gray-300 py-2
             px-4 rounded hover:bg-gray-800">
              Reconfigurar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Integrations;
