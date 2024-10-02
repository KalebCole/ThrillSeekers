const renderActivities = async () => {
  const response = await fetch("/activities");
  if (!response.ok) {
    console.log("Error fetching data");
    return;
  }

  const data = await response.json();

  const mainContent = document.getElementById("main-content");


  if (data) {
    data.map((activity) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const topContainer = document.createElement("div");
      topContainer.classList.add("top-container");

      const bottomContainer = document.createElement("div");
      bottomContainer.classList.add("bottom-container");

      topContainer.style.backgroundImage = `url(${activity.image})`;

      const name = document.createElement("h3");
      name.textContent = activity.name;
      bottomContainer.appendChild(name);

      const priority = document.createElement("p");
      priority.textContent = "Priority: " + activity.priority;
      bottomContainer.appendChild(priority);

      const description = document.createElement("p");
      description.textContent = "Description: " + activity.description;
      bottomContainer.appendChild(description);

      const link = document.createElement("a");
      link.textContent = "Read More >";
      link.setAttribute("role", "button");
      link.href = `/activities/${activity.id}`;
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);
      mainContent.appendChild(card);
    });
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Activites Available 🥲";
    mainContent.appendChild(message);
  }
};

// url after the /
const requestedURL = window.location.href.split("/").pop();
// if not null, then 404
if (requestedURL) {
  window.location.href = "../404.html";
} else {
  renderActivities();
}
