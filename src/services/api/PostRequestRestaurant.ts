import axios from "axios";

export const PostRequestRestaurant = () => {
  axios
    .post("https://school-restaurant-api.azurewebsites.net/restaurant/create", {
      name: "Steak&Grill",
      address: {
        street: "Drottninggatan 8",
        zip: "722 13",
        city: "Stockholm",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
