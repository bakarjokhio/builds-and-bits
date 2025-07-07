fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projectContainer');

    const languageColors = {
      JavaScript: "linear-gradient(135deg, #f7e018, #f7c600)",
      Android: "linear-gradient(135deg, #a4c639, #8bc34a)",
      "React Native": "linear-gradient(135deg, #61dafb, #009dff)"
    };

    const categoryColors = {
      Educational: "linear-gradient(135deg, #6a11cb, #2575fc)",
      Health: "linear-gradient(135deg, #ff758c, #ff7eb3)",
      Utility: "linear-gradient(135deg, #43cea2, #185a9d)"
    };

    // Sort: featured > latest > level
    data.sort((a, b) => {
      if (a.featured !== b.featured) return b.featured - a.featured;
      if (a.timestamp !== b.timestamp) return new Date(b.timestamp) - new Date(a.timestamp);
      return b.level - a.level;
    });

    data.forEach(project => {
      const card = document.createElement('a');
      card.className = 'card';
      card.href = project.url;

      // Color based on language or category
      const langColor = languageColors[project.language];
      const catColor = categoryColors[project.category];
      card.style.background = langColor || catColor || '#007bff';

      // Determine font color based on background
const useLightText = bg.includes('#f7') || bg.includes('61dafb') || bg.includes('f0f2f5');
card.style.color = useLightText ? '#222' : '#fff';

      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p style="margin-top:0.5rem;font-size:0.8rem;">
          <strong>Language:</strong> ${project.language} <br/>
          <strong>Category:</strong> ${project.category} <br/>
          <strong>Level:</strong> ${project.level}
        </p>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load projects.json", err);
  });
