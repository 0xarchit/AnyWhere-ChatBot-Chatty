(function () {
  "use strict";

  const script = document.currentScript;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = script.getAttribute("mode") || (prefersDark ? "dark" : "light");
  const brandName = script.getAttribute("brandName") || "Chatty";
  const systemPrompt =
    script.getAttribute("systemPrompt") ||
    `You are a helpful assistant Your Owner and Builder by 0xArchit for ${brandName}`;
  const rawContextAttr = script.getAttribute("context");
  function parseContextAttr(val) {
    if (val == null) return "toggle";
    const s = String(val)
      .trim()
      .toLowerCase()
      .replace(/^["'{\s]*(.*?)["'}\s]*$/, "$1");
    if (
      s === "" ||
      ["true", "1", "yes", "on", "always", "enable", "enabled"].includes(s)
    )
      return "always";
    if (["false", "0", "no", "off", "never", "disable", "disabled"].includes(s))
      return "never";
    if (["toggle", "auto", "default"].includes(s)) return "toggle";
    return "toggle";
  }
  const contextMode = parseContextAttr(rawContextAttr);

  const apiEndpoint = "https://0xchatbot.zrxarchit.workers.dev/api/chat";

  const container = document.createElement("div");
  container.id = "0xarchit-chatbot-container";
  container.style.cssText = `
        position: fixed;
        bottom: calc(1.5rem + env(safe-area-inset-bottom));
        right: calc(1.5rem + env(safe-area-inset-right));
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 100vw;
        max-height: 100vh;
    `;

  const shadow = container.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        :host {
            all: initial;
            display: block;
        }
        *, *::before, *::after { box-sizing: border-box; }
        [id="0xarchit-chatbot-toggle"] {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            background: ${mode === "dark" ? "#3b82f6" : "#2563eb"};
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        [id="0xarchit-chatbot-toggle"]:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 24px rgba(0, 123, 255, 0.3);
        }
        [id="0xarchit-chatbot-toggle"]:active {
            transform: scale(0.95);
        }
        [id="0xarchit-chatbot-window"] {
            display: none;
            width: clamp(16rem, 28vw, 22rem);
            height: clamp(18rem, 60vh, 30rem);
            max-width: min(22rem, calc(100vw - 2rem));
            max-height: min(30rem, calc(100vh - 2rem));
            background: ${
              mode === "dark"
                ? "rgba(17, 24, 39, 0.95)"
                : "rgba(255, 255, 255, 0.95)"
            };
            border-radius: 1.25rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(12px);
            border: 1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)"
            };
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(1.5rem) scale(0.95);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        [id="0xarchit-chatbot-window"].open {
            display: flex;
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        @supports (height: 100dvh) {
            [id="0xarchit-chatbot-window"] {
                height: clamp(18rem, 60dvh, 30rem);
                max-height: min(30rem, calc(100dvh - 2rem));
            }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
            [id="0xarchit-chatbot-window"], [id="0xarchit-chatbot-toggle"], [class~="0xarchit-message"] {
                transition: none !important;
                animation: none !important;
            }
        }
        [id="0xarchit-chatbot-header"] {
            background: ${mode === "dark" ? "#1f2937" : "#3b82f6"};
            color: ${mode === "dark" ? "#e5e7eb" : "white"};
            padding: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 1rem;
            border-bottom: 1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
        }
        [id="0xarchit-chatbot-close"] {
            background: ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.2)"
            };
            border: 1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)"
            };
            color: inherit;
            font-size: 1.125rem;
            cursor: pointer;
            padding: 0.25rem;
            width: 1.75rem;
            height: 1.75rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        [id="0xarchit-chatbot-close"]:hover {
            transform: scale(1.1);
        }
        [id="0xarchit-chatbot-messages"] {
            flex: 1;
            overflow-y: auto;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            scrollbar-width: thin;
            scrollbar-color: ${
              mode === "dark"
                ? "#3b82f6 rgba(255, 255, 255, 0.1)"
                : "#2563eb rgba(0, 0, 0, 0.1)"
            };
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
        }
        [id="0xarchit-chatbot-messages"]::-webkit-scrollbar {
            width: 4px;
        }
        [id="0xarchit-chatbot-messages"]::-webkit-scrollbar-track {
            background: ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
        }
        [id="0xarchit-chatbot-messages"]::-webkit-scrollbar-thumb {
            background: ${mode === "dark" ? "#3b82f6" : "#2563eb"};
            border-radius: 2px;
        }
        [class~="0xarchit-message"] {
            max-width: 80%;
            padding: 0.75rem 1rem;
            border-radius: 1.25rem;
            word-wrap: break-word;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeInUp 0.3s ease forwards;
            backdrop-filter: blur(8px);
            font-size: 0.875rem;
            line-height: 1.25rem;
        }
        [class~="0xarchit-message"].user {
            align-self: flex-end;
            background: ${mode === "dark" ? "#3b82f6" : "#2563eb"} !important;
            color: white !important;
        }
        [class~="0xarchit-message"].bot {
            align-self: flex-start;
            background: ${
              mode === "dark"
                ? "rgba(75, 85, 99, 0.9)"
                : "rgba(229, 231, 235, 0.9)"
            } !important;
            color: ${mode === "dark" ? "#f9fafb" : "#111827"} !important;
        }
        [class~="0xarchit-message"].typing {
            align-self: flex-start;
            background: ${
              mode === "dark"
                ? "rgba(75, 85, 99, 0.9)"
                : "rgba(229, 231, 235, 0.9)"
            };
            color: ${mode === "dark" ? "#f9fafb" : "#111827"};
            animation: pulse 1.5s infinite;
        }
        [id="0xarchit-chatbot-input-container"] {
            padding: 1.25rem;
            border-top: 1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            background: ${
              mode === "dark"
                ? "rgba(17, 24, 39, 0.5)"
                : "rgba(255, 255, 255, 0.5)"
            };
            backdrop-filter: blur(8px);
            padding-bottom: calc(1.25rem + env(safe-area-inset-bottom));
        }
        [id="0xarchit-chatbot-input"] {
            flex: 1;
            min-width: 0;
            padding: 0.75rem 1rem;
            border: 1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)"
            };
            border-radius: 1.5rem;
            background: ${
              mode === "dark"
                ? "rgba(55, 65, 81, 0.5)"
                : "rgba(243, 244, 246, 0.5)"
            };
            color: ${mode === "dark" ? "#e5e7eb" : "#1f2937"};
            outline: none;
            font-size: 0.875rem;
            transition: all 0.2s ease;
        }
        [id="0xarchit-chatbot-input"]:focus {
            border-color: ${mode === "dark" ? "#3b82f6" : "#2563eb"};
            box-shadow: 0 0 0 3px ${
              mode === "dark"
                ? "rgba(59, 130, 246, 0.2)"
                : "rgba(37, 99, 235, 0.2)"
            };
        }
        [id="0xarchit-chatbot-send"], [id="0xarchit-chatbot-context"] {
            background: ${mode === "dark" ? "#3b82f6" : "#2563eb"};
            color: white;
            border: none;
            border-radius: 1.5rem;
            padding: 0.5rem 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-size: 0.875rem;
        }
        [id="0xarchit-chatbot-send"][disabled] {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }
        [id="0xarchit-chatbot-input"][disabled] {
            opacity: 0.8;
            cursor: not-allowed;
        }
        [id="0xarchit-chatbot-send"] {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
        }
        [id="0xarchit-chatbot-context"] {
            min-width: fit-content;
        }
        [id="0xarchit-chatbot-context"].active {
            background: ${mode === "dark" ? "#ef4444" : "#dc2626"};
        }
        [id="0xarchit-chatbot-send"]:hover, [id="0xarchit-chatbot-context"]:hover {
            background: ${mode === "dark" ? "#2563eb" : "#1d4ed8"};
            transform: scale(1.05);
        }
        [id="0xarchit-chatbot-send"][disabled]:hover {
            background: ${mode === "dark" ? "#3b82f6" : "#2563eb"};
        }
        [id="0xarchit-chatbot-context"].active:hover {
            background: ${mode === "dark" ? "#dc2626" : "#b91c1c"};
        }
        [id="0xarchit-chatbot-footer"] {
            padding: 0.75rem 1.25rem;
            text-align: center;
            font-size: 0.75rem;
            color: ${mode === "dark" ? "#9ca3af" : "#6b7280"};
            background: transparent;
            border-top: 1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
        }
        [id="0xarchit-chatbot-footer"] a {
            color: ${mode === "dark" ? "#3b82f6" : "#2563eb"};
            text-decoration: none;
            font-weight: 500;
        }
        [id="0xarchit-chatbot-footer"] a:hover {
            text-decoration: underline;
        }
        @media (max-width: 480px) {
            [id="0xarchit-chatbot-toggle"] {
                width: 3rem;
                height: 3rem;
                font-size: 1.25rem;
            }
            [id="0xarchit-chatbot-window"] {
                width: min(calc(100vw - 1rem), 22rem);
                height: min(calc(100vh - 1rem - env(safe-area-inset-top) - env(safe-area-inset-bottom)), 28rem);
                border-radius: 1rem;
            }
            @supports (height: 100dvh) {
                [id="0xarchit-chatbot-window"] {
                    height: min(calc(100dvh - 1rem - env(safe-area-inset-top) - env(safe-area-inset-bottom)), 28rem);
                }
            }
            [id="0xarchit-chatbot-header"] {
                padding: 1rem;
                font-size: 0.9375rem;
            }
            [id="0xarchit-chatbot-messages"], [id="0xarchit-chatbot-input-container"] {
                padding: 1rem;
            }
            [id="0xarchit-chatbot-context"] {
                padding: 0.5rem 0.75rem;
                font-size: 0.75rem;
            }
        }
        @media (min-width: 481px) and (max-width: 768px) {
            [id="0xarchit-chatbot-window"] {
                width: clamp(18rem, 32vw, 22rem);
                height: clamp(20rem, 55vh, 28rem);
            }
        }
        @media (pointer: coarse) and (hover: none) {
            [id="0xarchit-chatbot-toggle"] { width: 3.25rem; height: 3.25rem; }
            [id="0xarchit-chatbot-send"] { width: 2.75rem; height: 2.75rem; }
            [id="0xarchit-chatbot-input"] { font-size: 1rem; }
        }
        /* When mobile keyboard opens, allow taller window */
        [id="0xarchit-chatbot-window"].keyboard-open {
            height: min(85vh, 28rem);
            max-height: min(85vh, 28rem);
        }
        @supports (height: 100dvh) {
            [id="0xarchit-chatbot-window"].keyboard-open {
                height: min(85dvh, 28rem);
                max-height: min(85dvh, 28rem);
            }
        }
    `;
  shadow.appendChild(style);

  let chatHistory = JSON.parse(sessionStorage.getItem("chatbotHistory")) || [];
  let isContextEnabled = contextMode === "always";
  let isProcessing = false;

  function capturePageContext() {
    const elements = document.querySelectorAll(
      'body p, body h1, body h2, body h3, body h4, body h5, body h6, body li, body div:not([id="0xarchit-chatbot-container"])'
    );
    let context = "";
    elements.forEach((el) => {
      const text = el.textContent.trim();
      if (text && !el.closest("script, style, noscript")) {
        context += text + " ";
      }
    });
    return context.trim().substring(0, 2000);
  }

  function toggleContext() {
    if (contextMode === "never") return;
    isContextEnabled = !isContextEnabled;
    if (contextBtn) {
      contextBtn.className = `focus:outline-none ${
        isContextEnabled ? "active" : ""
      }`;
      contextBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                      isContextEnabled
                        ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        : "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    }" />
                </svg>
                ${isContextEnabled ? "Stop Context" : "Use Context"}
            `;
    }
    const statusMsg = document.createElement("div");
    statusMsg.className = "0xarchit-message bot";
    statusMsg.textContent = isContextEnabled
      ? "Context enabled! Messages will include webpage content."
      : "Context disabled. Messages will use default prompt.";
    messages.appendChild(statusMsg);
    messages.scrollTop = messages.scrollHeight;
  }

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "0xarchit-chatbot-toggle";
  toggleBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>';
  toggleBtn.className = "focus:outline-none";
  toggleBtn.addEventListener("click", () => {
    const isVisible = chatWindow.classList.contains("open");
    if (isVisible) {
      chatWindow.classList.remove("open");
      setTimeout(() => {
        chatWindow.style.display = "none";
      }, 400);
    } else {
      chatWindow.style.display = "flex";
      chatWindow.offsetHeight;
      setTimeout(() => {
        chatWindow.classList.add("open");
        renderChatHistory();
      }, 10);
    }
  });

  const chatWindow = document.createElement("div");
  chatWindow.id = "0xarchit-chatbot-window";
  chatWindow.className = "flex flex-col";

  const header = document.createElement("div");
  header.id = "0xarchit-chatbot-header";
  header.className = "flex items-center justify-between";
  header.innerHTML = `
        <span>${brandName}</span>
    <button id="0xarchit-chatbot-close" aria-label="Close Chatbot">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    `;
  header
    .querySelector('[id="0xarchit-chatbot-close"]')
    .addEventListener("click", () => {
      chatWindow.classList.remove("open");
      setTimeout(() => {
        chatWindow.style.display = "none";
      }, 400);
    });

  const messages = document.createElement("div");
  messages.id = "0xarchit-chatbot-messages";
  messages.className = "flex-1 overflow-y-auto";

  function renderChatHistory() {
    messages.innerHTML = "";
    if (chatHistory.length === 0) {
      const initialMsg = document.createElement("div");
      initialMsg.className = "0xarchit-message bot";
      initialMsg.textContent = `Hello from ${brandName}! How can I help you today?`;
      messages.appendChild(initialMsg);
    } else {
      chatHistory.forEach((msg) => {
        const msgElement = document.createElement("div");
        msgElement.className = `0xarchit-message ${msg.role}`;
        msgElement.style.cssText = `
                    background: ${
                      msg.role === "user"
                        ? mode === "dark"
                          ? "#3b82f6"
                          : "#2563eb"
                        : mode === "dark"
                        ? "rgba(75, 85, 99, 0.9)"
                        : "rgba(229, 231, 235, 0.9)"
                    };
                    color: ${
                      msg.role === "user"
                        ? "white"
                        : mode === "dark"
                        ? "#f9fafb"
                        : "#111827"
                    };
                    align-self: ${
                      msg.role === "user" ? "flex-end" : "flex-start"
                    };
                    max-width: 80%;
                    padding: 0.75rem 1rem;
                    border-radius: 1.25rem;
                    word-wrap: break-word;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    backdrop-filter: blur(8px);
                `;
        msgElement.textContent = msg.content;
        messages.appendChild(msgElement);
      });
    }
    messages.scrollTop = messages.scrollHeight;
  }
  renderChatHistory();

  const inputContainer = document.createElement("div");
  inputContainer.id = "0xarchit-chatbot-input-container";
  inputContainer.className = "flex items-center flex-wrap";

  const input = document.createElement("input");
  input.id = "0xarchit-chatbot-input";
  input.type = "text";
  input.placeholder = "Type your message...";
  input.className = "focus:ring-0";
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
  function handleKeyboard(open) {
    if (open) {
      chatWindow.classList.add("keyboard-open");
      setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
      }, 0);
    } else {
      chatWindow.classList.remove("keyboard-open");
    }
  }
  input.addEventListener("focus", () => handleKeyboard(true));
  input.addEventListener("blur", () => handleKeyboard(false));
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      if (
        document.activeElement === input &&
        chatWindow.classList.contains("open")
      ) {
        handleKeyboard(true);
      }
    });
  }

  let contextBtn = null;
  if (contextMode === "toggle") {
    contextBtn = document.createElement("button");
    contextBtn.id = "0xarchit-chatbot-context";
    contextBtn.className = "focus:outline-none";
    contextBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Use Context
        `;
    contextBtn.addEventListener("click", toggleContext);
  }

  const sendBtn = document.createElement("button");
  sendBtn.id = "0xarchit-chatbot-send";
  sendBtn.className = "focus:outline-none";
  sendBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>';
  sendBtn.addEventListener("click", sendMessage);

  const footer = document.createElement("div");
  footer.id = "0xarchit-chatbot-footer";
  footer.innerHTML =
    'Made by <a href="https://0xarchit.carrd.co" target="_blank" rel="noopener">0xarchit</a>';

  if (contextBtn) inputContainer.appendChild(contextBtn);
  inputContainer.appendChild(input);
  inputContainer.appendChild(sendBtn);
  chatWindow.appendChild(header);
  chatWindow.appendChild(messages);
  chatWindow.appendChild(inputContainer);
  chatWindow.appendChild(footer);

  if (contextMode !== "toggle") {
    const statusMsg = document.createElement("div");
    statusMsg.className = "0xarchit-message bot";
    statusMsg.textContent = isContextEnabled
      ? "Context is always enabled for this chatbot."
      : "Context is disabled for this chatbot.";
    messages.appendChild(statusMsg);
  }
  shadow.appendChild(toggleBtn);
  shadow.appendChild(chatWindow);

  document.body.appendChild(container);

  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("chatbotHistory");
  });

  async function sendMessage() {
    if (isProcessing) return;
    const text = input.value.trim();
    if (!text) return;
    isProcessing = true;
    input.disabled = true;
    sendBtn.disabled = true;
    sendBtn.setAttribute("aria-disabled", "true");

    const userMsg = document.createElement("div");
    userMsg.className = "0xarchit-message user";
    userMsg.textContent = text;
    messages.appendChild(userMsg);
    chatHistory.push({ role: "user", content: text });
    sessionStorage.setItem("chatbotHistory", JSON.stringify(chatHistory));
    messages.scrollTop = messages.scrollHeight;

    const typing = document.createElement("div");
    typing.className = "0xarchit-message bot typing";
    typing.textContent = "Typing...";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    input.value = "";

    try {
      const pageContext = isContextEnabled ? capturePageContext() : "";

      function buildMessagesPayload(history, sysPrompt, ctx) {
        const payload = [{ role: "system", content: sysPrompt }];
        if (!history || history.length === 0) return payload;
        const lastIdx = history.length - 1;
        for (let i = 0; i < lastIdx; i++) payload.push(history[i]);
        const last = history[lastIdx];
        if (last && last.role === "user" && ctx) {
          payload.push({
            role: "user",
            content: `${last.content}\n\n[Webpage context]\n${ctx}`,
          });
        } else {
          payload.push(last);
        }
        return payload;
      }

      const messagesPayload = buildMessagesPayload(
        chatHistory,
        systemPrompt,
        pageContext
      );

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-chatty": "chatty-init",
        },
        body: JSON.stringify({
          messages: messagesPayload,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      messages.removeChild(typing);

      const botMsg = document.createElement("div");
      botMsg.className = "0xarchit-message bot";
      botMsg.textContent = data.trim() || "Sorry, I didn't catch that.";
      messages.appendChild(botMsg);
      chatHistory.push({ role: "assistant", content: data.trim() });
      sessionStorage.setItem("chatbotHistory", JSON.stringify(chatHistory));
      messages.scrollTop = messages.scrollHeight;
    } catch (error) {
      console.error("Chatbot error:", error);
      messages.removeChild(typing);
      const botMsg = document.createElement("div");
      botMsg.className = "0xarchit-message bot";
      botMsg.textContent = "Oops, something went wrong. Try again!";
      messages.appendChild(botMsg);
      chatHistory.push({
        role: "assistant",
        content: "Oops, something went wrong. Try again!",
      });
      sessionStorage.setItem("chatbotHistory", JSON.stringify(chatHistory));
      messages.scrollTop = messages.scrollHeight;
    } finally {
      isProcessing = false;
      input.disabled = false;
      sendBtn.disabled = false;
      sendBtn.removeAttribute("aria-disabled");
      input.focus();
    }
  }
})();
