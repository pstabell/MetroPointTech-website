/*!
 * Metro Point Technology Corporate Chat Widget
 * Optimized for lead capture and professional services
 */

(function() {
  'use strict';

  // Configuration for Metro Point Technology
  const MPT_CHAT_CONFIG = {
    apiUrl: 'https://chat-api.metropointtechnology.com',
    primaryColor: '#1D4ED8', // MPT Corporate Blue
    secondaryColor: '#F8FAFC',
    position: 'bottom-right',
    companyName: 'Metro Point Technology',
    businessFocus: 'corporate',
    theme: 'professional'
  };

  // Warm, conversational greeting
  const CORPORATE_MESSAGES = {
    welcome: `Hey there! 👋 I'm Metro Bot, MPT's AI assistant.

What brings you here today? I'd love to learn about your business!`,
    
    buttons: [
      { text: '💬 Just exploring', action: 'exploring' },
      { text: '🛠️ Need custom software', action: 'custom_solutions' },
      { text: '📞 Talk to Patrick', action: 'contact_sales' }
    ]
  };

  // Create and inject CSS styles
  const styles = `
    /* Metro Point Technology Corporate Chat Styles */
    .mpt-chat-widget {
      --primary-color: #1D4ED8;
      --primary-hover: #1E40AF;
      --secondary-color: #F8FAFC;
      --text-color: #1F2937;
      --border-color: #E5E7EB;
      --success-color: #059669;
      --warning-color: #D97706;
      --font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --border-radius: 12px;
      --shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: var(--font-family);
    }

    .mpt-chat-widget * {
      box-sizing: border-box;
    }

    .mpt-chat-widget.bottom-left {
      left: 24px;
      right: auto;
    }

    .mpt-chat-widget .chat-toggle-button {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .mpt-chat-widget .chat-toggle-button:hover {
      transform: scale(1.05);
      box-shadow: 0 25px 50px -5px rgba(29, 78, 216, 0.25);
    }

    .mpt-chat-widget .chat-toggle-button:active {
      transform: scale(0.95);
    }

    .mpt-chat-widget .chat-toggle-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }

    .mpt-chat-widget .chat-toggle-button:hover::before {
      transform: translateX(100%);
    }

    .mpt-chat-widget .pulse-animation {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      animation: mpt-pulse 2s infinite;
      opacity: 0.6;
    }

    @keyframes mpt-pulse {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.3;
      }
      100% {
        transform: scale(1.2);
        opacity: 0;
      }
    }

    .mpt-chat-widget .chat-window {
      width: 380px;
      height: 600px;
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
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
      color: white;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mpt-chat-widget .header-content {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .mpt-chat-widget .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-weight: 600;
      font-size: 16px;
    }

    .mpt-chat-widget .header-text h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .mpt-chat-widget .header-text p {
      margin: 0;
      font-size: 13px;
      opacity: 0.9;
    }

    .mpt-chat-widget .status-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--success-color);
      border-radius: 50%;
      margin-right: 6px;
      animation: mpt-online-pulse 2s infinite;
    }

    @keyframes mpt-online-pulse {
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
      transition: background-color 0.2s;
    }

    .mpt-chat-widget .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .mpt-chat-widget .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #FAFBFC;
    }

    .mpt-chat-widget .message {
      margin-bottom: 16px;
      animation: mpt-slideIn 0.3s ease;
    }

    @keyframes mpt-slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .mpt-chat-widget .message-content {
      max-width: 85%;
    }

    .mpt-chat-widget .message.bot .message-content {
      float: left;
    }

    .mpt-chat-widget .message.user .message-content {
      float: right;
    }

    .mpt-chat-widget .message-text {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 18px 18px 18px 4px;
      padding: 14px 18px;
      font-size: 14px;
      line-height: 1.5;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .mpt-chat-widget .message.user .message-text {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
      border-radius: 18px 18px 4px 18px;
    }

    .mpt-chat-widget .message-buttons {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mpt-chat-widget .action-button {
      background: white;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      padding: 10px 16px;
      border-radius: 24px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s ease;
      text-align: left;
    }

    .mpt-chat-widget .action-button:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(29, 78, 216, 0.2);
    }

    .mpt-chat-widget .message-time {
      clear: both;
      font-size: 11px;
      color: #6B7280;
      margin-top: 6px;
      text-align: center;
    }

    .mpt-chat-widget .typing-indicator {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .mpt-chat-widget .typing-indicator span {
      width: 6px;
      height: 6px;
      background: #9CA3AF;
      border-radius: 50%;
      animation: mpt-typing 1.4s infinite;
    }

    .mpt-chat-widget .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .mpt-chat-widget .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes mpt-typing {
      0%, 60%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      30% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .mpt-chat-widget .chat-input {
      background: white;
      border-top: 1px solid var(--border-color);
      padding: 16px 20px;
    }

    .mpt-chat-widget .input-container {
      display: flex;
      align-items: end;
      gap: 12px;
    }

    .mpt-chat-widget .input-container textarea {
      flex: 1;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 12px 16px;
      font-size: 14px;
      font-family: inherit;
      resize: none;
      max-height: 100px;
      min-height: 44px;
      transition: border-color 0.2s;
    }

    .mpt-chat-widget .input-container textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
    }

    .mpt-chat-widget .send-button {
      background: var(--primary-color);
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .mpt-chat-widget .send-button:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: scale(1.05);
    }

    .mpt-chat-widget .send-button:disabled {
      background: #D1D5DB;
      cursor: not-allowed;
      transform: none;
    }

    .mpt-chat-widget .lead-form {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 20px;
      margin-top: 12px;
    }

    .mpt-chat-widget .lead-form h4 {
      margin: 0 0 16px 0;
      color: var(--text-color);
      font-size: 16px;
      font-weight: 600;
    }

    .mpt-chat-widget .form-field {
      margin-bottom: 16px;
    }

    .mpt-chat-widget .form-field label {
      display: block;
      margin-bottom: 6px;
      color: var(--text-color);
      font-size: 13px;
      font-weight: 500;
    }

    .mpt-chat-widget .form-field input {
      width: 100%;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .mpt-chat-widget .form-field input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
    }

    .mpt-chat-widget .submit-button {
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s;
    }

    .mpt-chat-widget .submit-button:hover {
      background: var(--primary-hover);
    }

    /* Mobile responsive styles */
    @media (max-width: 768px) {
      .mpt-chat-widget {
        bottom: 16px;
        right: 16px;
        left: 16px;
      }

      .mpt-chat-widget .chat-window {
        width: 100%;
        height: 500px;
      }

      .mpt-chat-widget .chat-toggle-button {
        width: 56px;
        height: 56px;
        position: fixed;
        bottom: 16px;
        right: 16px;
        left: auto;
      }
    }

    /* Print styles */
    @media print {
      .mpt-chat-widget {
        display: none !important;
      }
    }
  `;

  // Inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Chat Widget Component
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
      
      // Track widget load
      this.track('widget_loaded');
      
      // Auto-open after 3 seconds for warm greeting
      setTimeout(() => {
        if (!this.isOpen) {
          this.toggleWidget();
        }
      }, 3000);
    }

    createWidget() {
      this.widget = document.createElement('div');
      this.widget.className = `mpt-chat-widget ${this.config.position}`;
      
      this.widget.innerHTML = `
        <div class="chat-toggle-button" role="button" tabindex="0" aria-label="Open chat">
          <div class="pulse-animation"></div>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="chat-window" style="display: none;">
          <div class="chat-header">
            <div class="header-content">
              <div class="avatar">MPT</div>
              <div class="header-text">
                <h3>${this.config.companyName}</h3>
                <p><span class="status-indicator"></span>Online • Typically replies instantly</p>
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
              <textarea 
                placeholder="Type your message..." 
                rows="1"
                maxlength="500"
              ></textarea>
              <button class="send-button" disabled aria-label="Send message">
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
      const welcomeMessage = {
        id: '1',
        type: 'bot',
        content: CORPORATE_MESSAGES.welcome,
        timestamp: new Date(),
        buttons: CORPORATE_MESSAGES.buttons
      };
      this.messages.push(welcomeMessage);
      this.renderMessages();
    }

    bindEvents() {
      const toggleButton = this.widget.querySelector('.chat-toggle-button');
      const closeButton = this.widget.querySelector('.close-button');
      const sendButton = this.widget.querySelector('.send-button');
      const textarea = this.widget.querySelector('textarea');

      toggleButton.addEventListener('click', () => this.toggleWidget());
      toggleButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') this.toggleWidget();
      });
      
      closeButton.addEventListener('click', () => this.toggleWidget());
      
      sendButton.addEventListener('click', () => this.handleSend());
      
      textarea.addEventListener('input', (e) => this.handleInput(e));
      textarea.addEventListener('keypress', (e) => this.handleKeyPress(e));

      // Auto-resize textarea
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
      });
    }

    toggleWidget() {
      this.isOpen = !this.isOpen;
      const chatWindow = this.widget.querySelector('.chat-window');
      const toggleButton = this.widget.querySelector('.chat-toggle-button');

      if (this.isOpen) {
        this.widget.classList.add('open');
        chatWindow.style.display = 'flex';
        toggleButton.style.display = 'none';
        this.widget.querySelector('textarea').focus();
        this.track('widget_opened');
      } else {
        this.widget.classList.remove('open');
        setTimeout(() => {
          chatWindow.style.display = 'none';
          toggleButton.style.display = 'flex';
        }, 300);
        this.track('widget_closed');
      }
    }

    handleInput(e) {
      const sendButton = this.widget.querySelector('.send-button');
      sendButton.disabled = !e.target.value.trim();
    }

    handleKeyPress(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
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
      const userMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: content || action,
        timestamp: new Date()
      };

      this.messages.push(userMessage);
      this.renderMessages();
      this.setTyping(true);
      this.isLoading = true;

      try {
        // Simulate API call for demo purposes
        // In production, replace with actual API endpoint
        await this.simulateAPIResponse(content || action, action);
      } catch (error) {
        console.error('Chat API Error:', error);
        this.addErrorMessage();
      } finally {
        this.setTyping(false);
        this.isLoading = false;
      }
    }

    async simulateAPIResponse(message, action) {
      try {
        // Call the live Claude API
        const apiResponse = await fetch('https://mpt-ai-chat-api.vercel.app/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: message || action,
            context: { page: window.location.pathname },
            userInfo: this.userInfo
          })
        });

        const data = await apiResponse.json();

        const botMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.response || "I'm having a moment! Try again or call us at (239) 600-8159.",
          timestamp: new Date(),
          buttons: data.buttons || null,
          form: data.form || null
        };

        this.messages.push(botMessage);
        this.renderMessages();
        this.track('message_received', { action, hasButtons: !!data.buttons });

      } catch (error) {
        console.error('API Error:', error);
        this.addErrorMessage();
      }
    }

    handleAction(action) {
      switch (action) {
        case 'enterprise_demo':
          this.track('demo_requested', { type: 'enterprise' });
          return {
            content: `Perfect! I'd love to schedule an enterprise demo for you. Our team will show you how MPT can transform your agency operations and boost productivity.

**What you'll see in the demo:**
• Complete AMS platform walkthrough
• Commission tracking in real-time  
• Custom workflow automation
• ROI calculator and implementation timeline

Please provide your details below and we'll have our enterprise team contact you within 24 hours.`,
            form: {
              title: "Schedule Enterprise Demo",
              fields: [
                { name: "firstName", label: "First Name", type: "text", required: true },
                { name: "lastName", label: "Last Name", type: "text", required: true },
                { name: "email", label: "Business Email", type: "email", required: true },
                { name: "phone", label: "Phone Number", type: "tel", required: true },
                { name: "company", label: "Agency Name", type: "text", required: true },
                { name: "agencySize", label: "Agency Size", type: "select", required: true, options: ["1-5 agents", "6-15 agents", "16-50 agents", "50+ agents"] },
                { name: "currentAMS", label: "Current AMS", type: "text", placeholder: "e.g., Applied, QQCatalyst, etc." }
              ],
              submitText: "Schedule My Demo"
            }
          };

        case 'custom_solutions':
          this.track('custom_solutions_interest');
          return {
            content: `Excellent! We specialize in custom enterprise solutions for larger agencies with unique needs.

**Our custom development services include:**
• Custom integrations with existing systems
• Bespoke workflow automation
• Enterprise-grade security implementations
• Dedicated support and training

**Recent custom projects:**
• Multi-location agency consolidation platform
• Custom carrier integrations for regional carriers
• Advanced analytics and reporting dashboards

What specific challenges is your agency facing that might require a custom approach?`,
            buttons: [
              { text: 'Integration Challenges', action: 'integration_needs' },
              { text: 'Workflow Automation', action: 'workflow_needs' },
              { text: 'Discuss My Needs', action: 'custom_consultation' }
            ]
          };

        case 'case_studies':
          this.track('case_studies_requested');
          return {
            content: `Here are some success stories from agencies similar to yours:

**Regional Agency Group (25 locations)**
• 40% reduction in policy processing time
• 60% faster commission reconciliation  
• $200K annual savings on operational costs

**Independent Agency (50 agents)**
• Increased agent productivity by 35%
• Reduced errors by 80% with automation
• ROI achieved within 6 months

**Managing General Agency**
• Streamlined multi-carrier management
• Real-time reporting across all locations
• 25% increase in new business capacity

Would you like detailed case studies sent to your email, or would you prefer to discuss how these results apply to your specific situation?`,
            buttons: [
              { text: 'Send Case Studies', action: 'request_case_studies' },
              { text: 'Discuss My Situation', action: 'situation_analysis' },
              { text: 'Schedule Demo', action: 'enterprise_demo' }
            ]
          };

        case 'contact_sales':
          this.track('sales_contact_requested');
          return {
            content: `I'll connect you with our enterprise sales team right away. They're experts at understanding agency challenges and designing solutions that deliver real ROI.

**What to expect:**
• Initial consultation within 24 hours
• Customized demo of relevant features
• ROI analysis and implementation timeline
• Pricing tailored to your agency size

Please provide your contact information:`,
            form: {
              title: "Connect with Enterprise Sales",
              fields: [
                { name: "firstName", label: "First Name", type: "text", required: true },
                { name: "lastName", label: "Last Name", type: "text", required: true },
                { name: "email", label: "Business Email", type: "email", required: true },
                { name: "phone", label: "Phone Number", type: "tel", required: true },
                { name: "company", label: "Agency Name", type: "text", required: true },
                { name: "urgency", label: "Timeline", type: "select", required: true, options: ["Immediate (this month)", "Short-term (1-3 months)", "Medium-term (3-6 months)", "Long-term planning"] }
              ],
              submitText: "Connect with Sales"
            }
          };

        default:
          return this.generateContextualResponse('I can help you with information about our products, schedule a demo, or connect you with our team.');
      }
    }

    generateContextualResponse(message) {
      const lowerMessage = message.toLowerCase();
      
      // Corporate-focused responses
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        this.track('pricing_inquiry');
        return {
          content: `Our enterprise pricing is customized based on your agency size, features needed, and implementation scope.

**Typical investment ranges:**
• Small agencies (1-10 agents): $200-800/month
• Medium agencies (11-25 agents): $800-2,000/month  
• Large agencies (25+ agents): Custom enterprise pricing

**What's included:**
• Full platform access for all users
• Implementation and training
• Ongoing support and updates
• Custom integrations as needed

ROI is typically achieved within 3-6 months through increased efficiency and reduced manual work.

Would you like a customized quote based on your specific needs?`,
          buttons: [
            { text: 'Get Custom Quote', action: 'custom_quote' },
            { text: 'Schedule Demo First', action: 'enterprise_demo' },
            { text: 'ROI Calculator', action: 'roi_calculator' }
          ]
        };
      }

      if (lowerMessage.includes('integration') || lowerMessage.includes('api') || lowerMessage.includes('connect')) {
        this.track('integration_inquiry');
        return {
          content: `Yes! Integration is a core strength of our platform. We connect with virtually any system your agency uses.

**Standard integrations:**
• Major AMS platforms (Applied, QQ, Hawksoft, etc.)
• All major carriers (real-time data sync)
• Accounting systems (QuickBooks, etc.)
• Email marketing platforms

**Custom integrations:**
• Regional carriers and MGAs
• Legacy systems and databases  
• Third-party analytics tools
• Custom business applications

Our integration team ensures seamless data flow without disrupting your current operations.

What specific systems do you need to integrate with?`,
          buttons: [
            { text: 'Discuss Integrations', action: 'integration_consultation' },
            { text: 'See Integration List', action: 'integration_list' },
            { text: 'Schedule Demo', action: 'enterprise_demo' }
          ]
        };
      }

      if (lowerMessage.includes('security') || lowerMessage.includes('compliance') || lowerMessage.includes('data')) {
        this.track('security_inquiry');
        return {
          content: `Security and compliance are foundational to everything we build. Your data and your clients' data are completely protected.

**Security features:**
• SOC 2 Type II certified
• Bank-level encryption (AES-256)
• Multi-factor authentication
• Role-based access controls
• Regular penetration testing

**Compliance:**
• GDPR and CCPA compliant
• Insurance industry regulations
• Data residency options
• Audit trails and logging

**Data protection:**
• Encrypted at rest and in transit
• Regular automated backups
• Disaster recovery procedures
• 99.9% uptime SLA

Would you like detailed security documentation or a compliance briefing?`,
          buttons: [
            { text: 'Security Documentation', action: 'security_docs' },
            { text: 'Compliance Briefing', action: 'compliance_briefing' },
            { text: 'Schedule Security Review', action: 'security_review' }
          ]
        };
      }

      // Default corporate response
      this.track('general_inquiry');
      return {
        content: `I can help you learn more about how Metro Point Technology can transform your agency operations. 

**Popular topics:**
• Enterprise demos and custom solutions
• Integration capabilities and timelines
• Pricing and ROI analysis
• Implementation and training process

**Our specialties:**
• Large agency management and consolidation
• Custom workflow automation
• Advanced reporting and analytics
• Multi-location coordination

What would you like to explore first?`,
        buttons: [
          { text: 'Schedule Enterprise Demo', action: 'enterprise_demo' },
          { text: 'Discuss Custom Solutions', action: 'custom_solutions' },
          { text: 'Talk to Sales', action: 'contact_sales' },
          { text: 'View Success Stories', action: 'case_studies' }
        ]
      };
    }

    addErrorMessage() {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I'm having trouble connecting right now. Our enterprise sales team is always available to help directly:

**Contact our team:**
• Email: sales@metropointtechnology.com
• Phone: (239) 600-8159
• Schedule: calendly.com/mpt-enterprise

We typically respond within 1 hour during business hours.`,
        timestamp: new Date(),
        buttons: [
          { text: 'Try Again', action: 'retry' },
          { text: 'Contact Sales Direct', action: 'contact_sales' }
        ]
      };
      this.messages.push(errorMessage);
      this.renderMessages();
    }

    setTyping(isTyping) {
      this.isTyping = isTyping;
      this.renderMessages();
    }

    renderMessages() {
      const container = this.widget.querySelector('.messages-container');
      let html = '';

      this.messages.forEach(message => {
        html += this.renderMessage(message);
      });

      if (this.isTyping) {
        html += `
          <div class="message bot">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;

      // Bind button events
      container.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', (e) => {
          const action = e.target.dataset.action || e.target.getAttribute('onclick')?.match(/handleAction\('([^']+)'\)/)?.[1];
          if (action) {
            this.sendMessage('', action);
          }
        });
      });

      // Bind form events
      container.querySelectorAll('.lead-form').forEach(form => {
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
      });
    }

    renderMessage(message) {
      let buttonsHtml = '';
      if (message.buttons) {
        buttonsHtml = `
          <div class="message-buttons">
            ${message.buttons.map(button => 
              `<button class="action-button" data-action="${button.action}">${button.text}</button>`
            ).join('')}
          </div>
        `;
      }

      let formHtml = '';
      if (message.form) {
        const fieldsHtml = message.form.fields.map(field => {
          if (field.type === 'select') {
            return `
              <div class="form-field">
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <select name="${field.name}" ${field.required ? 'required' : ''}>
                  <option value="">Choose...</option>
                  ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
              </div>
            `;
          } else {
            return `
              <div class="form-field">
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <input 
                  type="${field.type || 'text'}" 
                  name="${field.name}"
                  placeholder="${field.placeholder || ''}"
                  ${field.required ? 'required' : ''}
                />
              </div>
            `;
          }
        }).join('');

        formHtml = `
          <div class="message-form">
            <form class="lead-form">
              <h4>${message.form.title}</h4>
              ${fieldsHtml}
              <button type="submit" class="submit-button">${message.form.submitText}</button>
            </form>
          </div>
        `;
      }

      return `
        <div class="message ${message.type}">
          <div class="message-content">
            <div class="message-text">${this.formatMessageContent(message.content)}</div>
            ${buttonsHtml}
            ${formHtml}
          </div>
          <div class="message-time">
            ${message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      `;
    }

    formatMessageContent(content) {
      return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/•/g, '&bull;');
    }

    handleFormSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Update user info
      this.userInfo = { ...this.userInfo, ...data };

      // Track form submission
      this.track('form_submitted', { formType: 'lead_capture', fields: Object.keys(data) });

      // Add confirmation message
      const confirmationMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Thank you ${data.firstName}! I've received your information and our enterprise team will contact you within 24 hours.

