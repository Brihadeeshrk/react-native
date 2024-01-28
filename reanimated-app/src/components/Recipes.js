import { View, Text } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";

export default function Recipes() {
  return (
    <View className="mx-4" space-y-3>
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        Recipes
      </Text>

      {/* Masonry Layout */}
      <View></View>
    </View>
  );
}
