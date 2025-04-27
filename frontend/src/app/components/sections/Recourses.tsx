import React from 'react'
import { MessageSquare, Zap, Shield, Settings } from "lucide-react";
import { FeatureCard } from "../FeatureCard";

export default function Recourses() {
  return (
    <section className="w-full recourses-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-center mt-12 text-amber-50">
            Recursos Poderosos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              Icon={MessageSquare}
              title="Respostas Automáticas"
              description="Responda mensagens 24/7 com IA personalizada"
            />
            <FeatureCard
              Icon={Zap}
              title="Fluxos Inteligentes"
              description="Crie fluxos de conversação adaptáveis"
            />
            <FeatureCard
              Icon={Shield}
              title="Segurança Total"
              description="Seus dados protegidos com criptografia"
            />
            <FeatureCard
              Icon={Settings}
              title="Personalização"
              description="Configure seu agente como desejar"
            />
          </div>
        </div>
      </section>
  )
}
