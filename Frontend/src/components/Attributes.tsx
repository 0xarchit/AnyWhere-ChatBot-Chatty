import { motion } from "framer-motion";
import { useState } from "react";
import { Palette, MessageSquare, Settings, ToggleLeft } from "lucide-react";

const attributes = [
  {
    name: "mode",
    icon: Palette,
    title: "Theme Mode",
    description: "light or dark; defaults to user preference if omitted.",
    example: 'mode="dark"',
    details: "Controls the built-in dark/light palette. Uses prefers-color-scheme when omitted.",
    values: ["dark", "light", "auto (default)"]
  },
  {
    name: "brandName",
    icon: MessageSquare,
    title: "Brand Name",
    description: "Your header title, e.g., 'AnyWhere ChatBot'.",
    example: 'brandName="SupportBot"',
    details: "Appears in the chat header to brand the experience for your users.",
    values: ["Any string", "Default: 'Chatty'"]
  },
  {
    name: "systemPrompt",
    icon: Settings,
    title: "System Prompt",
    description: "Guide the assistant's tone and role.",
    example: 'systemPrompt="You are a helpful assistant"',
    details: "Short instruction that defines the bot's behavior and personality.",
    values: ["Any descriptive text", "Keep it concise"]
  },
  {
    name: "context",
    icon: ToggleLeft,
    title: "Context Control",
    description: "always, never, or toggle (plus true/false synonyms) for privacy-aware control.",
    example: 'context="toggle"',
    details: "Controls page context capture for better relevance while respecting privacy.",
    values: ["always/true/yes/on", "never/false/no/off", "toggle/auto/default"]
  }
];

const Attributes = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-glow">Attributes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Customize behavior with simple script attributes. Each attribute controls a different aspect of the chatbot experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {attributes.map((attr, index) => (
            <motion.div
              key={attr.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-80"
              style={{ perspective: "1000px" }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d interactive ${
                  flippedCard === index ? "rotate-y-180" : ""
                }`}
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden cursor-pointer hover-scale">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <attr.icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-xl font-bold text-glow">{attr.title}</h3>
                      <code className="text-sm text-accent font-mono">{attr.name}</code>
                    </div>
                    
                    <p className="text-muted-foreground flex-grow mb-4">
                      {attr.description}
                    </p>
                    
                    <div className="code-block text-xs">
                      {attr.example}
                    </div>
                    
                    <div className="mt-4 text-xs text-primary text-center">
                      Click to see details →
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden rotate-y-180 cursor-pointer">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <attr.icon className="w-6 h-6 text-accent mb-2" />
                      <h3 className="text-lg font-bold">{attr.title} Details</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {attr.details}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary mb-2">Accepted values:</h4>
                      <div className="space-y-1">
                        {attr.values.map((value, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Context modes explanation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass-strong rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-glow">Context Modes Explained</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 font-bold">ON</span>
              </div>
              <h4 className="font-semibold text-green-400 mb-2">Always</h4>
              <p className="text-sm text-muted-foreground">
                Always include page context with every request. Best for support bots.
              </p>
              <code className="text-xs text-accent">context="true"</code>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-red-400 font-bold">OFF</span>
              </div>
              <h4 className="font-semibold text-red-400 mb-2">Never</h4>
              <p className="text-sm text-muted-foreground">
                Never include page context. Best for sensitive pages or general chat.
              </p>
              <code className="text-xs text-accent">context="false"</code>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <ToggleLeft className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Toggle</h4>
              <p className="text-sm text-muted-foreground">
                Show toggle in UI. Users can enable/disable per session.
              </p>
              <code className="text-xs text-accent">context="toggle"</code>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Attributes;