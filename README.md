# AnyWhere Chatbot — Chatty
[![GitHub stars](https://img.shields.io/github/stars/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square&logo=github)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/stargazers)
[![Issues](https://img.shields.io/github/issues/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty)
[![Repo Size](https://img.shields.io/github/repo-size/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty)
[![Forks](https://img.shields.io/github/forks/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/network/members)
[![Open PRs](https://img.shields.io/github/issues-pr/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty/pulls)
[![Top Language](https://img.shields.io/github/languages/top/0xarchit/AnyWhere-ChatBot-Chatty?style=flat-square)](https://github.com/0xarchit/AnyWhere-ChatBot-Chatty)
[![Website Status](https://img.shields.io/website-up-down-green-red/https/chatty.0xarchit.is-a.dev/?style=flat-square)](https://chatty.0xarchit.is-a.dev)


AnyWhere Chatbot ("Chatty") is a lightweight, drop-in JavaScript widget that adds a floating, context-aware chatbot to any website. The widget is delivered as a single script via Jsdelivr cdn. Chatty supports customizable branding, theme mode, system prompt, and optional page context capture.

**Quick Start**
- **Install:** Add the script tag to any page near the end of the `body`.

		```html
		<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"
			mode="dark"
			brandName="AnyWhere ChatBot"
			systemPrompt="You are testing chatbot for AnyWhere Chatbot created and owned by 0xArchit."
			context="toggle"></script>
		```


**How it Works**
- The script creates a floating chat toggle in the bottom-right of the page and opens a compact chat window when clicked.
- It uses a Shadow DOM to encapsulate styles and markup so it won't clash with your site's CSS.
- Chat history is stored in `sessionStorage` under the key `chatbotHistory` for the current browser session.
- Optionally the widget can capture a lightweight page context (title, metadata and nearby text snippets) and include that with user messages to improve relevance.

**Script Attributes (options)**
- **`mode`**: Set the visual theme. Accepted values: `"dark"` or `"light"`. If omitted, Chatty prefers the user's `prefers-color-scheme` setting. Example: `mode="dark"`.
- **`brandName`**: A short name shown in the chat header. Default: `Chatty`. Example: `brandName="AnyWhere ChatBot"`.
- **`systemPrompt`**: The assistant system prompt used to guide the model's behaviour. Provide a short descriptive instruction. Example: `systemPrompt="You are a helpful assistant for AnyWhere ChatBot."
	`

- **`context`**: Controls page context capture. Accepts values such as `true`, `false`, `toggle`. For convenience, the following are also understood: `yes/no`, `on/off`, `1/0`, `always/never`, `auto/default/toggle`. Internally these map to one of three modes:
	- `always` → include page context with every request (e.g., `context="true"`, `context="yes"`, `context="always"`).
	- `never` → never include page context (e.g., `context="false"`, `context="no"`, `context="never"`).
	- `toggle` → show a small context toggle in the chat UI so visitors can enable/disable context per session (e.g., `context="toggle"`, `context="auto"`, omitted attribute).

Example attribute usage: `context="toggle"`, `context="true"`, `context="false"`, `context="always"`, `context="never"`.

**Examples**
- Minimal (defaults):

	```html
	<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"></script>
	```

- Custom brand and light mode:

		```html
		<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"
			mode="light"
			brandName="SupportBot"></script>
		```

- Context always enabled with a custom system prompt:

		```html
		<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"
			context="true"
			systemPrompt="You are a friendly support assistant for ExampleCorp."></script>
		```

- Programmatic insertion (useful when loading scripts conditionally):

	```html
	<script>
		const s = document.createElement('script');
		s.src = 'https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js';
		s.setAttribute('mode', 'dark');
		s.setAttribute('brandName', 'AnyWhere ChatBot');
		document.body.appendChild(s);
	</script>
	```

- Force context off (no page text captured):

	```html
	<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js" context="false"></script>
	```

- Toggleable context with a different brand and light mode:

		```html
		<script src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js"
			mode="light"
			brandName="AnyWhere ChatBot"
			context="toggle"></script>
		```

- Self-hosted CDN path example:

	```html
	<script src="https://cdn.example.com/widgets/chatty.js"
	mode="dark"
	brandName="AnyWhere ChatBot"
	systemPrompt="You are a helpful assistant for AnyWhere ChatBot."></script>
	```

- Defer loading via `defer` attribute so it doesn't block rendering:

	```html
	<script defer src="https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js" mode="dark"></script>
	```

- Programmatically set attributes including context mode:

	```html
	<script>
		const s = document.createElement('script');
		s.src = 'https://cdn.jsdelivr.net/gh/0xarchit/AnyWhere-ChatBot-Chatty@1.0.0/chatty.min.js';
		s.setAttribute('mode', 'dark');
		s.setAttribute('brandName', 'AnyWhere ChatBot');
		s.setAttribute('context', 'always'); // also accepts: toggle/never/true/false/default
		s.setAttribute('systemPrompt', 'You are a friendly support assistant.');
		document.body.appendChild(s);
	</script>
	```

**Customization & Theming**
- `mode` controls the built-in dark/light palette. Because Chatty uses Shadow DOM, your site CSS won't affect the widget. If you want to change the widget visuals you'll need to modify the script.
- `brandName` and `systemPrompt` are the easiest ways to adapt the assistant to your site and tone of voice.
- The input placeholder and button icons come from the script; editing them requires changing the `chatty.js` source.

Tip: If you plan to support multiple themes later, consider wrapping your overrides in CSS custom properties and reading them inside the widget (requires editing `chatty.js`).

**Privacy & Data Handling**
- Chatty may send user messages (and optionally captured page context) to the configured backend or third-party API defined inside the script. In the distributed `chatty.js` the variable `apiEndpoint` points to an external service — confirm and host or modify this endpoint to a service you control if you have privacy requirements.
- Do not enable `context="true"` on pages that contain sensitive personal data unless you are sure the backend is acceptable for such data.
- Chat history is stored only in the browser session (`sessionStorage`) and is not persisted to the cdn server by the widget itself.

Configuration notes:
- The page context captured is plain text from visible elements (headings, paragraphs, list items, etc.) and trimmed to a safe length; it excludes content inside `script`, `style`, and `noscript`.
- Only one Chatty instance is intended per page. If you add multiple script tags, the last one runs and creates one widget.

**Accessibility**
- The widget uses semantic elements and keyboard-focusable controls. It includes a toggle button that can be activated with keyboard and has visually distinct focus styles.
- If your page has strict accessibility requirements, verify contrast and focus order with your auditing tools and adjust the hosted script as needed.

**Troubleshooting**
- Chat button does not appear:
	- Confirm the script `src` URL is correct and the CDN is serving the file.
	- Check the browser console for syntax errors or blocked cross-origin requests (CSP).
- Chat opens but messages don't send:
	- Inspect the network tab to see if requests are hitting the configured `apiEndpoint`.
	- Confirm the remote API accepts the payload and CORS is configured.
- Context toggle not visible or not working:
	- If `context` is set to `true`/`always` or `false`/`never` the toggle will be forced on/off. Use `context="toggle"` (or `auto`/omit) for a visible toggle.
- Clearing chat history:
	- Open developer console and run: `sessionStorage.removeItem('chatbotHistory')`.

**Developer Notes**
- The widget creates a container with id `0xarchit-chatbot-container` and uses Shadow DOM for isolation.
- Chat messages are rendered inside an element with id `0xarchit-chatbot-messages` and history is read from / written to `sessionStorage`.
 - When context is enabled, the page text is appended to the last user message in the payload sent to the API, keeping the on-screen chat history clean.

**Contributing & Support**
- To contribute or customize, edit `chatty.js` and test locally by loading `main.html` in your browser.
- For help integrating on specific platforms (WordPress, Shopify, etc.), open an issue or create a fork with platform-specific examples.


## Future Goals

- Multi-theme support: built-in themes (e.g., primary colors, compact/comfortable density) and a `theme` attribute.
- Custom theming API: CSS custom properties and/or a lightweight config object to override palette, shapes, and spacing without editing the script.
- Markdown rendering for assistant messages (links, code blocks, lists) with safe sanitization.
- Streaming responses for faster perceived latency and typing effect.
- Internationalization (i18n): UI strings and placeholder configurable via attributes; RTL layout support.
- Persistence options: opt-in localStorage persistence and export/import chat transcripts.

## License
See [License](License)