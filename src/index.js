document.addEventListener('DOMContentLoaded', () => {
    const headerMenu = document.querySelector("#ramen-menu");
    const detailMenu = document.querySelector("#ramen-detail");
 
    fetch ("http://localhost:3000/ramens")
    .then (response => response.json())
    .then (ramens => {
        ramens.forEach (ramen => {
            const img = document.createElement('img');
            img.src = ramen.image;
            img.addEventListener("click", () => showInfo(ramen));
            headerMenu.appendChild(img);
        });
    });

    function showInfo (ramen) {
        const nameElement = document.querySelector(".name");
        const restaurantElement = document.querySelector(".restaurant");
        const ratingElement = document.querySelector("#rating-display");
        const commentElement = document.querySelector("#comment-display");
    
        nameElement.textContent = ramen.name;
        restaurantElement.textContent = ramen.restaurant;
        ratingElement.textContent = ramen.rating;
        commentElement.textContent = ramen.comment;
    
        const detailImage = document.querySelector(".detail-image");
        detailImage.src = ramen.image;
        detailImage.alt = ramen.name;
    }

document.querySelector("#new-ramen").addEventListener('submit', handleSubmit);

function handleSubmit (e) {
    e.preventDefault();
    let ramenObj = {
        name:  e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.new-comment.value,
    };
    showInfo(ramenObj);
    addNewRamen(ramenObj);
}

const newRamenForm = document.querySelector("#new-ramen");
  newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newRamenForm);
    const newRamen = {
      name: formData.get("name"),
      restaurant: formData.get("restaurant"),
      image: formData.get("image"),
      rating: formData.get("rating"),
      comment: formData.get("new-comment")
    };
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.addEventListener("click", () => showInfo(ramen));
      headerMenu.appendChild(img);
    });
    newRamenForm.reset();
  });
});