// extrafeatures.js - Professional edition for CyberSim Platform
document.addEventListener('DOMContentLoaded', () => {
  // --- Incident Response Timeline Animation with professional visuals ---
  const timelineItems = document.querySelectorAll('#timeline-list li');
  let timelineIndex = 0;
  const timelineNextBtn = document.getElementById('timeline-next');
  const viewFullPlaybookBtn = document.getElementById('view-full-playbook');

  if (timelineItems.length > 0 && timelineNextBtn) {
      // Initialize timeline items to be hidden initially except the first one
      timelineItems.forEach((item, index) => {
          if (index > 0) {
              item.style.opacity = '0';
              item.style.transform = 'translateX(-20px)';
          }
      });
    
      timelineNextBtn.addEventListener('click', () => {
          if (timelineIndex < timelineItems.length) {
              // Animate the current timeline item with professional animation
              anime({
                  targets: timelineItems[timelineIndex],
                  opacity: [0, 1],
                  translateX: [-20, 0],
                  duration: 800,
                  easing: 'easeOutQuad'
              });
        
              timelineIndex++;
              
              // Update button text with professional formatting
              timelineNextBtn.innerHTML = `<i class="fas fa-arrow-right"></i> Execute Next Response Step (${timelineIndex}/${timelineItems.length})`;
              
              // Update score for timeline progression
              updateScore(5, 'Playbook step executed');
          }
          
          if (timelineIndex >= timelineItems.length) {
              timelineNextBtn.disabled = true;
              timelineNextBtn.classList.add('completed');
              timelineNextBtn.innerHTML = '<i class="fas fa-check"></i> Playbook Completed';
              
              // Show completion notification
              createNotification('Playbook Completed', 'You have successfully executed the complete incident response playbook.', 'success');
              
              // Award extra points for completion
              updateScore(20, 'Playbook completion bonus');
          }
      });
      
      // Full playbook view functionality
      if (viewFullPlaybookBtn) {
          viewFullPlaybookBtn.addEventListener('click', () => {
              // Show all timeline items with cascading animation
              timelineItems.forEach((item, index) => {
                  anime({
                      targets: item,
                      opacity: [index >= timelineIndex ? 0 : 1, 1],
                      translateX: [index >= timelineIndex ? -20 : 0, 0],
                      duration: 600,
                      delay: index * 100,
                      easing: 'easeOutQuad'
                  });
              });
              
              timelineIndex = timelineItems.length;
              timelineNextBtn.disabled = true;
              timelineNextBtn.classList.add('completed');
              timelineNextBtn.innerHTML = '<i class="fas fa-check"></i> Playbook Completed';
              
              // Update score for reviewing full playbook
              updateScore(10, 'Full playbook review');
          });
      }
  }

  // --- Enhanced Gamification & Training Metrics ---
  let score = 0;
  const scoreDisplay = document.getElementById('score');
  const timeDetectDisplay = document.getElementById('time-detect');
  const timeRespondDisplay = document.getElementById('time-respond');
  const badgesDisplay = document.getElementById('badges');
  const executeActionBtn = document.getElementById('execute-action');
  const benchmarkIndicator = document.querySelector('.benchmark-indicator.current');
  
  // Initialize timer for performance metrics
  let simulationStartTime = null;
  let detectionTime = null;
  let responseTime = null;
  
  // Function to update score with animation and notification
  function updateScore(points, reason) {
      if (!points) return;
      
      const oldScore = score;
      score += points;
      
      // Update score display with professional animation
      if (scoreDisplay) {
          anime({
              targets: scoreDisplay,
              innerHTML: [oldScore + '%', score + '%'],
              round: 1,
              easing: 'easeInOutExpo',
              duration: 1000
          });
      }
      
      // Show professional notification with reason
      if (reason) {
          createNotification('Performance Update', `+${points}% Effectiveness: ${reason}`, 'info');
      }
      
      // Update benchmark indicator
      if (benchmarkIndicator) {
          benchmarkIndicator.style.setProperty('--position', score + '%');
      }
      
      // Update badges based on score
      updateBadges(score);
  }
  
  // Function to update badges at professional thresholds
  function updateBadges(currentScore) {
      if (!badgesDisplay) return;
      
      // Clear existing badges if needed
      if (currentScore === 0) {
          badgesDisplay.textContent = 'None';
          return;
      }
      
      // Define badge thresholds and their associated certifications
      const badgeThresholds = [
          { threshold: 25, name: 'Certified Incident Responder' },
          { threshold: 50, name: 'SOC Analyst Level 1' },
          { threshold: 75, name: 'Advanced Threat Hunter' },
          { threshold: 90, name: 'Elite Cybersecurity Specialist' }
      ];
      
      // Award badges based on score
      let earnedBadge = null;
      for (const badge of badgeThresholds) {
          if (currentScore >= badge.threshold && 
              (!badgesDisplay.textContent.includes(badge.name) || badgesDisplay.textContent === 'None')) {
              earnedBadge = badge.name;
              break;
          }
      }
      
      if (earnedBadge) {
          // Replace "None" or add to existing badges
          if (badgesDisplay.textContent === 'None') {
              badgesDisplay.textContent = earnedBadge;
          } else {
              badgesDisplay.textContent += `, ${earnedBadge}`;
          }
          
          // Show badge notification
          createNotification('Certification Earned', `Congratulations! You've earned the "${earnedBadge}" certification!`, 'success');
      }
  }
  
  // Execute response action functionality
  if (executeActionBtn) {
      executeActionBtn.addEventListener('click', () => {
          // Mark response time if not already set
          if (!responseTime) {
              responseTime = Date.now() - (simulationStartTime || Date.now());
              if (timeRespondDisplay) {
                  const minutes = Math.floor(responseTime / 60000);
                  const seconds = Math.floor((responseTime % 60000) / 1000);
                  timeRespondDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
              }
          }
          
          // Award random points between 5-15 for more engaging experience
          const actionPoints = Math.floor(Math.random() * 11) + 5;
          updateScore(actionPoints, 'Response action executed');
          
          // Disable button temporarily to prevent spam
          executeActionBtn.disabled = true;
          setTimeout(() => {
              executeActionBtn.disabled = false;
          }, 3000);
      });
  }

  // --- Advanced Virtual Security Mentor & Chatbot ---
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send');
  const chatbox = document.getElementById('chatbox');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  if (chatInput && chatSendBtn && chatbox) {
      // Add event listener for Enter key
      chatInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
              sendChatMessage();
          }
      });
      
      chatSendBtn.addEventListener('click', sendChatMessage);
      
      // Add event listeners for suggestion buttons
      if (suggestionBtns.length) {
          suggestionBtns.forEach(btn => {
              btn.addEventListener('click', () => {
                  const query = btn.getAttribute('data-query');
                  if (query) {
                      chatInput.value = query;
                      sendChatMessage();
                  }
              });
          });
      }
      
      // Intelligent response mapping for security-related queries
      const responseMap = {
          'ioc': 'Key Indicators of Compromise (IOCs) for this attack include suspicious network connections to {ip-address}, unusual registry modifications, and the presence of files matching these hashes: {hash1}, {hash2}. Search for outbound connections to these domains: {domain1}, {domain2}.',
          'indicator': 'Key Indicators of Compromise (IOCs) for this attack include suspicious network connections to {ip-address}, unusual registry modifications, and the presence of files matching these hashes: {hash1}, {hash2}. Search for outbound connections to these domains: {domain1}, {domain2}.',
          'mitre': 'This attack utilizes the following MITRE ATT&CK techniques: Initial Access (T1566 - Phishing), Privilege Escalation (T1053 - Scheduled Task/Job), Lateral Movement (T1021 - Remote Services), and Exfiltration (T1567 - Exfiltration Over Web Service).',
          'containment': 'Recommended containment steps: 1) Isolate affected systems from the network, 2) Block all outbound connections to suspicious domains, 3) Revoke compromised credentials, 4) Implement temporary firewall rules to block traffic on unusual ports.',
          'remediate': 'For complete remediation: 1) Remove all malicious artifacts, 2) Patch exploited vulnerabilities, 3) Reset all potentially compromised credentials, 4) Restore systems from verified clean backups, 5) Implement additional monitoring controls.',
          'help': 'I can assist with threat intelligence, attack analysis, and response guidance. Ask me about IOCs, MITRE techniques, containment steps, or remediation strategies for this attack scenario.'
      };
      
      function sendChatMessage() {
          const userMsg = chatInput.value.trim();
          if (userMsg) {
              // Add user message with professional styling
              const userMessageElem = document.createElement('div');
              userMessageElem.className = 'chat-message user';
              userMessageElem.innerHTML = `
                  <div class="chat-avatar"><i class="fas fa-user"></i></div>
                  <div class="chat-content">
                      <p>${escapeHTML(userMsg)}</p>
                      <span class="chat-time">${getCurrentTime()}</span>
                  </div>
              `;
              chatbox.appendChild(userMessageElem);
              chatInput.value = '';
              
              // Show typing indicator
              const typingIndicator = document.createElement('div');
              typingIndicator.className = 'chat-message system typing';
              typingIndicator.innerHTML = `
                  <div class="chat-avatar"><i class="fas fa-shield-alt"></i></div>
                  <div class="chat-content">
                      <div class="typing-dots">
                          <span></span><span></span><span></span>
                      </div>
                  </div>
              `;
              chatbox.appendChild(typingIndicator);
              chatbox.scrollTop = chatbox.scrollHeight;
              
              // Generate intelligent response based on message context
              setTimeout(() => {
                  // Remove typing indicator
                  chatbox.removeChild(typingIndicator);
                  
                  // Determine appropriate response based on keywords
                  let responseText = '';
                  const userMsgLower = userMsg.toLowerCase();
                  
                  // Check for keywords in response map
                  for (const [keyword, response] of Object.entries(responseMap)) {
                      if (userMsgLower.includes(keyword)) {
                          responseText = response;
                          break;
                      }
                  }
                  
                  // Default response if no specific keyword matches
                  if (!responseText) {
                      // More specific context-aware responses
                      if (userMsgLower.includes('phishing')) {
                          responseText = 'This phishing campaign uses sophisticated HTML templates mimicking financial institutions. Examine email headers for sender verification, hover over links before clicking, and verify unusual financial requests through official channels.';
                      } else if (userMsgLower.includes('ransomware')) {
                          responseText = 'For ransomware defense, implement application whitelisting, regular offline backups, and email attachment scanning. If infected, isolate systems immediately, identify the ransomware variant, and consult with cybersecurity professionals before considering any ransom payment.';
                      } else if (userMsgLower.includes('detection')) {
                          responseText = 'Effective detection requires multi-layered monitoring including network traffic analysis, endpoint detection and response (EDR), and user behavior analytics. Look for unusual process executions, suspicious network connections, and anomalous user activities.';
                      } else {
                          responseText = 'Remember to document all your investigation steps thoroughly. In incident response, maintaining a detailed chain of evidence is critical for both remediation and potential legal proceedings.';
                      }
                  }
                  
                  // Replace placeholders with randomized realistic values
                  responseText = responseText
                      .replace('{ip-address}', `45.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`)
                      .replace('{hash1}', generateRandomHash())
                      .replace('{hash2}', generateRandomHash())
                      .replace('{domain1}', `cdn-${Math.random().toString(36).substring(2, 8)}.attacker-domain.com`)
                      .replace('{domain2}', `api.${Math.random().toString(36).substring(2, 8)}.cn`);
                  
                  // Add mentor response with professional styling
                  const mentorMsg = document.createElement('div');
                  mentorMsg.className = 'chat-message system';
                  mentorMsg.innerHTML = `
                      <div class="chat-avatar"><i class="fas fa-shield-alt"></i></div>
                      <div class="chat-content">
                          <p>${responseText}</p>
                          <span class="chat-time">${getCurrentTime()}</span>
                      </div>
                  `;
                  chatbox.appendChild(mentorMsg);
                  chatbox.scrollTop = chatbox.scrollHeight;
                  
                  // Indicate progress in detection if not already set
                  if (!detectionTime && !simulationStartTime) {
                      simulationStartTime = Date.now() - 60000; // Assume simulation started a minute ago
                      detectionTime = 60; // 60 seconds
                      if (timeDetectDisplay) {
                          timeDetectDisplay.textContent = '1:00';
                      }
                  }
                  
                  // Award +5 points for engaging with the mentor
                  updateScore(5, 'Security intelligence gathering');
              }, 1500);
          }
      }
      
      function getCurrentTime() {
          const now = new Date();
          return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      function generateRandomHash() {
          return Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
      }
      
      function escapeHTML(text) {
          return text
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
      }
  }

  // --- Professional SIEM Log Analysis Feed ---
  const siemFeed = document.getElementById('siem-feed');
  const logSourceSelect = document.getElementById('log-source');
  const logFilter = document.getElementById('log-filter');
  const filterBtn = document.getElementById('filter-btn');
  const analyzeLogsBtn = document.getElementById('analyze-logs');
  const exportLogsBtn = document.getElementById('export-logs');
  
  if (siemFeed) {
      // Structured SIEM log types for realistic simulation
      const logTypes = [
          { type: 'INFO', class: 'severity-info', source: 'Firewall', message: 'VPN connection established from {ip}', icon: 'lock' },
          { type: 'INFO', class: 'severity-info', source: 'Authentication', message: 'User {user} authenticated successfully', icon: 'user-check' },
          { type: 'WARNING', class: 'severity-warning', source: 'Authentication', message: 'Failed login attempt for user {user}', icon: 'exclamation-triangle' },
          { type: 'ERROR', class: 'severity-error', source: 'Firewall', message: 'Multiple connection attempts blocked from {ip}', icon: 'shield-exclamation' },
          { type: 'CRITICAL', class: 'severity-critical', source: 'IDS', message: 'Potential data exfiltration detected to {ip}', icon: 'skull-crossbones' },
          { type: 'INFO', class: 'severity-info', source: 'Endpoint', message: 'Antivirus scan completed on {hostname}', icon: 'search' },
          { type: 'WARNING', class: 'severity-warning', source: 'Network', message: 'Unusual traffic pattern detected from {hostname}', icon: 'chart-line' },
          { type: 'INFO', class: 'severity-info', source: 'Backup', message: 'System backup completed for {hostname}', icon: 'save' },
          { type: 'ERROR', class: 'severity-error', source: 'Vulnerability Scanner', message: 'Critical vulnerability {cve} detected on {hostname}', icon: 'bug' },
          { type: 'WARNING', class: 'severity-warning', source: 'API Gateway', message: 'Rate limit exceeded for {api} from {ip}', icon: 'server' },
          { type: 'INFO', class: 'severity-info', source: 'Proxy', message: 'Connection to {url} established from {ip}', icon: 'globe' },
          { type: 'ERROR', class: 'severity-error', source: 'Database', message: 'Failed login attempt to {db} from application {app}', icon: 'database' }
      ];
      
      const usernames = ['admin', 'jsmith', 'asinghal', 'msato', 'rjohnson', 'dkim', 'tjackson', 'system'];
      const hostnames = ['srv-db01', 'srv-web02', 'srv-auth01', 'wks-finance03', 'wks-dev12', 'srv-app04'];
      const apis = ['auth-api', 'payment-api', 'user-api', 'data-api', 'analytics-api'];
      const dbs = ['user_db', 'finance_db', 'transaction_db', 'analytics_db'];
      const apps = ['web-portal', 'mobile-app', 'admin-console', 'reporting-tool'];
      const cves = ['CVE-2025-1234', 'CVE-2025-5678', 'CVE-2024-7890', 'CVE-2024-4321'];
      const urls = ['api.malicious-site.com', 'download.suspicious-cdn.net', 'data-exfil.evil-domain.org'];
      
      let anomalyDetected = false;
      let filteredLogs = [];
      let currentFilter = {
          source: 'all',
          text: ''
      };
      
      // Initialize log filter functionality
      if (logSourceSelect) {
          logSourceSelect.addEventListener('change', () => {
              currentFilter.source = logSourceSelect.value;
              applyLogFilters();
          });
      }
      
      if (logFilter && filterBtn) {
          filterBtn.addEventListener('click', () => {
              currentFilter.text = logFilter.value.toLowerCase();
              applyLogFilters();
          });
          
          logFilter.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                  currentFilter.text = logFilter.value.toLowerCase();
                  applyLogFilters();
              }
          });
      }
      
      // Add log analysis functionality
      if (analyzeLogsBtn) {
          analyzeLogsBtn.addEventListener('click', () => {
              // Display loading state
              analyzeLogsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
              analyzeLogsBtn.disabled = true;
              
              // Simulate analysis process
              setTimeout(() => {
                  // Generate analysis results
                  const threatDetected = Math.random() > 0.6;
                  
                  // Create special analysis log entry
                  const analysisEntry = document.createElement('p');
                  analysisEntry.className = `log-entry severity-${threatDetected ? 'critical' : 'info'}`;
                  
                  if (threatDetected) {
                      analysisEntry.innerHTML = `<span class="timestamp">[${getCurrentTimestamp()}]</span> <span class="source">[Analysis]</span> <span class="level">ALERT</span> Potential threat detected: Multiple failed authentication attempts followed by successful login and unusual data transfer patterns. Recommended action: Investigate user account activities.`;
                      
                      // Create notification for detected threat
                      createNotification('Threat Detected', 'Log analysis has identified a potential security incident', 'danger');
                      
                      // Award points for detection
                      updateScore(15, 'Threat pattern identified');
                  } else {
                      analysisEntry.innerHTML = `<span class="timestamp">[${getCurrentTimestamp()}]</span> <span class="source">[Analysis]</span> <span class="level">INFO</span> Log analysis complete. No significant threat patterns detected in current log set.`;
                      
                      // Award fewer points for routine analysis
                      updateScore(5, 'Log analysis conducted');
                  }
                  
                  // Add with animation
                  analysisEntry.style.opacity = '0';
                  siemFeed.insertBefore(analysisEntry, siemFeed.firstChild);
                  
                  anime({
                      targets: analysisEntry,
                      opacity: [0, 1],
                      translateX: [-10, 0],
                      duration: 500,
                      easing: 'easeOutQuad'
                  });
                  
                  // Reset button state
                  analyzeLogsBtn.innerHTML = '<i class="fas fa-search"></i> Run Log Analysis';
                  analyzeLogsBtn.disabled = false;
              }, 2000);
          });
      }
      
      // Add export functionality
      if (exportLogsBtn) {
          exportLogsBtn.addEventListener('click', () => {
              createNotification('Logs Exported', 'SIEM logs have been exported successfully', 'success');
              updateScore(5, 'Evidence preservation');
          });
      }
      
      // Create initial logs
      for (let i = 0; i < 5; i++) {
          createSIEMLog();
      }
      
      // Simulate SIEM log updates with varying frequency
      setInterval(createSIEMLog, 3000);
      
      // Occasionally simulate an anomaly detection
      setInterval(() => {
          if (!anomalyDetected && Math.random() > 0.7) {
              anomalyDetected = true;
              createAnomalyAlert();
              
              // Reset after some time
              setTimeout(() => {
                  anomalyDetected = false;
              }, 15000);
          }
      }, 10000);
      
      function createSIEMLog() {
          // Select a random log type
          const logInfo = logTypes[Math.floor(Math.random() * logTypes.length)];
          
          // Create log entry with proper formatting
          let logMessage = logInfo.message
              .replace('{ip}', `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`)
              .replace('{user}', usernames[Math.floor(Math.random() * usernames.length)])
              .replace('{hostname}', hostnames[Math.floor(Math.random() * hostnames.length)])
              .replace('{api}', apis[Math.floor(Math.random() * apis.length)])
              .replace('{db}', dbs[Math.floor(Math.random() * dbs.length)])
              .replace('{app}', apps[Math.floor(Math.random() * apps.length)])
              .replace('{cve}', cves[Math.floor(Math.random() * cves.length)])
              .replace('{url}', urls[Math.floor(Math.random() * urls.length)]);
          
          const logEntry = document.createElement('p');
          logEntry.className = `log-entry ${logInfo.class}`;
          logEntry.innerHTML = `<span class="timestamp">[${getCurrentTimestamp()}]</span> <span class="source">[${logInfo.source}]</span> <span class="level">${logInfo.type}</span> ${logMessage}`;
          logEntry.dataset.source = logInfo.source.toLowerCase();
          
          // Store log in filteredLogs array
          filteredLogs.unshift({
              element: logEntry,
              source: logInfo.source.toLowerCase(),
              text: logMessage.toLowerCase() + logInfo.type.toLowerCase()
          });
          
          // Apply current filter before adding to DOM
          const visible = (currentFilter.source === 'all' || currentFilter.source === logInfo.source.toLowerCase()) && 
                          (!currentFilter.text || logMessage.toLowerCase().includes(currentFilter.text));
          
          if (visible) {
              // Add with animation
              logEntry.style.opacity = '0';
              siemFeed.insertBefore(logEntry, siemFeed.firstChild);
              
              anime({
                  targets: logEntry,
                  opacity: [0, 1],
                  translateX: [-10, 0],
                  duration: 500,
                  easing: 'easeOutQuad'
              });
          }
          
          // Limit the number of logs stored
          if (filteredLogs.length > 100) {
              const removed = filteredLogs.pop();
              if (removed.element.parentNode === siemFeed) {
                  siemFeed.removeChild(removed.element);
              }
          }
          
          // Limit the number of visible logs
          if (siemFeed.children.length > 20) {
              siemFeed.removeChild(siemFeed.lastChild);
          }
          
          // Set detection time if this is the first log and not already set
          if (!detectionTime && !simulationStartTime) {
              simulationStartTime = Date.now();
          }
      }
      
      function createAnomalyAlert() {
          // Create special alert entry with critical formatting
          const alertEntry = document.createElement('p');
          alertEntry.className = 'log-entry severity-critical anomaly-alert';
          alertEntry.innerHTML = `<span class="timestamp">[${getCurrentTimestamp()}]</span> <span class="source">[SIEM]</span> <span class="level">CRITICAL</span> Anomaly detected: Unusual behavioral pattern identified. Multiple related events suggest coordinated attack activity.`;
          alertEntry.dataset.source = 'siem';
          
          // Add with special animation
          alertEntry.style.opacity = '0';
          siemFeed.insertBefore(alertEntry, siemFeed.firstChild);
          
          anime({
              targets: alertEntry,
              opacity: [0, 1],
              translateX: [-10, 0],
              backgroundColor: ['rgba(220, 53, 69, 0.2)', 'rgba(220, 53, 69, 0.4)', 'rgba(220, 53, 69, 0.2)'],
              duration: 800,
              easing: 'easeOutQuad'
          });
          
          // Create global notification
          createNotification('Security Alert', 'Critical anomaly detected in system logs. Immediate investigation required!', 'danger');
          
          // Set detection time if not already set
          if (!detectionTime && simulationStartTime) {
              detectionTime = Date.now() - simulationStartTime;
              if (timeDetectDisplay) {
                  const minutes = Math.floor(detectionTime / 60000);
                  const seconds = Math.floor((detectionTime % 60000) / 1000);
                  timeDetectDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
              }
              
              // Award points for detection
              updateScore(10, 'Anomaly detection');
          }
          
          // Store in filtered logs
          filteredLogs.unshift({
              element: alertEntry,
              source: 'siem',
              text: 'critical anomaly alert detection'
          });
      }
      
      function applyLogFilters() {
          // Clear current logs from display
          while (siemFeed.firstChild) {
              siemFeed.removeChild(siemFeed.firstChild);
          }
          
          // Apply filters and re-add matching logs
          let matchCount = 0;
          for (const log of filteredLogs) {
              const sourceMatch = currentFilter.source === 'all' || log.source === currentFilter.source;
              const textMatch = !currentFilter.text || log.text.includes(currentFilter.text);
              
              if (sourceMatch && textMatch && matchCount < 20) {
                  siemFeed.appendChild(log.element);
                  matchCount++;
              }
          }
          
          // Show filter applied notification
          createNotification('Filter Applied', `Showing ${matchCount} log entries matching criteria`, 'info');
      }
      
      function getCurrentTimestamp() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const seconds = now.getSeconds().toString().padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
      }
  }

  // --- Enhanced Risk Assessment Matrix ---
  const riskMatrix = document.getElementById('risk-matrix');
  const likelihoodSelect = document.getElementById('likelihood');
  const impactSelect = document.getElementById('impact');
  const currentRisk = document.getElementById('current-risk');
  const riskResponse = document.getElementById('risk-response');
  
  if (riskMatrix && likelihoodSelect && impactSelect && currentRisk) {
      // Set up risk matrix cell highlighting
      const matrixCells = riskMatrix.querySelectorAll('.matrix-cell:not(.header)');
      
      matrixCells.forEach(cell => {
          cell.addEventListener('click', () => {
              // Reset all cells
              matrixCells.forEach(c => c.classList.remove('selected'));
              
              // Highlight selected cell
              cell.classList.add('selected');
              
              // Get risk level from data attribute
              const riskLevel = cell.getAttribute('data-risk');
              
              // Update the current risk display
              updateRiskLevel(riskLevel);
              
              // Generate risk response
              generateRiskResponse(riskLevel);
          });
      });
      
      // Set up risk level changes from dropdown selectors
      likelihoodSelect.addEventListener('change', updateRiskFromSelectors);
      impactSelect.addEventListener('change', updateRiskFromSelectors);
      function updateRiskFromSelectors() {
        const likelihood = likelihoodSelect.value;
        const impact = impactSelect.value;
        const riskLevel = calculateRiskLevel(likelihood, impact);
        updateRiskLevel(riskLevel);
        generateRiskResponse(riskLevel);
    }

    function calculateRiskLevel(likelihood, impact) {
        // Simple risk level calculation based on likelihood and impact
        const riskMatrix = {
            'low': { 'low': 'low', 'medium': 'medium', 'high': 'medium' },
            'medium': { 'low': 'medium', 'medium': 'high', 'high': 'high' },
            'high': { 'low': 'medium', 'medium': 'high', 'high': 'high' }
        };
        return riskMatrix[likelihood][impact];
    }

    function updateRiskLevel(riskLevel) {
        currentRisk.textContent = `Current Risk Level: ${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}`;
    }

    function generateRiskResponse(riskLevel) {
        let responseText = '';
        let responseClass = '';

        switch (riskLevel) {
            case 'low':
                responseText = 'Low risk detected. Standard monitoring is sufficient.';
                responseClass = 'alert-success';
                break;
            case 'medium':
                responseText = 'Medium risk detected. Increased monitoring and some mitigation steps are advised.';
                responseClass = 'alert-warning';
                break;
            case 'high':
                responseText = 'High risk detected. Immediate action and containment procedures are required!';
                responseClass = 'alert-danger';
                break;
        }

        riskResponse.innerHTML = `
            <div class="alert ${responseClass}">
                <h5><i class="bi bi-shield${riskLevel === 'high' ? '-fill' : ''}"></i> Risk Assessment Result</h5>
                <p>${responseText}</p>
            </div>
        `;

        // Animate response
        anime({
            targets: '#risk-response',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }
}

// --- Global Notification System ---
function createNotification(title, message, type = 'info') {
    // Create notification container if it doesn't exist
    let notifContainer = document.getElementById('notification-container');
    if (!notifContainer) {
        notifContainer = document.createElement('div');
        notifContainer.id = 'notification-container';
        document.body.appendChild(notifContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Set notification icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'danger') icon = 'exclamation-circle';

    notification.innerHTML = `
        <div class="notification-icon">
            <i class="bi bi-${icon}"></i>
        </div>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="bi bi-x"></i>
        </button>
    `;

    // Add to container
    notifContainer.appendChild(notification);

    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    // Set auto-dismiss timer
    const dismissTimeout = setTimeout(() => {
        dismissNotification(notification);
    }, 5000);

    // Add close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(dismissTimeout);
        dismissNotification(notification);
    });

    function dismissNotification(notif) {
        anime({
            targets: notif,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuad',
            complete: function() {
                notif.remove();
            }
        });
    }
}
});