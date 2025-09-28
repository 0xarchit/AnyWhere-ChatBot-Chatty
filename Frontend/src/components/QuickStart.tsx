import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ScrollTriggered, ResponsiveContainer } from "./ResponsiveEnhancements";

const codeExamples = {
  minimal: `<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"></script>`,
  custom: `<script
  src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"
  mode="light"
  brandName="AnyWhere ChatBot">
</script>`,
  context: `<script
  src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"
  context="true"
  systemPrompt="You are a friendly support assistant for ExampleCorp.">
</script>`,
  programmatic: `<script>
  const s = document.createElement('script');
  s.src = "https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js";
  s.setAttribute('mode', 'dark');
  s.setAttribute('brandName', 'AnyWhere ChatBot');
  // context accepts: always | never | toggle | true/false | yes/no | on/off | auto/default
  s.setAttribute('context', 'always');
  s.setAttribute('systemPrompt', 'You are a friendly support assistant.');
  document.body.appendChild(s);
</script>`
};

const QuickStart = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>("minimal");
  const [isProgrammatic, setIsProgrammatic] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = async (code: string, key: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const tabs = [
    { key: "minimal" as const, label: "Minimal defaults" },
    { key: "custom" as const, label: "Custom Branding + Light Mode" },
    { key: "context" as const, label: "Context Always + System Prompt" },
  ];

  return (
  <section className="relative min-h-screen py-8 sm:py-12 lg:py-16 xl:py-20">
      <ResponsiveContainer>
        <ScrollTriggered direction="up" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-glow">Quick Start</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Single script via jsDelivr. Shadow DOM isolation. Session-only chat history. Optional page context capture.
          </p>
        </ScrollTriggered>

        {/* Sticky code panel */}
        <div className="sticky top-16 sm:top-20 z-30 px-4">
          <ScrollTriggered direction="scale" delay={0.2}>
                        <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
              {/* Tab navigation */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 border-b border-card-border pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all interactive ${
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Programmatic toggle */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsProgrammatic(!isProgrammatic)}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all interactive ${
                    isProgrammatic
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary-glow"
                  }`}
                >
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all ${
                      isProgrammatic
                        ? "bg-accent-foreground border-accent-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {isProgrammatic && (
                      <div className="w-1 h-1 sm:w-2 sm:h-2 bg-accent rounded-full m-0.5" />
                    )}
                  </div>
                  <span className="whitespace-nowrap">Programmatic insertion</span>
                </button>
              </div>

              {/* Code block */}
              <div className="relative">
                <div className="code-block relative overflow-x-auto max-w-full px-4">
                    <pre className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-all break-words">
                      <code className="text-foreground">
                        {isProgrammatic ? codeExamples.programmatic : codeExamples[activeTab]}
                      </code>
                    </pre>
                </div>

                {/* Copy button */}
                <button
                  onClick={() =>
                    handleCopy(
                      isProgrammatic ? codeExamples.programmatic : codeExamples[activeTab],
                      isProgrammatic ? "programmatic" : activeTab
                    )
                  }
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 glass rounded-lg p-2 hover:bg-primary/20 transition-all interactive group"
                >
                  {copiedStates[isProgrammatic ? "programmatic" : activeTab] ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary" />
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 glass rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {isProgrammatic
                    ? "Programmatic insertion is useful when loading scripts conditionally or when you need dynamic attribute configuration."
                    : activeTab === "minimal"
                    ? "The simplest integration - just add the script tag and Chatty will use default settings with user's preferred theme."
                    : activeTab === "custom"
                    ? "Customize the brand name and force light mode. Perfect for branded implementations."
                    : "Always capture page context with a custom system prompt. Great for support bots that need page context."}
                </p>
              </div>
                          <div className="overflow-x-auto">
                            {/* Line 84 omitted */}
                            {/* Lines 85-107 omitted */}
                            {/* Line 109 omitted */}
                            {/* Lines 110-135 omitted */}
                            {/* Line 137 omitted */}
                            {/* Lines 138-148 omitted */}
                          </div>
            </div>
          </ScrollTriggered>
        </div>

        {/* Features grid */}
        <ScrollTriggered direction="up" delay={0.4} className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {[
              {
                title: "Single script via jsDelivr",
                description: "No build process, no complex setup"
              },
              {
                title: "Shadow DOM isolation",
                description: "Won't clash with your site's CSS"
              },
              {
                title: "Session-only chat history",
                description: "Privacy-first approach"
              },
              {
                title: "Optional page context capture",
                description: "Better answers with page context"
              }
            ].map((feature, index) => (
              <ScrollTriggered
                key={feature.title}
                direction="up"
                delay={0.1 * index}
                className="glass rounded-xl p-4 sm:p-6 hover-scale interactive"
              >
                <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </ScrollTriggered>
            ))}
          </div>
        </ScrollTriggered>
      </ResponsiveContainer>
    </section>
  );
};

export default QuickStart;