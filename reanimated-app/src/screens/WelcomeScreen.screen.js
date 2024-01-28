import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const WelcomeScreen = ({ navigation, route }) => {
  // setting the initial padding to 0
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    // setting the initial padding to 0 when the page loads
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    // 100ms after the page loads, the padding will be increased by 5% of the screen height with a spring animation for ring1
    setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + hp(5))),
      100
    );

    // 300ms after the page loads, the padding will be increased by 5.5% of the screen height with a spring animation for ring2
    setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + hp(5.5))),
      300
    );

    // after sometime, navigating back to homescreen
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo with rings around it */}
      {/* instead of giving a static padding of say p-10 or p-8, we can give dynamic padding based on the devices height and width, and this is a mixture of tailwind and rn-stylesheet */}
      <Animated.View
        className="bg-white/20 rounded-full"
        // since we're animating the padding, we can set it to the reanimated value, same for ring1Padding
        style={{ padding: ring2Padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1Padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            // instead of hard coding the height and width, now, the height and width of the image will be 20% of the screen height
            // both these values have hp(20) as we want to maintain the aspect ratio of the image
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

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
