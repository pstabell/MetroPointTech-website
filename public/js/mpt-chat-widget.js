/**
 * Metro Point Technology AI Chat Widget - Embed Script
 * 
 * Drop-in script for adding the AI chat widget to MetroPointTechnology.com
 * 
 * Usage:
 * <script src="/js/mpt-chat-embed.js"></script>
 * <script>MPTChat.init({ apiUrl: 'your-api-url' });</script>
 */

(function() {
  'use strict';

  // Prevent multiple initialization
  if (window.MPTChat) {
    console.warn('MPT Chat widget already initialized');
    return;
  }

  // Default configuration
  const DEFAULT_CONFIG = {
    apiUrl: 'https://api.metropointtechnology.com/chat',
    primaryColor: '#1D4ED8',
    position: 'bottom-right',
    autoOpen: false,
    showWelcome: true,
    enableAnalytics: true,
    mobileBreakpoint: 768,
    debug: false
  };

  class MPTChatWidget {
    constructor(config = {}) {
      this.config = { ...DEFAULT_CONFIG, ...config };
      this.isOpen = false;
      this.messages = [];
      this.userInfo = {};
      this.isLoading = false;
      this.container = null;
      
      this.init();
    }

    init() {
      // Wait for DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.create());
      } else {
        this.create();
      }
    }

    create() {
      this.log('Initializing MPT Chat Widget');
      
      // Create container
      this.container = document.createElement('div');
      this.container.id = 'mpt-chat-widget-container';
      this.container.innerHTML = this.getWidgetHTML();
      
      // Add styles
      this.injectCSS();
      
      // Append to body
      document.body.appendChild(this.container);
      
      // Bind events
      this.bindEvents();
      
      // Auto-open if configured
      if (this.config.autoOpen) {
        setTimeout(() => this.open(), 2000);
      }
      
      // Initialize welcome message
      if (this.config.showWelcome) {
        this.addWelcomeMessage();
      }

      // Track initialization
      this.trackEvent('widget_initialized');
      
      this.log('MPT Chat Widget ready');
    }

    getWidgetHTML() {
      return `
        <div class="mpt-chat-widget ${this.config.position} closed" style="--primary-color: ${this.config.primaryColor}">
          <!-- Chat Button -->
          <button class="chat-toggle-button" id="mpt-chat-toggle" aria-label="Open Metro Point Technology Chat">
            <div class="chat-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="pulse-ring"></div>
          </button>

          <!-- Chat Window -->
          <div class="chat-window" id="mpt-chat-window" style="display: none;">
            <!-- Header -->
            <div class="chat-header">
              <div class="header-content">
                <div class="avatar">
                  <div class="mpt-logo">MPT</div>
                </div>
                <div class="header-text">
                  <h3>Metro Point Technology</h3>
                  <p class="status">
                    <span class="online-indicator"></span>
                    Online • Insurance Software Experts
                  </p>
                </div>
              </div>
              <button class="close-button" id="mpt-chat-close" aria-label="Close chat">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14M4 4L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <!-- Messages -->
            <div class="messages-container" id="mpt-messages">
              <!-- Messages will be inserted here -->
            </div>

            <!-- Input -->
            <div class="chat-input">
              <div class="input-container">
                <textarea 
                  id="mpt-chat-input" 
                  placeholder="Ask about our insurance software..." 
                  rows="1" 
                  maxlength="500"
                ></textarea>
                <button id="mpt-chat-send" class="send-button" aria-label="Send message">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="powered-by">Powered by Metro Point Technology AI</div>
            </div>
          </div>
        </div>
      `;
    }

    injectCSS() {
      if (document.getElementById('mpt-chat-styles')) return;
      
      const styleSheet = document.createElement('style');
      styleSheet.id = 'mpt-chat-styles';
      styleSheet.textContent = this.getCSS();
      document.head.appendChild(styleSheet);
    }

    getCSS() {
      return `
        /* Metro Point Technology Chat Widget Styles - Embedded Version */
        .mpt-chat-widget {
          position: fixed !important;
          z-index: 999999 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          --primary-color: #1D4ED8;
          --primary-dark: #1E40AF;
          --primary-light: #3B82F6;
          --secondary-color: #F8FAFC;
          --text-color: #1F2937;
          --text-light: #6B7280;
          --border-color: #E5E7EB;
          --border-radius: 12px;
          --shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .mpt-chat-widget.bottom-right { bottom: 20px !important; right: 20px !important; }
        .mpt-chat-widget.bottom-left { bottom: 20px !important; left: 20px !important; }
        .mpt-chat-widget.top-right { top: 20px !important; right: 20px !important; }
        .mpt-chat-widget.top-left { top: 20px !important; left: 20px !important; }

        .mpt-chat-widget .chat-toggle-button {
          width: 64px !important;
          height: 64px !important;
          border-radius: 50% !important;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)) !important;
          border: none !important;
          cursor: pointer !important;
          box-shadow: var(--shadow) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .mpt-chat-widget .chat-toggle-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }

        .mpt-chat-widget .chat-icon { color: white !important; }

        .mpt-chat-widget .pulse-ring {
          position: absolute !important;
          top: -4px !important;
          left: -4px !important;
          right: -4px !important;
          bottom: -4px !important;
          border: 2px solid var(--primary-color) !important;
          border-radius: 50% !important;
          animation: mpt-pulse 2s infinite !important;
          opacity: 0 !important;
        }

        @keyframes mpt-pulse {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 0; }
        }

        .mpt-chat-widget .chat-window {
          width: 380px !important;
          height: 600px !important;
          background: white !important;
          border-radius: var(--border-radius) !important;
          box-shadow: var(--shadow) !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          animation: mpt-slideInUp 0.3s ease-out !important;
        }

        @keyframes mpt-slideInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mpt-chat-widget .chat-header {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)) !important;
          color: white !important;
          padding: 16px 20px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }

        .mpt-chat-widget .header-content {
          display: flex !important;
          align-items: center !important;
          flex: 1 !important;
        }

        .mpt-chat-widget .avatar { margin-right: 12px !important; }

        .mpt-chat-widget .mpt-logo {
          width: 36px !important;
          height: 36px !important;
          background: rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: bold !important;
          font-size: 12px !important;
          color: white !important;
        }

        .mpt-chat-widget .header-text h3 {
          margin: 0 !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          line-height: 1.2 !important;
        }

        .mpt-chat-widget .header-text .status {
          margin: 2px 0 0 0 !important;
          font-size: 12px !important;
          opacity: 0.9 !important;
          display: flex !important;
          align-items: center !important;
        }

        .mpt-chat-widget .online-indicator {
          width: 8px !important;
          height: 8px !important;
          background: #10B981 !important;
          border-radius: 50% !important;
          margin-right: 6px !important;
          animation: mpt-blink 2s infinite !important;
        }

        @keyframes mpt-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.5; }
        }

        .mpt-chat-widget .close-button {
          background: none !important;
          border: none !important;
          color: white !important;
          cursor: pointer !important;
          padding: 8px !important;
          border-radius: 6px !important;
          transition: background-color 0.2s ease !important;
        }

        .mpt-chat-widget .close-button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .mpt-chat-widget .messages-container {
          flex: 1 !important;
          padding: 16px !important;
          overflow-y: auto !important;
          background: #FAFBFC !important;
          scroll-behavior: smooth !important;
        }

        .mpt-chat-widget .messages-container::-webkit-scrollbar { width: 4px !important; }
        .mpt-chat-widget .messages-container::-webkit-scrollbar-track { background: transparent !important; }
        .mpt-chat-widget .messages-container::-webkit-scrollbar-thumb { background: var(--border-color) !important; border-radius: 2px !important; }

        .mpt-chat-widget .message {
          display: flex !important;
          margin-bottom: 16px !important;
          animation: mpt-fadeInUp 0.3s ease-out !important;
        }

        @keyframes mpt-fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mpt-chat-widget .message.user { flex-direction: row-reverse !important; }

        .mpt-chat-widget .message-avatar { margin: 0 8px !important; flex-shrink: 0 !important; }

        .mpt-chat-widget .bot-avatar {
          width: 32px !important;
          height: 32px !important;
          background: var(--primary-color) !important;
          border-radius: 6px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 10px !important;
          font-weight: bold !important;
          color: white !important;
        }

        .mpt-chat-widget .message-content { max-width: 80% !important; display: flex !important; flex-direction: column !important; }

        .mpt-chat-widget .message-text {
          background: white !important;
          padding: 12px 16px !important;
          border-radius: var(--border-radius) !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
          color: var(--text-color) !important;
          line-height: 1.5 !important;
          word-wrap: break-word !important;
        }

        .mpt-chat-widget .message.user .message-text {
          background: var(--primary-color) !important;
          color: white !important;
          margin-left: auto !important;
        }

        .mpt-chat-widget .message-buttons {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px !important;
          margin-top: 12px !important;
        }

        .mpt-chat-widget .action-button {
          background: white !important;
          border: 1px solid var(--border-color) !important;
          color: var(--primary-color) !important;
          padding: 8px 14px !important;
          border-radius: 20px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          white-space: nowrap !important;
        }

        .mpt-chat-widget .action-button:hover {
          background: var(--primary-color) !important;
          color: white !important;
          border-color: var(--primary-color) !important;
          transform: translateY(-1px) !important;
        }

        .mpt-chat-widget .chat-input {
          border-top: 1px solid var(--border-color) !important;
          background: white !important;
          padding: 16px !important;
        }

        .mpt-chat-widget .input-container {
          display: flex !important;
          align-items: flex-end !important;
          background: var(--secondary-color) !important;
          border-radius: 24px !important;
          padding: 8px 12px !important;
          border: 1px solid var(--border-color) !important;
          transition: border-color 0.2s ease !important;
        }

        .mpt-chat-widget .input-container:focus-within {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1) !important;
        }

        .mpt-chat-widget .input-container textarea {
          flex: 1 !important;
          border: none !important;
          background: none !important;
          resize: none !important;
          outline: none !important;
          font-family: inherit !important;
          font-size: 14px !important;
          color: var(--text-color) !important;
          line-height: 1.5 !important;
          max-height: 100px !important;
          padding: 8px 0 !important;
        }

        .mpt-chat-widget .send-button {
          background: var(--primary-color) !important;
          border: none !important;
          color: white !important;
          width: 32px !important;
          height: 32px !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          margin-left: 8px !important;
          flex-shrink: 0 !important;
        }

        .mpt-chat-widget .send-button:disabled {
          background: var(--text-light) !important;
          cursor: not-allowed !important;
          opacity: 0.5 !important;
        }

        .mpt-chat-widget .powered-by {
          text-align: center !important;
          font-size: 10px !important;
          color: var(--text-light) !important;
          margin-top: 8px !important;
          opacity: 0.7 !important;
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .mpt-chat-widget.bottom-right, .mpt-chat-widget.bottom-left {
            bottom: 10px !important; left: 10px !important; right: 10px !important;
          }
          .mpt-chat-widget .chat-window { width: 100% !important; height: 80vh !important; max-height: 600px !important; }
          .mpt-chat-widget .chat-toggle-button { width: 56px !important; height: 56px !important; position: fixed !important; bottom: 20px !important; right: 20px !important; left: auto !important; }
        }

        /* Accessibility */
        .mpt-chat-widget .chat-toggle-button:focus,
        .mpt-chat-widget .close-button:focus,
        .mpt-chat-widget .action-button:focus,
        .mpt-chat-widget .send-button:focus {
          outline: 2px solid var(--primary-color) !important;
          outline-offset: 2px !important;
        }
      `;
    }

    bindEvents() {
      const toggleBtn = document.getElementById('mpt-chat-toggle');
      const closeBtn = document.getElementById('mpt-chat-close');
      const sendBtn = document.getElementById('mpt-chat-send');
      const input = document.getElementById('mpt-chat-input');

      toggleBtn?.addEventListener('click', () => this.toggle());
      closeBtn?.addEventListener('click', () => this.close());
      sendBtn?.addEventListener('click', () => this.sendMessage());
      
      input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      input?.addEventListener('input', () => this.updateSendButton());
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      if (this.isOpen) return;
      
      this.isOpen = true;
      const widget = this.container.querySelector('.mpt-chat-widget');
      const window = document.getElementById('mpt-chat-window');
      const button = document.getElementById('mpt-chat-toggle');
      
      widget?.classList.remove('closed');
      widget?.classList.add('open');
      button.style.display = 'none';
      window.style.display = 'flex';
      
      // Focus input
      setTimeout(() => {
        document.getElementById('mpt-chat-input')?.focus();
      }, 300);

      this.trackEvent('chat_opened');
      this.log('Chat opened');
    }

    close() {
      if (!this.isOpen) return;
      
      this.isOpen = false;
      const widget = this.container.querySelector('.mpt-chat-widget');
      const window = document.getElementById('mpt-chat-window');
      const button = document.getElementById('mpt-chat-toggle');
      
      widget?.classList.remove('open');
      widget?.classList.add('closed');
      window.style.display = 'none';
      button.style.display = 'flex';

      this.trackEvent('chat_closed');
      this.log('Chat closed');
    }

    async sendMessage() {
      const input = document.getElementById('mpt-chat-input');
      const message = input?.value.trim();
      
      if (!message || this.isLoading) return;
      
      // Add user message
      this.addMessage('user', message);
      input.value = '';
      this.updateSendButton();
      
      // Show typing indicator
      this.showTyping();
      
      try {
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            userInfo: this.userInfo,
            context: {
              page: window.location.pathname,
              referrer: document.referrer,
              timestamp: new Date().toISOString(),
              domain: window.location.hostname
            }
          })
        });

        const data = await response.json();
        this.hideTyping();
        
        // Add bot response
        this.addMessage('bot', data.response, data.buttons);
        
        // Update user info if provided
        if (data.userInfo) {
          this.userInfo = { ...this.userInfo, ...data.userInfo };
        }

        this.trackEvent('message_sent', { message: message });

      } catch (error) {
        this.hideTyping();
        this.addMessage('bot', "I'm having trouble connecting right now. Please try again or contact our team at (239) 600-8159.", [
          { text: '🔄 Try Again', action: 'retry' },
          { text: '📞 Contact Sales', action: 'contact' }
        ]);
        
        console.error('MPT Chat API Error:', error);
      }
    }

    addWelcomeMessage() {
      this.addMessage('bot', 
        "👋 Welcome to Metro Point Technology!\n\nI'm here to help you discover how our insurance software can transform your agency operations. Built by agents, for agents — we understand your challenges.\n\n🎯 What brings you here today?", 
        [
          { text: '📊 AMS Platform', action: 'ams_platform' },
          { text: '💰 Commission Tracking', action: 'commission_tracking' },
          { text: '📝 Agent CRM', action: 'agent_crm' },
          { text: '📋 Proposal Generator', action: 'wrap_generator' },
          { text: '🎥 Schedule Demo', action: 'book_demo' },
          { text: '💬 Speak with Sales', action: 'contact_sales' }
        ]
      );
    }

    addMessage(type, content, buttons = null) {
      const container = document.getElementById('mpt-messages');
      if (!container) return;

      const messageId = Date.now();
      const messageEl = document.createElement('div');
      messageEl.className = `message ${type}`;
      messageEl.innerHTML = this.getMessageHTML(type, content, buttons, messageId);
      
      container.appendChild(messageEl);
      container.scrollTop = container.scrollHeight;
      
      // Bind button events
      if (buttons) {
        buttons.forEach((button, index) => {
          const buttonEl = messageEl.querySelector(`[data-action="${button.action}"]`);
          buttonEl?.addEventListener('click', () => this.handleButtonClick(button.action, button.text));
        });
      }

      this.messages.push({ id: messageId, type, content, buttons, timestamp: new Date() });
    }

    getMessageHTML(type, content, buttons, messageId) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const avatar = type === 'bot' ? '<div class="message-avatar"><div class="bot-avatar">MPT</div></div>' : '';
      const buttonsHTML = buttons ? `
        <div class="message-buttons">
          ${buttons.map(btn => `<button class="action-button" data-action="${btn.action}">${btn.text}</button>`).join('')}
        </div>
      ` : '';

      return `
        ${avatar}
        <div class="message-content">
          <div class="message-text">${content.replace(/\n/g, '<br>')}</div>
          ${buttonsHTML}
        </div>
        <div class="message-time">${time}</div>
      `;
    }

    async handleButtonClick(action, text) {
      // Add user message showing what they clicked
      this.addMessage('user', text);
      
      // Show typing indicator
      this.showTyping();
      
      try {
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            userInfo: this.userInfo,
            context: {
              page: window.location.pathname,
              referrer: document.referrer,
              timestamp: new Date().toISOString(),
              domain: window.location.hostname
            }
          })
        });

        const data = await response.json();
        this.hideTyping();
        
        // Add bot response
        this.addMessage('bot', data.response, data.buttons);

        this.trackEvent('button_clicked', { action, text });

      } catch (error) {
        this.hideTyping();
        this.addMessage('bot', "I'm having trouble right now. Please contact our team at (239) 600-8159.");
        console.error('MPT Chat Button Error:', error);
      }
    }

    showTyping() {
      this.isLoading = true;
      const container = document.getElementById('mpt-messages');
      if (!container) return;

      const typingEl = document.createElement('div');
      typingEl.className = 'message bot typing-message';
      typingEl.id = 'typing-indicator';
      typingEl.innerHTML = `
        <div class="message-avatar"><div class="bot-avatar">MPT</div></div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      
      container.appendChild(typingEl);
      container.scrollTop = container.scrollHeight;
      
      this.updateSendButton();
    }

    hideTyping() {
      this.isLoading = false;
      const typingEl = document.getElementById('typing-indicator');
      typingEl?.remove();
      this.updateSendButton();
    }

    updateSendButton() {
      const sendBtn = document.getElementById('mpt-chat-send');
      const input = document.getElementById('mpt-chat-input');
      
      if (sendBtn && input) {
        sendBtn.disabled = !input.value.trim() || this.isLoading;
      }
    }

    trackEvent(eventName, data = {}) {
      if (!this.config.enableAnalytics) return;

      // Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
          event_category: 'mpt_chat',
          event_label: 'chat_widget',
          ...data
        });
      }

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
          event_name: eventName,
          content_category: 'chat_interaction',
          ...data
        });
      }

      this.log(`Event tracked: ${eventName}`, data);
    }

    log(message, data = null) {
      if (this.config.debug) {
        console.log(`[MPT Chat] ${message}`, data);
      }
    }

    // Public API methods
    show() { this.open(); }
    hide() { this.close(); }
    sendUserMessage(message) { 
      if (message) {
        document.getElementById('mpt-chat-input').value = message;
        this.sendMessage();
      }
    }
    updateConfig(newConfig) { 
      this.config = { ...this.config, ...newConfig }; 
    }
    getUserInfo() { return this.userInfo; }
    getMessages() { return this.messages; }
  }

  // Public API
  window.MPTChat = {
    init: function(config = {}) {
      if (window.MPTChat.widget) {
        console.warn('MPT Chat widget already exists');
        return window.MPTChat.widget;
      }
      
      window.MPTChat.widget = new MPTChatWidget(config);
      return window.MPTChat.widget;
    },
    
    show: function() { window.MPTChat.widget?.show(); },
    hide: function() { window.MPTChat.widget?.hide(); },
    sendMessage: function(message) { window.MPTChat.widget?.sendUserMessage(message); },
    
    // Configuration methods
    setConfig: function(config) { window.MPTChat.widget?.updateConfig(config); },
    getConfig: function() { return window.MPTChat.widget?.config; },
    
    // Data methods
    getUserInfo: function() { return window.MPTChat.widget?.getUserInfo(); },
    getMessages: function() { return window.MPTChat.widget?.getMessages(); },
    
    widget: null
  };

  console.log('MPT Chat Widget script loaded. Call MPTChat.init() to initialize.');

})();