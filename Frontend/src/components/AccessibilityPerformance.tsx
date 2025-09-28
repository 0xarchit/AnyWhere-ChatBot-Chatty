import { motion } from "framer-motion";
import { Keyboard, Smartphone, Zap, Shield, Eye, Gauge } from "lucide-react";

const features = [
	{
		icon: Keyboard,
		title: "Keyboard Navigation",
		description:
			"Keyboard-focusable controls with clear focus styles and semantic elements.",
	},
	{
		icon: Eye,
		title: "Screen Reader Support",
		description:
			"Semantic HTML elements and ARIA attributes for assistive technologies.",
	},
	{
		icon: Smartphone,
		title: "Responsive Design",
		description: "Works seamlessly across all devices and screen sizes.",
	},
	{
		icon: Shield,
		title: "Motion Preferences",
		description: "Respects prefers-reduced-motion for accessibility compliance.",
	},
	{
		icon: Zap,
		title: "Lightweight Script",
		description:
			"Small, single-script integration via jsDelivr with minimal overhead.",
	},
	{
		icon: Gauge,
		title: "Performance Optimized",
		description:
			"Shadow DOM isolation prevents layout shifts and CSS conflicts.",
	},
];

const AccessibilityPerformance = () => {
	return (
		<section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl font-bold mb-6 text-glow">
						Accessibility & Performance
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Built with accessibility-first principles and optimized for performance
						across all devices.
					</p>
				</motion.div>

				{/* Features grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="glass-strong rounded-2xl p-6 hover-scale interactive"
						>
							<div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-glow">
								<feature.icon className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-bold mb-3 text-lg">{feature.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Accessibility checklist */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
				>
					<div className="glass-strong rounded-2xl p-8">
						<h3 className="text-2xl font-bold mb-6 text-glow flex items-center gap-3">
							<Eye className="w-6 h-6 text-primary" />
							Accessibility Checklist
						</h3>
						<div className="space-y-4">
							{[
								"Keyboard-focusable controls",
								"Clear focus styles with high contrast",
								"Semantic HTML elements (button, input, etc.)",
								"Screen reader compatible markup",
								"Respects prefers-reduced-motion",
								"WCAG 2.1 AA color contrast ratios",
								"Proper heading hierarchy",
								"Alternative text for interactive elements",
							].map((item, index) => (
								<motion.div
									key={item}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className="flex items-center gap-3"
								>
									<div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
									<span className="text-sm text-muted-foreground">
										{item}
									</span>
								</motion.div>
							))}
						</div>
					</div>

					<div className="glass-strong rounded-2xl p-8">
						<h3 className="text-2xl font-bold mb-6 text-glow flex items-center gap-3">
							<Zap className="w-6 h-6 text-primary" />
							Performance Features
						</h3>
						<div className="space-y-4">
							{[
								"Single-script integration (< 50KB)",
								"Shadow DOM prevents CSS conflicts",
								"No external dependencies",
								"Supports defer attribute",
								"CDN delivery via jsDelivr",
								"Minimal DOM manipulation",
								"Efficient event listeners",
								"Lazy-loaded when needed",
							].map((item, index) => (
								<motion.div
									key={item}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className="flex items-center gap-3"
								>
									<div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
									<span className="text-sm text-muted-foreground">
										{item}
									</span>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Performance stats */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mt-16 glass rounded-2xl p-8 max-w-4xl mx-auto"
				>
					<h3 className="text-xl font-bold mb-8 text-center text-glow">
						Performance Metrics
					</h3>

					<div className="grid md:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-primary mb-2">&lt; 50KB</div>
							<div className="text-sm text-muted-foreground">Script Size</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-primary mb-2">&lt; 100ms</div>
							<div className="text-sm text-muted-foreground">Load Time</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-primary mb-2">100%</div>
							<div className="text-sm text-muted-foreground">Mobile Ready</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-primary mb-2">A+</div>
							<div className="text-sm text-muted-foreground">
								Accessibility
							</div>
						</div>
					</div>
				</motion.div>

				{/* Integration examples */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="mt-16 max-w-4xl mx-auto px-4 overflow-x-auto"
				>
					<h3 className="text-xl font-bold mb-6 text-center">
						Deferred Loading Example
					</h3>
					  <div className="code-block overflow-x-auto px-4">
						<pre className="text-sm leading-relaxed">
							<code>{`<!-- Standard loading -->
<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"></script>

<!-- Deferred loading (recommended) -->
<script defer src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js" 
        mode="dark" 
        brandName="AnyWhere ChatBot"></script>

<!-- Async loading with callback -->
<script>
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js';
  script.onload = () => console.log('Chatbot loaded successfully');
  document.head.appendChild(script);
</script>`}</code>
						</pre>
					</div>
				</motion.div>
			</div>

			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
			</div>
		</section>
	);
};

export default AccessibilityPerformance;