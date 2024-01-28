import React, { useEffect, useState } from "react";
import axios from "axios";

const useData = () => {
  useEffect(() => {
    getCategories();
  }, []);

  const [mealCategories, setMealCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response) {
        setMealCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Error while fetching categories", error.message);
    }
  };
  return { mealCategories };
};

export default useData;
