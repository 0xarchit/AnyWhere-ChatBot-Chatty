import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ToggleLeft, Send } from "lucide-react";

const LiveDemo = () => {
  const [contextEnabled, setContextEnabled] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string; isBot: boolean; isStatus?: boolean}>>([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const contextMessage = contextEnabled 
        ? "Based on the page content about AnyWhere Chatbot, I can help you with installation, configuration, and features."
        : "I'd be happy to help! Could you provide more context about what you're looking for?";
      
      setMessages(prev => [...prev, { text: contextMessage, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleContextToggle = () => {
    setContextEnabled(!contextEnabled);
    const statusMessage = !contextEnabled 
      ? "Context enabled! Messages will include webpage content."
      : "Context disabled. Messages will use default prompt.";
    
    // Show status message briefly
    setMessages(prev => [...prev, { text: statusMessage, isBot: true, isStatus: true }]);
  };

  return (
    <section id="live-demo" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-glow">Live Demo</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try toggling context to see how it changes the bot's responses and status messages.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Mock page content */}
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-glow">Mock Page Content</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm">
                  This simulates a real webpage where the chatbot would be embedded.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">AnyWhere Chatbot Features:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Lightweight JavaScript widget</li>
                    <li>• Shadow DOM isolation</li>
                    <li>• Context-aware responses</li>
                    <li>• Customizable branding</li>
                  </ul>
                </div>

                <div className="glass rounded-lg p-4 overflow-x-auto">
                  <h5 className="font-medium text-primary mb-2">Installation:</h5>
                  <div className="overflow-x-auto">
                    <code className="text-xs text-muted-foreground whitespace-nowrap">
                      &lt;script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"&gt;&lt;/script&gt;
                    </code>
                  </div>
                </div>
              </div>

              {/* Floating toggle button (simulated) */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-glow flex items-center justify-center cursor-pointer interactive"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Chat window */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-strong rounded-2xl p-6 h-96 flex flex-col"
            >
              {/* Chat header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-card-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-foreground">AnyWhere ChatBot</span>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow"></div>
              </div>

              {/* Context toggle */}
              <div className="mb-4">
                <button
                  onClick={handleContextToggle}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all interactive ${
                    contextEnabled
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-muted text-muted-foreground border border-card-border hover:bg-muted-glass"
                  }`}
                >
                  <ToggleLeft className={`w-4 h-4 transition-transform ${contextEnabled ? "rotate-180" : ""}`} />
                  Context: {contextEnabled ? "Enabled" : "Disabled"}
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.isBot
                          ? message.isStatus
                            ? "bg-accent/20 text-accent border border-accent/30"
                            : "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground ml-4"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-300"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-muted border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  aria-label="Send message"
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all interactive"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Demo explanation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 glass rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-4 text-glow">Try the Context Toggle</h3>
            <p className="text-muted-foreground mb-4">
              Toggle context on/off to see how it affects the bot's responses. When enabled, 
              the bot can reference the page content for more relevant answers.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Context Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                <span className="text-muted-foreground">Context Disabled</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-5"></div>
    </section>
  );
};

export default LiveDemo;