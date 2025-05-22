import React from 'react'
import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 w-full bg-primary-darker text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Como funciona</h2>
            <p className="text-gray-400">Configure em minutos e comece a automatizar seu atendimento</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Crie sua conta",
                description: "Registre-se gratuitamente e configure o perfil da sua empresa."
              },
              {
                step: "02",
                title: "Conecte o WhatsApp",
                description: "Integre com o WhatsApp Business API em poucos cliques."
              },
              {
                step: "03",
                title: "Configure seus fluxos",
                description: "Crie fluxos de atendimento personalizados sem precisar programar."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-purple/20">{step.step}</div>
                <h3 className="text-xl font-medium mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-0 right-[-30px] transform translate-x-1/2">
                    <ArrowRight size={24} className="text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
