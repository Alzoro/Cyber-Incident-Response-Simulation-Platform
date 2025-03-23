// server.js
const express = require('express');
const path = require('path');
const morgan = require('morgan'); // Logging middleware
const helmet = require('helmet'); // Security middleware
const compression = require('compression'); // Performance middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced security with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for development, enable in production
}));

// Compress responses
app.use(compression());

// Request logging
app.use(morgan('dev'));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Attack data with 10 advanced cyber-attacks (original data preserved)
const attacks = [
  {
    id: 'phishing',
    name: 'Phishing',
    description: 'Disguised emails or messages trick users into revealing sensitive information.',
    mitigation: 'Verify senders, use email filters, and educate staff on phishing tactics.',
    simulation: 'Follow the lifecycle of a phishing email—from receipt to mitigation.',
    severity: 'High',
    frequency: '76%',
    steps: [
      { step: 'Email Received', detail: 'A suspicious email lands in the inbox.' },
      { step: 'Header Analysis', detail: 'Analyze the email header for spoofed addresses.' },
      { step: 'Link Verification', detail: 'Hover over links to check for malicious URLs.' },
      { step: 'User Action', detail: 'Decide to report or delete the email.' }
    ],
    tips: 'Always verify unexpected requests and educate users regularly.'
  },
  {
    id: 'ddos',
    name: 'DDoS Attack',
    description: 'Massive traffic floods a system to overwhelm its resources.',
    mitigation: 'Deploy traffic filtering, use CDNs, and increase network capacity.',
    simulation: 'Watch how abnormal traffic is detected and mitigated in real time.',
    severity: 'Critical',
    frequency: '43%',
    steps: [
      { step: 'Traffic Spike', detail: 'Sudden surge in network requests detected.' },
      { step: 'Pattern Analysis', detail: 'Identify malicious IP addresses.' },
      { step: 'Filtering Initiated', detail: 'Activate traffic filtering mechanisms.' },
      { step: 'Normalcy Restored', detail: 'Traffic returns to normal levels.' }
    ],
    tips: 'Maintain proactive monitoring and have pre-configured filtering rules.'
  },
  {
    id: 'ransomware',
    name: 'Ransomware Attack',
    description: 'Malware encrypts files and demands payment for decryption.',
    mitigation: 'Isolate affected systems, restore from backups, and do not pay the ransom.',
    simulation: 'Experience the step-by-step progression of a ransomware attack.',
    severity: 'Critical',
    frequency: '54%',
    steps: [
      { step: 'Infection', detail: 'An employee opens a malicious attachment.' },
      { step: 'Encryption Begins', detail: 'Critical files are being encrypted silently.' },
      { step: 'Ransom Note', detail: 'A ransom note appears on the screen.' },
      { step: 'Response', detail: 'Isolate the system and start recovery procedures.' }
    ],
    tips: 'Regular backups and prompt isolation are key defenses.'
  },
  {
    id: 'sql-injection',
    name: 'SQL Injection',
    description: 'Attackers insert malicious SQL queries to manipulate a database.',
    mitigation: 'Use parameterized queries, validate inputs, and employ WAFs.',
    simulation: 'Simulate an SQL injection attack and see how the system is exploited.',
    severity: 'High',
    frequency: '31%',
    steps: [
      { step: 'Input Vulnerability', detail: 'User input field is not properly sanitized.' },
      { step: 'Malicious Query', detail: 'Injected SQL code attempts to dump data.' },
      { step: 'Database Compromise', detail: 'Sensitive data is extracted by the attacker.' },
      { step: 'Detection & Patch', detail: 'Anomaly detected and query filters are applied.' }
    ],
    tips: 'Always sanitize inputs and use prepared statements.'
  },
  {
    id: 'xss',
    name: 'Cross-Site Scripting (XSS)',
    description: 'Attackers inject malicious scripts into webpages viewed by other users.',
    mitigation: 'Escape user input, use Content Security Policy, and validate data.',
    simulation: 'Follow the injection and execution process of an XSS attack.',
    severity: 'Medium',
    frequency: '39%',
    steps: [
      { step: 'Script Injection', detail: 'Malicious script is inserted into a webpage.' },
      { step: 'Script Execution', detail: 'The injected script runs in another users browser.' },
      { step: 'Data Theft', detail: 'Sensitive session data is stolen.' },
      { step: 'Mitigation', detail: 'Scripts are sanitized and CSP is enforced.' }
    ],
    tips: 'Implement robust input sanitization and strict CSP headers.'
  },
  {
    id: 'insider-threat',
    name: 'Insider Threat',
    description: 'A trusted employee misuses access to compromise sensitive data.',
    mitigation: 'Monitor user behavior, enforce least privilege, and audit activities.',
    simulation: 'Trace the actions of an insider from suspicious behavior to data compromise.',
    severity: 'High',
    frequency: '22%',
    steps: [
      { step: 'Abnormal Access', detail: 'Employee accesses sensitive files unusually.' },
      { step: 'Data Exfiltration', detail: 'Files are copied to an external drive.' },
      { step: 'Detection', detail: 'Anomaly in access patterns triggers an alert.' },
      { step: 'Investigation', detail: 'A thorough investigation is initiated.' }
    ],
    tips: 'Regularly monitor and audit user activity to catch early signs.'
  },
  {
    id: 'mitm',
    name: 'Man-In-The-Middle',
    description: 'Attackers intercept communications between two parties.',
    mitigation: 'Use encryption, secure protocols, and strong authentication methods.',
    simulation: 'Visualize how a man-in-the-middle attack intercepts and alters communications.',
    severity: 'Medium',
    frequency: '18%',
    steps: [
      { step: 'Interception', detail: 'Communication channel is compromised.' },
      { step: 'Data Capture', detail: 'Sensitive information is captured during transit.' },
      { step: 'Data Alteration', detail: 'Data packets are modified by the attacker.' },
      { step: 'Encryption Enforced', detail: 'Proper encryption stops further interception.' }
    ],
    tips: 'Always use end-to-end encryption and secure authentication methods.'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Attack',
    description: 'Attackers compromise a trusted third-party vendor to infiltrate a target.',
    mitigation: 'Vet suppliers thoroughly and monitor third-party software updates.',
    simulation: 'Simulate a supply chain compromise from software update injection to target infiltration.',
    severity: 'Critical',
    frequency: '17%',
    steps: [
      { step: 'Vendor Breach', detail: 'An attacker breaches a vendors system.' },
      { step: 'Malware Injection', detail: 'Malware is injected into a legitimate software update.' },
      { step: 'Deployment', detail: 'Infected update is distributed to clients.' },
      { step: 'Detection & Response', detail: 'The breach is detected and containment measures are taken.' }
    ],
    tips: 'Perform regular security assessments of all third-party vendors.'
  },
  {
    id: 'apt',
    name: 'Advanced Persistent Threat (APT)',
    description: 'A prolonged and targeted cyberattack aimed at stealing data over time.',
    mitigation: 'Employ network segmentation, continuous monitoring, and threat intelligence.',
    simulation: 'Experience an APT scenario from initial breach to data exfiltration over time.',
    severity: 'Critical',
    frequency: '12%',
    steps: [
      { step: 'Initial Intrusion', detail: 'An attacker gains initial access through a vulnerability.' },
      { step: 'Lateral Movement', detail: 'The attacker moves through the network, escalating privileges.' },
      { step: 'Data Collection', detail: 'Sensitive data is gradually collected.' },
      { step: 'Exfiltration', detail: 'Data is exfiltrated without triggering alarms.' }
    ],
    tips: 'Maintain constant vigilance with proactive threat hunting and segmentation.'
  },
  {
    id: 'zero-day',
    name: 'Zero-Day Exploit',
    description: 'Exploitation of a previously unknown vulnerability before a patch is available.',
    mitigation: 'Use behavior-based detection, application whitelisting, and rapid incident response.',
    simulation: 'Follow the attack progression of a zero-day exploit from discovery to exploitation.',
    severity: 'Critical',
    frequency: '8%',
    steps: [
      { step: 'Vulnerability Discovery', detail: 'A zero-day vulnerability is found in the system.' },
      { step: 'Exploit Launch', detail: 'Attackers launch an exploit to take advantage of the flaw.' },
      { step: 'System Compromise', detail: 'The system is compromised before a patch is issued.' },
      { step: 'Emergency Patch', detail: 'Security teams scramble to contain and patch the vulnerability.' }
    ],
    tips: 'Keep systems updated and use advanced detection systems for abnormal behaviors.'
  }
];

