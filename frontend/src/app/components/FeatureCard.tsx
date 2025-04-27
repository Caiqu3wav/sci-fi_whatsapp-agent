import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <div className="card-gradient p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
      <Icon className="w-10 h-10 text-purple-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-gray-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};
