import React from "react";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const WelcomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo with rings around it */}
      <View className="bg-white/20 rounded-full p-10">
        <View className="bg-white/20 rounded-full p-8">
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>

      {/* title and subtitle */}
      <View className="flex items-center space-y-2">
        <Text className="font-bold text-white tracking-widest text-6xl">
          Recipe App
        </Text>
        <Text className="font-medium text-white tracking-widest text-lg">
          One place for all Recipes
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