**Next steps:**
• You'll receive a calendar link to schedule your demo
• Our team will review your specific needs beforehand  
• We'll prepare a customized presentation
• You'll get a detailed ROI analysis

In the meantime, feel free to explore our website or ask me any additional questions!

**Quick reference:**
• Email: ${data.email}
• Company: ${data.company}`,
        timestamp: new Date(),
        buttons: [
          { text: 'Ask Another Question', action: 'continue_chat' },
          { text: 'Visit Our Website', action: 'website_link' }
        ]
      };

      this.messages.push(confirmationMessage);
      this.renderMessages();

      // In production, submit to CRM
      this.submitToCRM(data);
    }

    async submitToCRM(data) {
      try {
        // In production, replace with actual CRM endpoint
        console.log('Submitting to CRM:', data);
        
        // Track successful submission
        this.track('crm_submission_success', { leadType: 'chat_widget' });
        
        // You would typically POST to your CRM API here:
        // await fetch('/api/crm/leads', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        
      } catch (error) {
        console.error('CRM submission error:', error);
        this.track('crm_submission_error', { error: error.message });
      }
    }

    track(event, data = {}) {
      // Google Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', event, {
          event_category: 'chat_widget',
          event_label: 'mpt_corporate',
          ...data
        });
      }

      // Console logging for development
      if (this.config.debug) {
        console.log('MPT Chat Event:', event, data);
      }
    }
  }

  // Initialize widget when DOM is ready
  function initMPTChat(config = {}) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new MPTChatWidget(config);
      });
    } else {
      new MPTChatWidget(config);
    }
  }

  // Expose global interface
  window.MPTChat = {
    init: initMPTChat,
    version: '1.0.0'
  };

  // Auto-initialize with default config if no manual initialization
  setTimeout(() => {
    if (!window.MPTChatInitialized) {
      initMPTChat();
      window.MPTChatInitialized = true;
    }
  }, 100);

})();