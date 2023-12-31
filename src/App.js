// Importing necessary dependencies and styles
import Styles from "./App.module.css";
// import { Link } from "react-router-dom";
import { useState } from "react";

// App component function
function App() {
  // State hook to manage the success message

  const [successMessage, setSuccessMessage] = useState([]);

  // Function to handle the image upload via HTTP POST request
  const uploadImageViaHttpPostRequest = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Submit button clicked");

    // Get the selected image file from the input element with id "image"
    const imageFile = document.getElementById("image").files[0];
    console.log(imageFile);

    // Check if an image file is selected
    if (imageFile) {
      // Create a FormData object to store the image file for sending in the request
      const formData = new FormData();
      formData.append("image", imageFile);

      console.log(formData);

      try {
        // Use the Fetch API to make an HTTP POST request to the server endpoint
        const response = await fetch(
          "http://localhost:4000/uploadsingleimage",
          {
            method: "POST",
            body: formData, // Attach the FormData containing the image file
          }
        );

        //   Check if the server response is successful (status code in the range 200-299)
        if (response.ok) {
          // Parse the JSON response from the server
          const data = await response.json();
          // Update the success message state with the message from the server
          setSuccessMessage(data);
          console.log("success message", successMessage);
        } else if (response.status === 400) {
          // If there's a 400 Bad Request status, parse the JSON response
          const data = await response.json();
          // Update the success message state with the error message from the server
          setSuccessMessage(data);
        } else {
          // Log an error if the response status is not in the success or 400 range
          console.error("Frontend:", response.statusText);
        }
      } catch (error) {
        // Log an error if there's an issue with the HTTP request
        console.error("Frontend Error:", error.message);
      }
    }
  };

  return (
    // ------------------------- overviewContainer provides ability to position the helpRequestsContainer
    <div className={Styles.OverviewContainer}>
      <img src={process.env.PUBLIC_URL + '/turners-logo.png'} alt="turners logo" />
      <h1>Find something similar</h1>

      {/* Form to handle the image upload, with an onSubmit event triggering the uploadImageViaHttpPostRequest function */}
      <form onSubmit={uploadImageViaHttpPostRequest}>
        {/* Label for the file input */}
        <label htmlFor="image">Upload an image: </label>
        {/* Input element allowing the selection of image files, restricted to image types */}
        <input type="file" id="image" name="image" accept="image/*" />
        {/* Button to submit the form and trigger the image upload */}
        <button type="submit">Upload</button>
      </form>

      {/* ------------------------ helpRequestsContainer holds all content displayed within the overContainer */}
      <div className={Styles.similarCarsContainer}>
        <div className={Styles.container}>
          {successMessage &&
            successMessage.map(function (car) {
              return (
                <div className={Styles.carsContainer} key={car._id}>
                  <div key={car._id} className={Styles.card}>
                  <img
                    src={car.image}
                    alt="cars"
                    className={Styles.carImage}
                  />
                  <p>Make: {car.make.toUpperCase()}</p>
                  <p>Model: {car.model.toUpperCase()}</p>
                  <p>Body Style: {car.bodyStyle.toUpperCase()}</p>
                  <p>Year: {car.year}</p>
                  <p>Price {car.price}</p>
                </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* ^^^^^^^^^^^^^^^ END of helpRequestsContainer */}
    </div>
    // ^^^^^^^^^^^^^^ END of overviewContainer
    // ^^^^^^^
  );
}

// Export the App component as the default export
export default App;
