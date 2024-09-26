const renderActivities = async () => {
  const response = await fetch("/gifts");
  const data = await response.json();
};

const mainContent = document.getElementById("main-content");

if (data) {
  data.map((gift) => {
    // create card container
    const giftContainer = document.createElement("div");
    giftContainer.className = "card";
    // create top container within card
    const topContainer = document.createElement("div");
    topContainer.className = "top-container";
    topContainer.style.backgroundImage = `url(${gift.image})`;

    // create bottom container within card
    const bottomContainer = document.createElement("div");
    bottomContainer.className = "bottom-container";
    const giftName = document.createElement("h3");
    giftName.textContent = gift.name;
    bottomContainer.appendChild(giftName);
    const giftPrice = document.createElement("p");
    giftPrice.textContent = `$${gift.price}`;
    bottomContainer.appendChild(giftPrice);

    const giftAudience = document.createElement("p");
    giftAudience.textContent = gift.audience;
    bottomContainer.appendChild(giftAudience);

    const readMoreTag = document.createElement("a");
    readMoreTag.textContent = "Read More > ";
    readMoreTag.href = `/gifts/${gift.id}`;
    readMoreTag.role = "button";
    bottomContainer.appendChild(readMoreTag);

    // append top and bottom containers to card container
    giftContainer.appendChild(topContainer);
    giftContainer.appendChild(bottomContainer);

    // append card container to main content
    mainContent.appendChild(giftContainer);
  });
} else {
  const message = document.createElement("h2");
  message.textContent = "No Gifts Available 😞";
  mainContent.appendChild(message);
}

renderActivities();
