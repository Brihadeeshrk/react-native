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

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response) {
        return response.data.meals;
      }

      return null;
    } catch (error) {
      console.log("Error while fetching recipes", error.message);
    }
  };

  const getRecipeById = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response) {
        return response.data.meals;
      }

      return null;
    } catch (error) {
      console.log("Error while fetching recipe", error.message);
    }
  };
  return { mealCategories, getRecipes, getRecipeById };
};

export default useData;
