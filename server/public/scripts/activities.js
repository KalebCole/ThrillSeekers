const renderActivities = async () => {
  const response = await fetch("/activities");
  const data = await response.json();
};

const mainContent = document.getElementById("main-content");

if (data) {
  data.map((activity) => {
    // create card container
    const activityContainer = document.createElement("div");
    activityContainer.className = "card";
    // create top container within card
    const topContainer = document.createElement("div");
    topContainer.className = "top-container";
    topContainer.style.backgroundImage = `url(${activity.image})`;

    // create bottom container within card
    const bottomContainer = document.createElement("div");
    bottomContainer.className = "bottom-container";
    const activityName = document.createElement("h3");
    activityName.textContent = activity.name;
    bottomContainer.appendChild(activityName);
    const activityPrice = document.createElement("p");
    activityPrice.textContent = `$${activity.price}`;
    bottomContainer.appendChild(activityPrice);

    const activityAudience = document.createElement("p");
    activityAudience.textContent = activity.audience;
    bottomContainer.appendChild(activityAudience);

    const readMoreTag = document.createElement("a");
    readMoreTag.textContent = "Read More > ";
    readMoreTag.href = `/activities/${activity.id}`;
    readMoreTag.role = "button";
    bottomContainer.appendChild(readMoreTag);

    // append top and bottom containers to card container
    activityContainer.appendChild(topContainer);
    activityContainer.appendChild(bottomContainer);

    // append card container to main content
    mainContent.appendChild(activityContainer);
  });
} else {
  const message = document.createElement("h2");
  message.textContent = "No Activities Available 😞";
  mainContent.appendChild(message);
}

renderActivities();
