import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { tw, getColor } from "../../tailwind";
import moment from "moment";

const ArticleCard = ({ card }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (card.categories.includes(5)) {
      Linking.openURL(card.acf.external_url);
    } else {
      navigation.navigate("Article", { postId: card.id });
    }
  };

  return (
    <TouchableOpacity
      style={[
        tw("flex-1 mx-3 mt-4 bg-white rounded-lg overflow-hidden"),
        styles.cardWrapper,
      ]}
      onPress={() => handleNavigate()}
    >
      {card.featured_media ? (
        <View style={tw("w-full")}>
          <Image
            source={{
              uri: `${card.better_featured_image.source_url}`,
            }}
            style={tw("h-36 w-full")}
          />
        </View>
      ) : null}

      <View style={tw("p-4 flex-1")}>
        <Text style={tw("font-nunito-400 text-base text-gray-500 my-1")}>
          {moment(card.date).format("MMMM DD, YYYY")}
        </Text>
        <Text
          style={tw(
            "text-celeste-blue text-2xl font-semibold font-nunito-400 my-1"
          )}
        >
          {card.title.rendered}
        </Text>
        <Text style={tw("font-nunito-400 text-base text-gray-500 my-1")}>
          {card.excerpt.rendered.substr(0, 150).replace(/(<([^>]+)>)/gi, "")}
          {card.excerpt.rendered.length > 150 ? "..." : null}
        </Text>
        <View style={tw("flex flex-row items-center my-1")}>
          <Text style={tw("mr-1 text-celeste-blue font-nunito-400")}>
            Read more
          </Text>
          <ArrowRightIcon color={getColor("celeste-blue")} size={16} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
    elevation: 5,
  },
  cardDescription: {
    color: "#6B7280",
    fontSize: 14,
    flex: 1,
  },
});
