import React from 'react'
import { MessageSquare, Zap, Shield, Settings } from "lucide-react";
import { FeatureCard } from "../FeatureCard";

export default function Recourses() {
  return (
    <section className="w-full recourses-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-center mt-12 text-amber-50">
            Powerfull Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              Icon={MessageSquare}
              title="Automizated answers"
              description="Answer 24/7 Messages with Personalized AI"
            />
            <FeatureCard
              Icon={Zap}
              title="Smart flux"
              description="Create adaptable conversation flows"
            />
            <FeatureCard
              Icon={Shield}
              title="Total security"
              description="Your data protected with encryption"
            />
            <FeatureCard
              Icon={Settings}
              title="Customization"
              description="Configure your agent as desired"
            />
          </div>
        </div>
      </section>
  )
}
