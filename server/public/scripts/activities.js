const renderActivities = async () => {
  const response = await fetch("/activities");
  const data = await response.json();

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
};

const renderActivity = async (activityId) => {
  console.log("activityId: ", activityId);
  try {
    const response = await fetch(`/activities/${activityId}`);

    if (!response.ok) {
      throw new Error("Activity not found");
    }

    const activity = await response.json();

    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ""; // Clear previous content

    // Create the card and add content dynamically for the single activity
    const card = document.createElement("div");
    card.classList.add("card");

    const topContainer = document.createElement("div");
    topContainer.classList.add("top-container");
    topContainer.style.backgroundImage = `url(${activity.image})`;

    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("bottom-container");

    const name = document.createElement("h3");
    name.textContent = activity.name;
    bottomContainer.appendChild(name);

    const price = document.createElement("p");
    price.textContent = "$" + activity.price;
    bottomContainer.appendChild(price);

    const audience = document.createElement("p");
    audience.textContent = activity.audience;
    bottomContainer.appendChild(audience);

    const description = document.createElement("p");
    description.textContent = activity.description;
    bottomContainer.appendChild(description);

    card.appendChild(topContainer);
    card.appendChild(bottomContainer);
    mainContent.appendChild(card);
  } catch (error) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `<h2>${error.message}</h2>`;
  }
};

// check what the url is and then render accordingly
const checkAndRender = () => {
  // get the url after the dns name
  const urlPath = window.location.pathname;
  const urlSegments = urlPath.split("/").pop(); // ex. /activities/1 => ["activities", "1"]

  console.log("inside client/public/scripts/activities.js");

  console.log("urlPath: ", urlPath);

  console.log("urlSegments: ", urlSegments);

  // if the url is /activities/:id, render a singular activity
  if (urlSegments[0] === "activities" && urlSegments.length == 2) {
    // debug
    console.log("rendering singular activity");
    if (!isNaN(urlSegments[1])) {
      renderActivity(requestedURL[1]);
    }
  } else if (urlPath === "/activities" || urlPath === "/") {
    // debug
    console.log("rendering activities");
    renderActivities();
  } else {
    // debug
    console.log("404");
    window.location.href = "../404.html";
  }
};

checkAndRender();
