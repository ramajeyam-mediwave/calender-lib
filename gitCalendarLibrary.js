var gitCalendarLibrary = (function() {
  async function fetchGitHubData(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events/public`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      throw error;
    }
  }

  function displayGitHubCalendar(username, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error('Container element not found.');
      return;
    }

    fetchGitHubData(username)
      .then(data => {
        renderContributionData(data, container);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function renderContributionData(data, container) {
    container.innerHTML = '';

    const dailyContributionCount = {};

    data.forEach(event => {
      const eventType = event.type;
      const createdAt = new Date(event.created_at).toLocaleDateString();

      dailyContributionCount[createdAt] = (dailyContributionCount[createdAt] || 0) + 1;

      const repoName = event.repo.name;

      const eventElement = document.createElement('div');

      container.appendChild(eventElement);
    });

    const countContainer = document.createElement('div');
    countContainer.innerHTML = '<h2>Daily Contribution Count</h2>';

    Object.keys(dailyContributionCount).forEach(date => {
      const countElement = document.createElement('p');
      countElement.innerHTML = `<strong>${date}:</strong> ${dailyContributionCount[date]}`;
      countContainer.appendChild(countElement);
    });

    container.appendChild(countContainer);
  }


  

  return {
    fetchGitHubData: fetchGitHubData,
    displayGitHubCalendar: displayGitHubCalendar
  };
})();
