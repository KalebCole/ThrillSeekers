const renderActivities = async () => {
  const response = await fetch("/activities");
  // debug
  console.log("inside renderActivities function");
  console.log("response: ", response);
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
      link.href = `/actives/${activity.id}`;
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

const renderActivity = async (activityId) => {
  console.log("in the renderActivity function");
  try {
    const response = await fetch(`/activities/${activityId}`); // call the server to get the activity with the id

    if (!response.ok) {
      throw new Error("Activity not found");
    }

    const activity = await response.json();
    console.log(activity);

    const mainContent = document.getElementById("main-content");

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
    link.textContent = "Go Back";
    link.setAttribute("role", "button");
    link.href = "/";
    bottomContainer.appendChild(link);

    card.appendChild(topContainer);
    card.appendChild(bottomContainer);
    mainContent.appendChild(card);
  } catch (error) {
    console.log(error);
  }
};

// check what the url is and then render accordingly
const checkAndRender = () => {
  // get the url after the dns name
  const urlPath = window.location.pathname;
  const urlSegments = urlPath.split("/").filter(Boolean); // ex. /activities/1 => ["activities", "1"]

  console.log("inside client/public/scripts/activities.js");

  console.log("urlPath: ", urlPath);

  console.log("urlSegments: ", urlSegments);

  // if the url is /activities/:id, render a singular activity
  if (urlSegments[0] === "actives" && urlSegments.length == 2) {
    // debug
    console.log("rendering singular activity");
    if (!isNaN(urlSegments[1])) {
      renderActivity(urlSegments[1]);
    }
  } else if (urlPath === "/actives" || urlPath === "/") {
    // debug
    console.log("rendering activities in client side");
    renderActivities();
  } else {
    // debug
    console.log("404");
    // window.location.href = "../404.html";
  }
};

checkAndRender();
