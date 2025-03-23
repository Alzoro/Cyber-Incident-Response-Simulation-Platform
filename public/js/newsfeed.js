// newsfeed.js
document.addEventListener('DOMContentLoaded', () => {
    const newsFeedContainer = document.getElementById('news-feed');
    const attackName = newsFeedContainer.getAttribute('data-attack').toLowerCase();
  
    // Map attack names to specific search queries for better results
    const attackQueries = {
      "ransomware": "ransomware cyber attack",
      "phishing": "phishing email scam",
      "ddos": "DDoS attack cybersecurity",
      "sql injection": "SQL injection database breach",
      "malware": "malware infection cyber attack",
      "zero day": "zero day vulnerability exploit",
      "man in the middle": "man-in-the-middle attack network security",
      "brute force": "brute force attack password hacking",
      "trojan": "trojan virus cybersecurity",
      "social engineering": "social engineering attack cybersecurity"
    };
  
    // Use predefined query if available, otherwise default to the attack name
    const searchQuery = attackQueries[attackName] || attackName;
  
    // NewsAPI endpoint with filters for relevance and English-only news
    const apiKey = '33e5d1a2594e4163a35234ffa6220175';
    const url = `https://newsapi.org/v2/everything?q="${encodeURIComponent(searchQuery)}"&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.articles && data.articles.length) {
          let newsHTML = '';
          data.articles.forEach(article => {
            newsHTML += `
              <div class="news-item">
                <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                <p>${article.description || ''}</p>
              </div>
            `;
          });
          newsFeedContainer.innerHTML = newsHTML;
        } else {
          newsFeedContainer.innerHTML = '<p>No relevant news available at this time.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        newsFeedContainer.innerHTML = '<p>Error fetching news feed.</p>';
      });
  });
  