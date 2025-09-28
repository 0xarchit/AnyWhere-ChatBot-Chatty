import { motion } from "framer-motion";
import { MessageCircle, Shield, Database, Zap } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-glow">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A bottom-right toggle opens a compact chat window with a clean, accessible UI.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Animation showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-strong rounded-2xl p-8 h-96 relative overflow-hidden">
              {/* Simulated chat toggle button */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 right-6 w-16 h-16 bg-gradient-primary rounded-full shadow-glow flex items-center justify-center cursor-pointer interactive"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>

              {/* Simulated chat window */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="glass rounded-xl p-4 max-w-sm ml-auto mt-8"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-card-border">
                  <span className="font-semibold text-primary">AnyWhere ChatBot</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-secondary/50 rounded-lg p-2 text-sm">
                    <span className="text-muted-foreground">Hello! How can I help you today?</span>
                  </div>
                  
                  <div className="bg-primary/20 rounded-lg p-2 text-sm ml-4">
                    <span>What's this page about?</span>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="bg-secondary/50 rounded-lg p-2 text-sm"
                  >
                    <span className="text-muted-foreground">
                      Based on the page content, this is about AnyWhere Chatbot...
                    </span>
                  </motion.div>
                </div>
                
                <div className="mt-3 p-2 border-t border-card-border">
                  <div className="w-full h-8 bg-muted rounded-md flex items-center px-2 text-xs text-muted-foreground">
                    Type your message...
                  </div>
                </div>
              </motion.div>

              {/* Floating context indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs font-medium text-green-400"
              >
                Context enabled!
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Feature bullets */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {[
              {
                icon: MessageCircle,
                title: "Floating toggle opens a compact chat window",
                description: "Shadow DOM prevents CSS conflicts."
              },
              {
                icon: Zap,
                title: "Optional page context capture",
                description: "Gathers page titles, headings, and text snippets and includes them in the last user message for better answers."
              },
              {
                icon: Database,
                title: "Session-only storage",
                description: "Nothing persists server-side by default; history lives in sessionStorage until the tab closes."
              },
              {
                icon: Shield,
                title: "One instance per page",
                description: "Responsive and accessible controls with proper keyboard navigation."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="glass rounded-xl p-3 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Context capture visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass-strong rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-glow">Context Capture Visualization</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="glass rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-primary mb-2">Page Content</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Page title</div>
                  <div>• Headings (h1-h6)</div>
                  <div>• Paragraph text</div>
                  <div>• List items</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary text-2xl"
              >
                →
              </motion.div>
            </div>

            <div className="text-center">
              <div className="glass rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-accent mb-2">Enhanced Message</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• User's question</div>
                  <div>• + Page context</div>
                  <div>• = Better answers</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-10"></div>
    </section>
  );
};

export default HowItWorks;