import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, Heart, Code, Copy, Check } from "lucide-react";
import { toast } from 'sonner';

const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden border-t border-card-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold text-glow mb-3">AnyWhere Chatbot</h3>
              <p className="text-muted-foreground max-w-md">
                A lightweight, drop‑in JavaScript widget that adds a floating, 
                context‑aware chatbot to any website via a single jsDelivr script tag.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>by</span>
              <a 
                href="https://github.com/0xarchit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors interactive font-semibold"
              >
                0xarchit
              </a>
            </motion.div>
          </div>

          {/* Links section */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <div className="space-y-3">
              {[
                { name: "Documentation", href: "https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/blob/main/README.md" },
                { name: "GitHub Repository", href: "https://github.com/0xarchit/AnyWhere-ChatBot-Chatty" },
                { name: "License", href: "https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/blob/main/LICENSE" },
                { name: "Issues & Support", href: "https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/issues" }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors interactive flex items-center gap-2"
                >
                  {link.name}
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform examples */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform Support</h4>
            <div className="space-y-3">
              {[
                "WordPress",
                "Shopify", 
                "Webflow",
                "Static Sites",
                "React Apps",
                "Any HTML Page"
              ].map((platform, index) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {platform}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

  {/* Installation snippet */}
  <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-12 max-w-3xl mx-auto text-center"
        >
          <h4 className="font-semibold mb-4 text-glow">Quick Start - Copy & Paste</h4>
          <div className="code-block relative text-left overflow-x-auto max-w-full px-4">
            {/* Copy button */}
            <button
              aria-label="Copy install snippet"
              title="Copy install snippet"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(`<script src=\"https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js\"></script>`);
                  toast.success('Snippet copied!');
                } catch {
                  toast.error('Copy failed');
                }
              }}
              className="absolute top-2 right-2 p-2 glass rounded hover:bg-primary/20 transition-all interactive"
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <pre className="text-sm whitespace-pre-wrap break-all">
              <code className="block w-full">{`<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"></script>`}</code>
            </pre>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            That's it! Add this single line to your HTML and you're ready to go.
          </p>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-card-border"
        >
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 AnyWhere Chatbot - Chatty</span>
            <span>•</span>
            <a
              href="https://0xarchit.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="0xarchit personal site"
              title="Developed By 0xArchit"
              className="text-primary hover:text-primary-glow transition-colors interactive font-semibold"
            >
              Developed By 0xArchit
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/0xarchit/AnyWhere-ChatBot-Chatty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository: AnyWhere-ChatBot-Chatty"
              title="GitHub Repository: AnyWhere-ChatBot-Chatty"
              className="glass rounded-full p-2 hover:bg-primary/20 transition-all interactive"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
            <a
              href="https://github.com/0xarchit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile: 0xarchit"
              title="GitHub Profile: 0xarchit"
              className="glass rounded-full p-2 hover:bg-primary/20 transition-all interactive"
            >
              <Code className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
          </div>
        </motion.div>

        {/* Platform integration hints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Need help with WordPress, Shopify, or other platforms? 
            <a 
              href="https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/issues"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-glow transition-colors interactive ml-1"
            >
              Check our issues page
            </a>
            {" "}or create a fork with platform-specific examples.
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;