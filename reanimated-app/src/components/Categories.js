import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Categories({
  mealCategories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {mealCategories.map((item, index) => {
          let isActive = item.strCategory === activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";

          return (
            <>
              <TouchableOpacity
                key={index.toString()}
                onPress={() => setActiveCategory(item.strCategory)}
                className="flex items-center space-y-1 mr-3"
              >
                <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                  <Image
                    source={{ uri: item.strCategoryThumb }}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  />
                </View>
                <Text
                  className="text-neutral-600"
                  style={{ fontSize: hp(1.6) }}
                >
                  {item.strCategory}
                </Text>
              </TouchableOpacity>
            </>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

{
  /* 
        It is not advices to use a Virtualised list inside a ScrollView, which is why i'm using map()
        <FlatList
          data={categoryData}
          keyExtractor={(item, index) => index}
          horizontal
          className="space-x-10"
          renderItem={({ item }) => (
            
          )}
        /> 
        */
}
