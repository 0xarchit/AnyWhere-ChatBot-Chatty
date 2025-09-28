import { motion } from "framer-motion";
import { Shield, Lock, Server, Eye, EyeOff } from "lucide-react";

const PrivacyControl = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Privacy Best Practices */}
        {/* Privacy best practices */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-strong rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-glow">Privacy Best Practices</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Recommended
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  Use <code className="text-accent">context="toggle"</code> for user control
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  Review page content before enabling always-on context
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                Avoid
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <code className="text-accent">context="always"</code> on sensitive pages
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Including personal data in system prompts
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Ignoring CORS and CSP policies
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PrivacyControl;