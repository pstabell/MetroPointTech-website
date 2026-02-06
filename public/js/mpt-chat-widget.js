/*!
 * Metro Point Technology Insurance Chat Widget
 * For MetroPointTech.com - Insurance Products Focus
 */

(function() {
  'use strict';

  const MPT_CHAT_CONFIG = {
    apiUrl: 'https://mpt-ai-chat-api.vercel.app/api/chat',
    primaryColor: '#003B5C',
    secondaryColor: '#F8FAFC',
    position: 'bottom-right',
    companyName: 'Metro Point Technology',
    businessFocus: 'insurance',
    theme: 'professional'
  };

  // Insurance-focused greeting
  const CHAT_MESSAGES = {
    welcome: `Hey! 👋 I'm Metro Bot — built BY insurance pros, FOR insurance pros.

Tired of chasing carrier statements? Wondering if you got paid right? I totally get it.

What's your biggest headache right now?`,
    
    buttons: [
      { text: '💰 Commission tracking', action: 'commission_tracking' },
      { text: '📋 Agency management', action: 'ams_platform' },
      { text: '📞 Talk to our team', action: 'contact_sales' }
    ]
  };

  const styles = `
    .mpt-chat-widget {
      --primary-color: #003B5C;
      --primary-hover: #002940;
      --accent-color: #D4AF37;
      --secondary-color: #F8FAFC;
      --text-color: #1F2937;
      --border-color: #E5E7EB;
      --success-color: #059669;
      --font-family: 'Inter', system-ui, -apple-system, sans-serif;
      --border-radius: 12px;
      --shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: var(--font-family);
    }

    .mpt-chat-widget * { box-sizing: border-box; }

    .mpt-chat-widget .chat-toggle-button {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .mpt-chat-widget .chat-toggle-button:hover {
      transform: scale(1.05);
    }

    .mpt-chat-widget .pulse-animation {
      position: absolute;
      top: -2px; left: -2px; right: -2px; bottom: -2px;
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      animation: mpt-pulse 2s infinite;
    }

    @keyframes mpt-pulse {
      0% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.1); opacity: 0.3; }
      100% { transform: scale(1.2); opacity: 0; }
    }

    .mpt-chat-widget .chat-window {
      width: 380px;
      height: 550px;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 16px;
      transform: scale(0.95);
      opacity: 0;
      transition: all 0.3s ease;
    }

    .mpt-chat-widget.open .chat-window {
      transform: scale(1);
      opacity: 1;
    }

    .mpt-chat-widget .chat-header {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mpt-chat-widget .header-content {
      display: flex;
      align-items: center;
    }

    .mpt-chat-widget .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-weight: 600;
      font-size: 14px;
    }

    .mpt-chat-widget .header-text h3 {
      margin: 0 0 2px 0;
      font-size: 15px;
      font-weight: 600;
      color: #FFFFFF !important;
    }

    .mpt-chat-widget .header-text p {
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9) !important;
    }

    .mpt-chat-widget .status-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--success-color);
      border-radius: 50%;
      margin-right: 6px;
      animation: online-pulse 2s infinite;
    }

    @keyframes online-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .mpt-chat-widget .close-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .mpt-chat-widget .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .mpt-chat-widget .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #FAFBFC;
    }

    .mpt-chat-widget .message {
      margin-bottom: 12px;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .mpt-chat-widget .message-content {
      max-width: 85%;
    }

    .mpt-chat-widget .message.bot .message-content { float: left; }
    .mpt-chat-widget .message.user .message-content { float: right; }

    /* Bot messages - light gray bubble */
    .mpt-chat-widget .message.bot .message-text {
      background: #F3F4F6;
      border: none;
      border-radius: 4px 16px 16px 16px;
      padding: 12px 16px;
      font-size: 14px;
      line-height: 1.5;
      color: #1F2937;
    }

    /* User messages - navy blue bubble */
    .mpt-chat-widget .message.user .message-text {
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 16px 16px 4px 16px;
      padding: 12px 16px;
      font-size: 14px;
      line-height: 1.5;
    }

    .mpt-chat-widget .message-buttons {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mpt-chat-widget .action-button {
      background: white;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      padding: 10px 14px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s ease;
      text-align: left;
    }

    .mpt-chat-widget .action-button:hover {
      background: var(--primary-color);
      color: white;
    }

    .mpt-chat-widget .message-time {
      clear: both;
      font-size: 11px;
      color: #6B7280;
      margin-top: 4px;
      text-align: center;
    }

    .mpt-chat-widget .typing-indicator {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .mpt-chat-widget .typing-indicator span {
      width: 6px;
      height: 6px;
      background: #9CA3AF;
      border-radius: 50%;
      animation: typing 1.4s infinite;
    }

    .mpt-chat-widget .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .mpt-chat-widget .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typing {
      0%, 60%, 100% { transform: scale(0.8); opacity: 0.5; }
      30% { transform: scale(1); opacity: 1; }
    }

    .mpt-chat-widget .chat-input {
      background: white;
      border-top: 1px solid var(--border-color);
      padding: 12px 16px;
    }

    .mpt-chat-widget .input-container {
      display: flex;
      align-items: end;
      gap: 10px;
    }

    .mpt-chat-widget .input-container textarea {
      flex: 1;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 10px 14px;
      font-size: 14px;
      font-family: inherit;
      resize: none;
      max-height: 80px;
      min-height: 40px;
      transition: border-color 0.2s;
    }

    .mpt-chat-widget .input-container textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .mpt-chat-widget .send-button {
      background: var(--primary-color);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .mpt-chat-widget .send-button:hover:not(:disabled) {
      background: var(--primary-hover);
    }

    .mpt-chat-widget .send-button:disabled {
      background: #D1D5DB;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .mpt-chat-widget { bottom: 16px; right: 16px; left: 16px; }
      .mpt-chat-widget .chat-window { width: 100%; height: 450px; }
      .mpt-chat-widget .chat-toggle-button { width: 56px; height: 56px; }
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  class MPTChatWidget {
    constructor(config = {}) {
      this.config = { ...MPT_CHAT_CONFIG, ...config };
      this.isOpen = false;
      this.messages = [];
      this.userInfo = {};
      this.isTyping = false;
      this.isLoading = false;
      this.init();
    }

    init() {
      this.createWidget();
      this.addWelcomeMessage();
      this.bindEvents();
      
      // Auto-open after 3 seconds
      setTimeout(() => {
        if (!this.isOpen) this.toggleWidget();
      }, 3000);
    }

    createWidget() {
      this.widget = document.createElement('div');
      this.widget.className = `mpt-chat-widget ${this.config.position}`;
      
      this.widget.innerHTML = `
        <div class="chat-toggle-button" role="button" tabindex="0" aria-label="Open chat">
          <div class="pulse-animation"></div>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="chat-window" style="display: none;">
          <div class="chat-header">
            <div class="header-content">
              <div class="avatar">🤖</div>
              <div class="header-text">
                <h3>Metro Bot</h3>
                <p><span class="status-indicator"></span>Online • Built for Insurance</p>
              </div>
            </div>
            <button class="close-button" aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14 4L4 14M4 4L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="messages-container"></div>

          <div class="chat-input">
            <div class="input-container">
              <textarea placeholder="Type your message..." rows="1" maxlength="500"></textarea>
              <button class="send-button" disabled aria-label="Send">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(this.widget);
    }

    addWelcomeMessage() {
      this.messages.push({
        id: '1',
        type: 'bot',
        content: CHAT_MESSAGES.welcome,
        timestamp: new Date(),
        buttons: CHAT_MESSAGES.buttons
      });
      this.renderMessages();
    }

    bindEvents() {
      const toggleBtn = this.widget.querySelector('.chat-toggle-button');
      const closeBtn = this.widget.querySelector('.close-button');
      const sendBtn = this.widget.querySelector('.send-button');
      const textarea = this.widget.querySelector('textarea');

      toggleBtn.addEventListener('click', () => this.toggleWidget());
      closeBtn.addEventListener('click', () => this.toggleWidget());
      sendBtn.addEventListener('click', () => this.handleSend());
      textarea.addEventListener('input', (e) => {
        sendBtn.disabled = !e.target.value.trim();
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
      });
      textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    toggleWidget() {
      this.isOpen = !this.isOpen;
      const chatWindow = this.widget.querySelector('.chat-window');
      const toggleBtn = this.widget.querySelector('.chat-toggle-button');

      if (this.isOpen) {
        this.widget.classList.add('open');
        chatWindow.style.display = 'flex';
        toggleBtn.style.display = 'none';
        this.widget.querySelector('textarea').focus();
      } else {
        this.widget.classList.remove('open');
        setTimeout(() => {
          chatWindow.style.display = 'none';
          toggleBtn.style.display = 'flex';
        }, 300);
      }
    }

    handleSend() {
      const textarea = this.widget.querySelector('textarea');
      const content = textarea.value.trim();
      if (!content || this.isLoading) return;

      this.sendMessage(content);
      textarea.value = '';
      textarea.style.height = 'auto';
      this.widget.querySelector('.send-button').disabled = true;
    }

    async sendMessage(content, action = null) {
      this.messages.push({
        id: Date.now().toString(),
        type: 'user',
        content: content || action,
        timestamp: new Date()
      });
      this.renderMessages();
      this.setTyping(true);
      this.isLoading = true;

      try {
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content || action,
            context: { page: window.location.pathname },
            userInfo: this.userInfo
          })
        });

        const data = await response.json();

        this.messages.push({
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.response || "I'm having a moment! Try again or call (239) 600-8159.",
          timestamp: new Date(),
          buttons: data.buttons || null
        });
      } catch (error) {
        console.error('Chat error:', error);
        this.messages.push({
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "Connection hiccup! Call us at (239) 600-8159 or try again.",
          timestamp: new Date()
        });
      } finally {
        this.setTyping(false);
        this.isLoading = false;
        this.renderMessages();
      }
    }

    setTyping(isTyping) {
      this.isTyping = isTyping;
      this.renderMessages();
    }

    renderMessages() {
      const container = this.widget.querySelector('.messages-container');
      let html = '';

      this.messages.forEach(msg => {
        let buttonsHtml = '';
        if (msg.buttons) {
          buttonsHtml = `<div class="message-buttons">${msg.buttons.map(b => 
            `<button class="action-button" data-action="${b.action}">${b.text}</button>`
          ).join('')}</div>`;
        }

        html += `
          <div class="message ${msg.type}">
            <div class="message-content">
              <div class="message-text">${this.formatContent(msg.content)}</div>
              ${buttonsHtml}
            </div>
            <div class="message-time">${msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
          </div>
        `;
      });

      if (this.isTyping) {
        html += `
          <div class="message bot">
            <div class="message-content">
              <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;

      container.querySelectorAll('.action-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.target.dataset.action;
          if (action) this.sendMessage('', action);
        });
      });
    }

    formatContent(content) {
      return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MPTChatWidget());
  } else {
    new MPTChatWidget();
  }
})();
