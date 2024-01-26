import React from "react";
import { View } from "react-native";
import usePostsQuery from "../../api/celeste-blog/queries/usePostsQuery";
import { WebView } from "react-native-webview";
import { tw } from "tailwind";
import {PageContainer} from "../PageContainer";

const ArticleScreen = ({ route }) => {
  const postId = route?.params?.postId;
  const { data: cards, isLoading, isError } = usePostsQuery("card");

  if (isLoading) return null;
  if (isError) return null;
  if (!cards || !postId) return null;

  const card = cards.find((card) => card.id === postId);

  return (
    <PageContainer>
      <View style={tw("flex-1")}>
        <WebView
          key={card.id}
          source={{ uri: card.link }}
          originWhitelist={["*"]}
          style={tw("flex-1")}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </PageContainer>
  );
};

export default ArticleScreen;
