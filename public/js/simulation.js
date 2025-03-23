document.addEventListener('DOMContentLoaded', () => {
  const simulateBtn = document.getElementById('simulate-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const accelerateBtn = document.getElementById('accelerate-btn');
  const terminalText = document.getElementById('terminal-text');
  const simulationProgress = document.getElementById('simulation-progress');
  const timelineNext = document.getElementById('timeline-next');
  const viewFullPlaybook = document.getElementById('view-full-playbook');
  const timelineSteps = document.querySelectorAll('.timeline-step');
  
  // Performance metrics elements
  const scoreElement = document.getElementById('score');
  const timeDetectElement = document.getElementById('time-detect');
  const timeRespondElement = document.getElementById('time-respond');
  const badgesElement = document.getElementById('badges');
  const benchmarkIndicator = document.querySelector('.benchmark-indicator.current');
  
  // SIEM elements
  const siemFeed = document.getElementById('siem-feed');
  const analyzeLogsBtn = document.getElementById('analyze-logs');
  const exportLogsBtn = document.getElementById('export-logs');
  
  // Chat elements
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatbox = document.getElementById('chatbox');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  let currentStep = 0;
  let totalSteps = simulationSteps ? simulationSteps.length : 10; // Fallback to 10 if no steps defined
  let simSpeed = 1; // 1 = normal, 2 = fast, 0 = paused
  let simRunning = false;
  let currentScorePercentage = 0;
  let activeTimelineStep = 0;
  
  // Initialize simulation environment
  function initSimulation() {
    // Reset UI state
    terminalText.innerHTML = 'Initializing environment... Type "run simulation" or click Start to begin.';
    simulationProgress.style.width = '0%';
    
    // Reset buttons
    simulateBtn.disabled = false;
    pauseBtn.disabled = true;
    accelerateBtn.disabled = true;
    
    // Reset metrics
    scoreElement.textContent = '0%';
    timeDetectElement.textContent = '--:--';
    timeRespondElement.textContent = '--:--';
    badgesElement.textContent = 'None';
    benchmarkIndicator.style.setProperty('--position', '0%');
    
    // Reset timeline steps
    timelineSteps.forEach(step => {
      step.classList.remove('active', 'completed');
    });
    
    // Initialize SIEM with first log entry
    addSIEMLog('Initializing log stream correlation engine...', 'info', 'System');
    
    // Reset simulation state
    currentStep = 0;
    simRunning = false;
    simSpeed = 1;
    activeTimelineStep = 0;
  }
  
  // Function to update terminal with typing animation
  function updateTerminalWithTyping(text, speed = 10) {
    return new Promise((resolve) => {
      let i = 0;
      terminalText.innerHTML = '';
      const typeChar = () => {
        if (i < text.length) {
          terminalText.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          resolve();
        }
      };
      typeChar();
    });
  }
  
  // Function to add log entries to SIEM feed
  function addSIEMLog(message, severity = 'info', source = 'System') {
    const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
    const logEntry = document.createElement('p');
    logEntry.className = `log-entry severity-${severity}`;
    logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> <span class="source">[${source}]</span> ${message}`;
    
    siemFeed.appendChild(logEntry);
    siemFeed.scrollTop = siemFeed.scrollHeight;
    
    // Add special effects for critical logs
    if (severity === 'critical') {
      logEntry.classList.add('highlight-animation');
      setTimeout(() => logEntry.classList.remove('highlight-animation'), 3000);
    }
  }
  
  // Function to add chat messages
  function addChatMessage(message, isUser = false) {
    const chatMessage = document.createElement('div');
    chatMessage.className = isUser ? 'chat-message user' : 'chat-message system';
    
    chatMessage.innerHTML = `
      <div class="chat-avatar"><i class="fas ${isUser ? 'fa-user' : 'fa-shield-alt'}"></i></div>
      <div class="chat-content">
        <p>${message}</p>
      </div>
    `;
    
    chatbox.appendChild(chatMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // Animate new message appearance
    anime({
      targets: chatMessage,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 300,
      easing: 'easeOutQuad'
    });
  }
  
  // Function to update progress and timeline
  function updateProgress(step) {
    const progressPercentage = Math.min(100, Math.floor((step / totalSteps) * 100));
    
    // Animate progress bar
    anime({
      targets: simulationProgress,
      width: progressPercentage + '%',
      duration: 600,
      easing: 'easeOutQuad'
    });
    
    // Update score and benchmark performance
    updateScoreAndPerformance(progressPercentage);
  }
  
  // Function to update score and performance metrics
  function updateScoreAndPerformance(progressPercentage) {
    // Calculate a score that starts lower and increases as detection and response improve
    currentScorePercentage = Math.min(90, Math.floor(progressPercentage * 0.9));
    
    // Update score with animation
    anime({
      targets: scoreElement,
      innerHTML: [parseInt(scoreElement.textContent) || 0, currentScorePercentage],
      round: 1,
      suffix: '%',
      duration: 800,
      easing: 'easeOutQuad'
    });
    
    // Update benchmark indicator
    anime({
      targets: benchmarkIndicator,
      '--position': currentScorePercentage + '%',
      duration: 800,
      easing: 'easeOutQuad'
    });
    
    // Update time metrics when reaching certain thresholds
    if (progressPercentage >= 20 && timeDetectElement.textContent === '--:--') {
      timeDetectElement.textContent = '00:42';
    }
    
    if (progressPercentage >= 60 && timeRespondElement.textContent === '--:--') {
      timeRespondElement.textContent = '01:18';
    }
    
    // Update badges at milestones
    if (progressPercentage >= 80 && badgesElement.textContent === 'None') {
      badgesElement.textContent = 'First Responder';
    } else if (progressPercentage >= 100 && badgesElement.textContent === 'First Responder') {
      badgesElement.textContent = 'Incident Commander';
    }
  }
  
  // Function to advance timeline steps
  function advanceTimelineStep(step) {
    if (step <= timelineSteps.length) {
      // Mark previous steps as completed
      timelineSteps.forEach((el, index) => {
        if (index < step - 1) {
          el.classList.remove('active');
          el.classList.add('completed');
        } else if (index === step - 1) {
          el.classList.add('active');
          el.classList.remove('completed');
        } else {
          el.classList.remove('active', 'completed');
        }
      });
      
      // Animate the active step
      anime({
        targets: timelineSteps[step - 1],
        backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(65,184,255,0.15)'],
        borderLeftWidth: ['3px', '5px'],
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  }
  
  // Function to run a simulation step
  async function runSimulationStep(step) {
    if (!simulationSteps || step > simulationSteps.length) {
      // Use generic step if no simulation steps defined
      const genericSteps = [
        { step: "Initial Access", detail: "Threat actor gains entry through a phishing email with a malicious attachment targeting a vulnerable endpoint." },
        { step: "Command & Control", detail: "Malware establishes connection to C2 server at 192.168.12.45 using encrypted HTTPS communication." },
        { step: "Privilege Escalation", detail: "Attacker exploits local privilege vulnerability CVE-2024-1234 to gain SYSTEM access." },
        { step: "Lateral Movement", detail: "Compromised admin credentials used to access additional systems via SMB protocol." },
        { step: "Data Discovery", detail: "PowerShell commands executed to locate sensitive data files across network shares." },
        { step: "Data Exfiltration", detail: "Compressed data archive transferred to external FTP server at unusual hours." },
        { step: "Persistence", detail: "Registry modifications and scheduled tasks created to maintain access through system reboots." },
        { step: "Anti-Forensics", detail: "Log files cleared and timestamps modified to complicate investigation efforts." },
        { step: "Impact Assessment", detail: "Approximately 2.3GB of sensitive customer data and intellectual property compromised." },
        { step: "Recovery Actions", detail: "Systems rebuilt from verified backups, credentials rotated, and enhanced monitoring implemented." }
      ];
      
      const stepData = step <= genericSteps.length ? genericSteps[step-1] : 
                      { step: "Simulation Complete", detail: "All attack stages have been simulated. Review your response actions and prepare your incident report." };
      
      // Update terminal with step information
      await updateTerminalWithTyping(`<strong>${stepData.step}:</strong> ${stepData.detail}`);
    } else {
      // Use defined simulation steps
      const stepData = simulationSteps[step-1];
      await updateTerminalWithTyping(`<strong>${stepData.step}:</strong> ${stepData.detail}`);
    }
    
    // Update progress and timeline
    updateProgress(step);
    
    // Update timeline if appropriate
    if (step % 2 === 0 && activeTimelineStep < timelineSteps.length) {
      activeTimelineStep++;
      advanceTimelineStep(activeTimelineStep);
    }
    
    // Add appropriate SIEM logs based on step
    addStepLogs(step);
    
    // Completion behavior
    if (step >= totalSteps) {
      simulateBtn.disabled = true;
      pauseBtn.disabled = true;
      accelerateBtn.disabled = true;
      
      // Add completion message to terminal
      setTimeout(async () => {
        await updateTerminalWithTyping('Simulation completed. Generate your incident report and evaluate your team\'s performance.');
        
        // Add chat message from virtual assistant
        addChatMessage('Simulation completed. Would you like to review the most critical response actions or generate a comprehensive incident report?');
        
        // Add final SIEM log
        addSIEMLog('Simulation completed. Final results available in Reports section.', 'info', 'System');
      }, 1000);
    }
  }
  
  // Function to add contextual logs based on step
  function addStepLogs(step) {
    const logTypes = {
      1: [
        { msg: 'Multiple failed login attempts detected from external IP 92.63.197.153', severity: 'warning', source: 'Firewall' },
        { msg: 'Unusual email attachment (.zip) opened by user jsmith@company.local', severity: 'info', source: 'Email Security' }
      ],
      2: [
        { msg: 'PowerShell process spawned by Office application', severity: 'warning', source: 'Endpoint' },
        { msg: 'Suspicious outbound connection to unknown domain detected', severity: 'warning', source: 'Proxy' }
      ],
      3: [
        { msg: 'Privilege escalation detected on workstation WS-FINANCE-12', severity: 'critical', source: 'EDR' },
        { msg: 'New service installed by non-admin process', severity: 'critical', source: 'Endpoint' }
      ],
      4: [
        { msg: 'Admin credentials used outside business hours', severity: 'warning', source: 'AD' },
        { msg: 'SMB traffic increase between finance and engineering subnets', severity: 'warning', source: 'Network' }
      ],
      5: [
        { msg: 'Database query retrieving unusual volume of records', severity: 'critical', source: 'Database' },
        { msg: 'Sensitive file access by unauthorized account', severity: 'critical', source: 'DLP' }
      ]
    };
    
    // Add step-specific logs if defined, otherwise generic logs
    const logs = logTypes[step] || [
      { msg: `Simulation step ${step} activity detected`, severity: 'info', source: 'System' }
    ];
    
    // Add each log with slight delay for realism
    logs.forEach((log, i) => {
      setTimeout(() => {
        addSIEMLog(log.msg, log.severity, log.source);
      }, i * 800);
    });
  }
  
  // Start button click handler
  simulateBtn.addEventListener('click', () => {
    if (!simRunning) {
      // Starting the simulation
      simRunning = true;
      currentStep = 1;
      simulateBtn.innerHTML = '<i class="fas fa-step-forward"></i> Next Step';
      pauseBtn.disabled = false;
      accelerateBtn.disabled = false;
      
      // Run first step
      runSimulationStep(currentStep);
    } else {
      // Advancing to next step
      currentStep++;
      runSimulationStep(currentStep);
      
      // Update button on last step
      if (currentStep >= totalSteps) {
        simulateBtn.innerHTML = '<i class="fas fa-check"></i> Complete';
        simulateBtn.classList.add('complete');
      }
    }
  });
  
  // Pause button click handler
  pauseBtn.addEventListener('click', () => {
    if (simRunning) {
      if (simSpeed !== 0) {
        simSpeed = 0;
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
        pauseBtn.classList.add('paused');
        addSIEMLog('Simulation paused by user', 'info', 'System');
      } else {
        simSpeed = 1;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        pauseBtn.classList.remove('paused');
        addSIEMLog('Simulation resumed by user', 'info', 'System');
      }
    }
  });
  
  // Accelerate button click handler
  accelerateBtn.addEventListener('click', () => {
    if (simRunning) {
      if (simSpeed === 1) {
        simSpeed = 2;
        accelerateBtn.innerHTML = '<i class="fas fa-fast-forward"></i> Normal Speed';
        accelerateBtn.classList.add('accelerated');
        addSIEMLog('Simulation speed increased by user', 'info', 'System');
      } else if (simSpeed === 2) {
        simSpeed = 1;
        accelerateBtn.innerHTML = '<i class="fas fa-fast-forward"></i> Accelerate';
        accelerateBtn.classList.remove('accelerated');
        addSIEMLog('Simulation speed normalized by user', 'info', 'System');
      }
    }
  });
  
  // Timeline next button handler
  timelineNext.addEventListener('click', () => {
    if (activeTimelineStep < timelineSteps.length) {
      activeTimelineStep++;
      advanceTimelineStep(activeTimelineStep);
      
      // Add appropriate messages based on timeline stage
      const responseMessages = [
        'Beginning threat hunting based on initial alert data',
        'SIEM correlation rules identifying related system activity',
        'Isolating affected endpoints to prevent lateral movement',
        'Removing malicious artifacts and implementing emergency patches',
        'Restoring systems from verified clean backups and monitoring for persistence'
      ];
      
      if (responseMessages[activeTimelineStep - 1]) {
        addChatMessage(responseMessages[activeTimelineStep - 1]);
        addSIEMLog(`IR Team: ${responseMessages[activeTimelineStep - 1]}`, 'info', 'IR Team');
      }
      
      // Update performance metrics
      updateScoreAndPerformance(Math.min(100, currentScorePercentage + 10));
    }
  });
  
  // View full playbook button handler
  viewFullPlaybook.addEventListener('click', () => {
    // This would typically open a modal with full playbook
    addChatMessage('The full incident response playbook includes detailed procedures for containment, eradication, and recovery phases. Would you like me to focus on a specific area?');
  });
  
  // Analyze logs button handler
  analyzeLogsBtn.addEventListener('click', () => {
    addSIEMLog('Starting automated log analysis...', 'info', 'SIEM');
    
    // Simulate log analysis with delay
    setTimeout(() => {
      addSIEMLog('Analysis complete. 3 critical events, 7 warnings, and 12 informational events detected', 'warning', 'SIEM');
      addSIEMLog('Potential indicators of compromise identified in subnet 192.168.12.0/24', 'critical', 'SIEM');
      
      // Add chat message with analysis
      addChatMessage('Log analysis complete. I\'ve identified potential lateral movement between the finance and engineering subnets. Recommend immediate isolation of affected systems.');
    }, 1200);
  });
  
  // Export logs button handler
  exportLogsBtn.addEventListener('click', () => {
    addSIEMLog('Preparing log export...', 'info', 'System');
    setTimeout(() => {
      addSIEMLog('Log export complete. File saved to incident_logs_' + new Date().toISOString().substring(0, 10) + '.json', 'info', 'System');
    }, 800);
  });
  
  // Chat input handler
  chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      // Add user message
      addChatMessage(message, true);
      chatInput.value = '';
      
      // Simulate typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'typing-indicator';
      typingIndicator.innerHTML = '<span></span><span></span><span></span>';
      chatbox.appendChild(typingIndicator);
      chatbox.scrollTop = chatbox.scrollHeight;
      
      // Determine response based on message content
      setTimeout(() => {
        // Remove typing indicator
        chatbox.removeChild(typingIndicator);
        
        // Generate contextual response
        let response = '';
        if (message.toLowerCase().includes('ioc') || message.toLowerCase().includes('indicator')) {
          response = 'Key indicators for this attack include unusual PowerShell commands, outbound connections to domains created within the last 24 hours, and access to sensitive data repositories outside normal business hours.';
        } else if (message.toLowerCase().includes('mitre') || message.toLowerCase().includes('att')) {
          response = 'This attack pattern aligns with MITRE ATT&CK techniques including T1566 (Phishing), T1059.001 (PowerShell), T1078 (Valid Accounts), and T1567 (Exfiltration Over Web Service).';
        } else if (message.toLowerCase().includes('contain')) {
          response = 'Recommended containment steps: 1) Isolate affected systems, 2) Block C2 communications at the firewall, 3) Revoke compromised credentials, and 4) Implement additional monitoring for similar TTPs.';
        } else {
          response = 'I\'m analyzing the current attack patterns. Would you like information about IOCs, MITRE ATT&CK techniques, or recommended containment steps?';
        }
        
        // Add response
        addChatMessage(response);
      }, 1200);
    }
  });
  
  // Handle Enter key in chat input
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      chatSend.click();
    }
  });
  
  // Chat suggestion buttons
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      if (query) {
        chatInput.value = query;
        chatSend.click();
      }
    });
  });
  
  // Risk assessment form handlers
  const likelihoodSelect = document.getElementById('likelihood');
  const impactSelect = document.getElementById('impact');
  const currentRisk = document.getElementById('current-risk');
  
  function updateRiskLevel() {
    const likelihood = likelihoodSelect.value;
    const impact = impactSelect.value;
    
    // Simple risk matrix lookup
    let riskLevel = 'medium';
    if (likelihood === 'high' && impact === 'high') {
      riskLevel = 'critical';
    } else if ((likelihood === 'high' && impact === 'medium') || 
               (likelihood === 'medium' && impact === 'high')) {
      riskLevel = 'high';
    } else if (likelihood === 'low' && impact === 'low') {
      riskLevel = 'negligible';
    } else if ((likelihood === 'low' && impact === 'medium') || 
               (likelihood === 'medium' && impact === 'low')) {
      riskLevel = 'low';
    }
    
    // Update risk indicator
    currentRisk.className = 'risk-level ' + riskLevel.toLowerCase();
    currentRisk.textContent = riskLevel.toUpperCase();
    
    // Highlight appropriate cell in matrix
    document.querySelectorAll('.matrix-cell').forEach(cell => {
      cell.classList.remove('active');
    });
    
    // Find and highlight the appropriate cell in the risk matrix
    const matrixCells = document.querySelectorAll('.matrix-cell[data-risk]');
    matrixCells.forEach(cell => {
      if (cell.getAttribute('data-risk') === riskLevel) {
        cell.classList.add('active');
      }
    });
  }
  
  if (likelihoodSelect && impactSelect) {
    likelihoodSelect.addEventListener('change', updateRiskLevel);
    impactSelect.addEventListener('change', updateRiskLevel);
    
    // Initial risk assessment
    updateRiskLevel();
  }
  
  // Report form handlers
  const reportForm = document.getElementById('report-form');
  const templateBtn = document.getElementById('template-btn');
  
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const reportResponse = document.getElementById('report-response');
      if (reportResponse) {
        reportResponse.innerHTML = '<div class="alert alert-success mt-3"><i class="fas fa-check-circle"></i> Report submitted successfully. Your incident documentation has been saved.</div>';
      }
    });
  }
  
  if (templateBtn) {
    templateBtn.addEventListener('click', () => {
      document.getElementById('executive-summary').value = 'On March 23, 2025, a sophisticated attack was detected targeting our financial systems. The incident was contained within 2 hours, with minimal data exposure. Response teams followed established IR procedures.';
      
      document.getElementById('technical-details').value = 'Initial access vector: Phishing email with malicious attachment\nAffected systems: 3 workstations in Finance department\nMalware identified: Trojan.FinSpy variant\nC2 infrastructure: 92.63.197.153 communicating over encrypted channels';
      
      document.getElementById('event-timeline').value = '14:32 - Initial detection of suspicious activity\n14:45 - IR team activated\n15:10 - Affected systems isolated\n15:45 - Malware samples secured for analysis\n16:30 - Containment confirmed\n18:00 - Recovery procedures initiated';
      
      document.getElementById('recommendations').value = '1. Implement additional email filtering rules\n2. Accelerate planned EDR deployment\n3. Conduct targeted phishing awareness training\n4. Review and enhance network segmentation\n5. Implement additional monitoring for similar TTPs';
    });
  }
  
  // Initialize simulation
  initSimulation();
});