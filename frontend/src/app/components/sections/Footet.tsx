import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-navigation";

export const Footer = () => {
  return (
    <footer className="bg-black/30 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sci-Fi AI</h3>
            <p className="text-gray-400">
              Parte da franquia Sci-Fi de soluções em inteligência artificial, 
              trazendo inovação e eficiência para sua comunicação.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Automação Inteligente</li>
              <li>Análise de Dados</li>
              <li>Personalização Avançada</li>
              <li>Integração WhatsApp</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre Nós</li>
              <li>Blog</li>
              <li>Carreiras</li>
              <li>Contato</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Central de Ajuda</li>
              <li>Documentação</li>
              <li>Status do Sistema</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-500/20">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Sci-Fi AI. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};