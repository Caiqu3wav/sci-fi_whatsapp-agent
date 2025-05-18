import Header from "./components/sections/Header"
import Hero from "./components/sections/Hero"
import Recourses from "./components/sections/Recourses"
import {Footer} from "./components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-[700px] flex flex-col items-center justify-around">
      <Header/>
      <Hero/>
      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Planos flexíveis para qualquer negócio</h2>
            <p className="text-gray-400">Escolha o plano que melhor se adapta às necessidades da sua empresa</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "R$97",
                description: "Perfeito para pequenos negócios começarem a automatizar.",
                features: [
                  "1 número de WhatsApp",
                  "500 mensagens/mês",
                  "3 fluxos automáticos",
                  "Suporte por email"
                ],
                popular: false,
                buttonText: "Começar grátis"
              },
              {
                name: "Professional",
                price: "R$247",
                description: "Ideal para empresas que buscam escalar seu atendimento.",
                features: [
                  "3 números de WhatsApp",
                  "3.000 mensagens/mês",
                  "Fluxos ilimitados",
                  "Integrações avançadas",
                  "Suporte prioritário"
                ],
                popular: true,
                buttonText: "Escolher plano"
              },
              {
                name: "Enterprise",
                price: "Personalizado",
                description: "Soluções sob medida para grandes operações.",
                features: [
                  "Números ilimitados",
                  "Mensagens ilimitadas",
                  "API completa",
                  "Suporte 24/7",
                  "Treinamento dedicado"
                ],
                popular: false,
                buttonText: "Falar com vendas"
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`glass-effect p-8 rounded-xl relative ${plan.popular ? 'border-2 border-purple' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple py-1 px-4 rounded-full text-sm font-medium">
                    Mais popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Personalizado" && <span className="text-gray-400">/mês</span>}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-purple hover:bg-purple-soft' : 'bg-darkbg-card hover:bg-gray-800'} transition-colors`}
                  onClick={() => navigate('/login?register=true')}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section> 
      
      <Recourses/>
      <Footer/>
    </main>
  )
}