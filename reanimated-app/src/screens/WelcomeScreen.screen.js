import React from "react";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WelcomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo with rings around it */}
      {/* instead of giving a static padding of say p-10 or p-8, we can give dynamic padding based on the devices height and width, and this is a mixture of tailwind and rn-stylesheet */}
      <View className="bg-white/20 rounded-full" style={{ padding: hp(5.5) }}>
        <View className="bg-white/20 rounded-full" style={{ padding: hp(5) }}>
          <Image
            source={require("../../assets/images/welcome.png")}
            // instead of hard coding the height and width, now, the height and width of the image will be 20% of the screen height
            // both these values have hp(20) as we want to maintain the aspect ratio of the image
            style={{ width: hp(20), height: hp(20) }}
          />
        </View>
      </View>

      {/* title and subtitle */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          //   also setting the fontsize to be dynamic based on the devices height
          style={{ fontSize: hp(7) }}
        >
          Recipe App
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest"
        >
          One place for all Recipes
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