// API routes for AJAX requests
app.get('/api/attacks', (req, res) => {
  res.json(attacks);
});

app.get('/api/attack/:attackId', (req, res) => {
  const attack = attacks.find(a => a.id === req.params.attackId);
  if (!attack) {
    return res.status(404).json({ error: 'Attack type not found' });
  }
  res.json(attack);
});

// Add SIEM data API endpoint
app.get('/api/siem/:attackId', (req, res) => {
  const attackId = req.params.attackId;
  const logs = generateSIEMLogs(attackId);
  res.json(logs);
});

// Generate fake SIEM logs based on attack type
function generateSIEMLogs(attackId) {
  const now = new Date();
  const baseTimestamp = now.getTime();
  const logs = [];
  
  // Common log types
  const logTypes = ['Authentication', 'Network', 'System', 'Application', 'Security'];
  
  // IP addresses
  const internalIPs = ['192.168.1.45', '10.0.0.23', '172.16.5.12', '192.168.0.5'];
  const externalIPs = ['203.0.113.45', '198.51.100.67', '45.76.123.45', '91.23.45.67'];
  
  // Generate 15 logs with attack-specific content
  for (let i = 0; i < 15; i++) {
    const timestamp = new Date(baseTimestamp - (i * 60000 * Math.random() * 10));
    const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
    let severity, message, sourceIP, destinationIP;
    
    // Customize logs based on attack type
    switch(attackId) {
      case 'phishing':
        severity = ['Medium', 'High', 'Critical'][Math.floor(Math.random() * 3)];
        sourceIP = externalIPs[Math.floor(Math.random() * externalIPs.length)];
        destinationIP = internalIPs[Math.floor(Math.random() * internalIPs.length)];
        message = [
          'Suspicious email attachment detected',
          'Unusual email sender domain identified',
          'Email link redirects to known phishing domain',
          'User clicked on suspicious URL in email',
          'Email contains known phishing keywords'
        ][Math.floor(Math.random() * 5)];
        break;
        
      case 'ddos':
        severity = ['High', 'Critical'][Math.floor(Math.random() * 2)];
        sourceIP = externalIPs[Math.floor(Math.random() * externalIPs.length)];
        destinationIP = '203.0.113.10'; // Target server
        message = [
          'Abnormal traffic spike detected',
          'SYN flood attack identified',
          'UDP flood attack in progress',
          'HTTP request flood detected',
          'Traffic throttling initiated'
        ][Math.floor(Math.random() * 5)];
        break;
        
      // Add other attack types with specific logs
      case 'ransomware':
        severity = ['High', 'Critical'][Math.floor(Math.random() * 2)];
        sourceIP = internalIPs[Math.floor(Math.random() * internalIPs.length)];
        destinationIP = externalIPs[Math.floor(Math.random() * externalIPs.length)];
        message = [
          'Multiple file encryption operations detected',
          'Known ransomware file extension observed',
          'Suspicious process accessing multiple files rapidly',
          'Network traffic to known ransomware C2 server',
          'Shadow copy deletion attempted'
        ][Math.floor(Math.random() * 5)];
        break;
        
      // Default for other attacks
      default:
        severity = ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)];
        sourceIP = Math.random() > 0.5 ? externalIPs[Math.floor(Math.random() * externalIPs.length)] : internalIPs[Math.floor(Math.random() * internalIPs.length)];
        destinationIP = internalIPs[Math.floor(Math.random() * internalIPs.length)];
        message = [
          'Suspicious activity detected',
          'Abnormal user behavior observed',
          'Unusual system process initiated',
          'Multiple authentication failures',
          'Potential data exfiltration attempt'
        ][Math.floor(Math.random() * 5)];
    }
    
    logs.push({
      id: `log-${attackId}-${i}`,
      timestamp: timestamp.toISOString(),
      type: logType,
      severity: severity,
      source_ip: sourceIP,
      destination_ip: destinationIP,
      message: message,
      user: Math.random() > 0.7 ? ['admin', 'jsmith', 'agarcia', 'mkhan'][Math.floor(Math.random() * 4)] : null
    });
  }
  
  // Sort by timestamp (newest first)
  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Homepage route: display all available attacks
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/simulate', (req, res) => {
  res.render('index', { attacks });
});

// Attack detail route: display details and simulation for the selected attack
app.get('/attack/:attackId', (req, res) => {
  const attack = attacks.find(a => a.id === req.params.attackId);
  if (!attack) {
    return res.status(404).render('error', { message: 'Attack type not found.' });
  }
  res.render('attack', { attack });
});

// Dashboard route: analytics and overview
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { attacks });
});

// Training resources route
app.get('/training', (req, res) => {
  res.render('training');
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});