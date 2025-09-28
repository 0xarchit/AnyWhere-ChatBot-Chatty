import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, HelpCircle, Settings, Wifi } from "lucide-react";

const faqs = [
	{
		icon: AlertTriangle,
		question: "Button not appearing",
		answer: "Verify script src, CDN availability, console errors, CSP rules.",
		details: [
			"Check the script src URL is correct: https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js",
			"Ensure CDN is accessible and not blocked by your network",
			"Open browser console (F12) and look for JavaScript errors",
			"Check Content Security Policy (CSP) headers allow script execution",
			"Verify the script is being loaded after the DOM is ready",
		],
		solution: `// Debug checklist:
console.log('Script loaded:', !!window.chatbotLoaded);
// Check for CSP errors in console
// Test CDN directly in browser`,
	},
	{
		icon: Wifi,
		question: "Messages not sending",
		answer: "Check network calls to apiEndpoint and CORS settings.",
		details: [
			"Open Network tab in Developer Tools",
			"Send a test message and check for failed requests",
			"Verify the API endpoint is responding (200 status)",
			"Check CORS headers: Access-Control-Allow-Origin",
			"Ensure API accepts POST requests with JSON payload",
		],
		solution: `// Test API endpoint manually:
fetch('https://your-api-endpoint.com/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'test' })
})`,
	},
	{
		icon: Settings,
		question: "Context toggle missing",
		answer: "Context forced by always/never; use toggle/auto/omit for visible toggle.",
		details: [
			"If context='always' or context='true', toggle is hidden (always on)",
			"If context='never' or context='false', toggle is hidden (always off)",
			"Use context='toggle', context='auto', or omit attribute for visible toggle",
			"The toggle appears in the chat header when context mode allows user control",
		],
		solution: `<!-- Show context toggle -->
<script src="..." context="toggle"></script>

<!-- Or omit for default behavior -->
<script src="..."></script>`,
	},
	{
		icon: HelpCircle,
		question: "Clear session history",
		answer: "sessionStorage.removeItem('chatbotHistory').",
		details: [
			"Chat history is stored in browser's sessionStorage",
			"Data persists only for the current tab session",
			"Closing the tab automatically clears the history",
			"Use removeItem() method to clear manually",
			"No server-side storage by default",
		],
		solution: `// Clear chat history programmatically:
sessionStorage.removeItem('chatbotHistory');

// Or clear all session storage:
sessionStorage.clear();`,
	},
];

const Troubleshooting = () => {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	return (
		<section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl font-bold mb-6 text-glow">Troubleshooting</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Common issues and solutions to get AnyWhere Chatbot working perfectly on your site.
					</p>
				</motion.div>

				<div className="max-w-4xl mx-auto space-y-6">
					{faqs.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="glass-strong rounded-2xl overflow-hidden"
						>
							<button
								onClick={() => toggleFaq(index)}
								className="w-full p-6 text-left flex items-center justify-between hover:bg-card-glass/50 transition-all interactive"
							>
								<div className="flex items-center gap-4">
									<div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
										<faq.icon className="w-5 h-5 text-white" />
									</div>
									<div>
										<h3 className="font-bold text-lg">{faq.question}</h3>
										<p className="text-muted-foreground text-sm">{faq.answer}</p>
									</div>
								</div>
								<div className="transition-transform duration-300">
									{openFaq === index ? (
										<ChevronUp className="w-5 h-5 text-primary" />
									) : (
										<ChevronDown className="w-5 h-5 text-muted-foreground" />
									)}
								</div>
							</button>

							<motion.div
								initial={false}
								animate={{
									height: openFaq === index ? "auto" : 0,
									opacity: openFaq === index ? 1 : 0,
								}}
								transition={{ duration: 0.3 }}
								className="overflow-hidden"
							>
								<div className="px-6 pb-6">
									<div className="border-t border-card-border pt-6">
										{/* Detailed steps */}
										<div className="mb-6">
											<h4 className="font-semibold text-primary mb-3">
												Step-by-step solution:
											</h4>
											<ul className="space-y-2">
												{faq.details.map((detail, detailIndex) => (
													<li
														key={detailIndex}
														className="flex items-start gap-2 text-sm text-muted-foreground"
													>
														<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
														<span>{detail}</span>
													</li>
												))}
											</ul>
										</div>

										{/* Code solution */}
										<div className="code-block">
											<pre className="text-sm leading-relaxed overflow-x-auto">
												<code>{faq.solution}</code>
											</pre>
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Additional help section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="mt-16 glass rounded-2xl p-8 text-center max-w-3xl mx-auto"
				>
					<h3 className="text-2xl font-bold mb-4 text-glow">Need More Help?</h3>
					<p className="text-muted-foreground mb-6">
						Can't find the solution you're looking for? Check out these resources or get in touch.
					</p>

					<div className="grid md:grid-cols-3 gap-4">
						<a
							href="https://github.com/0xarchit/AnyWhere-ChatBot-Chatty"
							target="_blank"
							rel="noopener noreferrer"
							className="glass rounded-lg p-4 hover-scale interactive transition-all hover:border-primary/30"
						>
							<div className="font-semibold text-primary mb-1">GitHub Repository</div>
							<div className="text-sm text-muted-foreground">
								Source code and issues
							</div>
						</a>

						<a
							href="https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/blob/main/README.md"
							target="_blank"
							rel="noopener noreferrer"
							className="glass rounded-lg p-4 hover-scale interactive transition-all hover:border-primary/30"
						>
							<div className="font-semibold text-primary mb-1">Documentation</div>
							<div className="text-sm text-muted-foreground">
								Complete setup guide
							</div>
						</a>

						<a
							href="https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/issues"
							target="_blank"
							rel="noopener noreferrer"
							className="glass rounded-lg p-4 hover-scale interactive transition-all hover:border-primary/30"
						>
							<div className="font-semibold text-primary mb-1">Report Issue</div>
							<div className="text-sm text-muted-foreground">Get support</div>
						</a>
					</div>
				</motion.div>

				{/* Quick debug checklist */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mt-12 glass-strong rounded-2xl p-8 max-w-4xl mx-auto"
				>
					<h3 className="text-xl font-bold mb-6 text-center text-glow">
						Quick Debug Checklist
					</h3>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h4 className="font-semibold text-primary mb-4">
								Before Integration
							</h4>
							<div className="space-y-2">
								{[
									"Test CDN URL in browser",
									"Check CSP policies",
									"Verify HTTPS/HTTP compatibility",
									"Review CORS requirements",
								].map((item, index) => (
									<div
										key={index}
										className="flex items-center gap-2 text-sm"
									>
										<div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
										<span className="text-muted-foreground">{item}</span>
									</div>
								))}
							</div>
						</div>

						<div>
							<h4 className="font-semibold text-primary mb-4">
								After Integration
							</h4>
							<div className="space-y-2">
								{[
									"Open browser console (F12)",
									"Check network requests",
									"Test chat functionality",
									"Verify context toggle behavior",
								].map((item, index) => (
									<div
										key={index}
										className="flex items-center gap-2 text-sm"
									>
										<div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
										<span className="text-muted-foreground">{item}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Background decoration */}
			<div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-5"></div>
		</section>
	);
};

export default Troubleshooting;