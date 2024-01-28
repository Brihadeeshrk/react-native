import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon } from "react-native-heroicons/outline";
import {
  HeartIcon,
  UsersIcon,
  FireIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/solid";
import useData from "../hooks/useData";
import Loading from "../components/Loading";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function RecipeDetailsScreen({ navigation, route }) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getRecipeById } = useData();

  useLayoutEffect(() => {
    const { idMeal, strMealThumb, strMeal } = route.params;
    setRecipeDetails({ idMeal, strMealThumb, strMeal });

    const fetchRecipeById = async () => {
      setLoading(true);
      try {
        const response = await getRecipeById(recipeDetails.idMeal);
        if (response) {
          setRecipeDetails((prev) => ({
            ...prev,
            ...response[0],
          }));
        }
      } catch (error) {
        setLoading(false);
        console.log("Error while fetching recipe", error.message);
      }
      setLoading(false);
    };

    fetchRecipeById();
  }, [navigation, route]);

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <StatusBar style="light" />

      {/* Recipe image */}
      <View className="flex-row justify-center">
        <Animated.Image
          source={{ uri: recipeDetails.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 5,
          }}
          sharedTransitionTag={recipeDetails.strMeal}
        />
      </View>

      {/* Back Button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Meal Description */}
      {loading ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* Name and Area */}
          <View className="space-y-2">
            <Text
              className="font-bold text-neutral-700"
              style={{ fontSize: hp(3) }}
            >
              {recipeDetails.strMeal}
            </Text>
            <Text
              className="font-medium text-neutral-500"
              style={{ fontSize: hp(2) }}
            >
              {recipeDetails.strArea}
            </Text>
          </View>

          {/* Misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                className="rounded-full bg-white flex items-center justify-center p-2"
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <ClockIcon size={hp(3.5)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  35
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                className="rounded-full bg-white flex items-center justify-center p-2"
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <UsersIcon size={hp(3.5)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  03
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                className="rounded-full bg-white flex items-center justify-center p-2"
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <FireIcon size={hp(3.5)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  103
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  Calories
                </Text>
              </View>
            </View>

            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                className="rounded-full bg-white flex items-center justify-center p-2"
                style={{ height: hp(6.5), width: hp(6.5) }}
              >
                <Square3Stack3DIcon
                  size={hp(3.5)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(recipeDetails).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {recipeDetails["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {recipeDetails["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
