import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

export default function RecipeDetailsScreen({ navigation, route }) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  useLayoutEffect(() => {
    const { idMeal, strMealThumb, strMeal } = route.params;
    setRecipeDetails({ idMeal, strMealThumb, strMeal });
  }, [navigation, route]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <StatusBar style="light" />

      {/* Recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: recipeDetails.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 5,
          }}
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
    </ScrollView>
  );
}
