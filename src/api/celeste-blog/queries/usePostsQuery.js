import { useQuery } from "react-query";
import getCelesteBlogAPI from "../getCelesteBlogAPI";

export const GetCategoryId = async (categorySlug) => {
  const api = await getCelesteBlogAPI(false);
  const { data: category } = await api.get("/categories", {
    params: {
      slug: categorySlug,
    },
  });

  return category[0].id;
};

const GetPosts = async (categorySlug) => {
  const api = await getCelesteBlogAPI(true);

  const categoryId = await GetCategoryId(categorySlug);
  const { data: cards } = await api.get("/posts", {
    params: {
      categories: categoryId,
    },
  });

  // Sorting the cards array by date in descending order
  cards.sort((a, b) => new Date(b.date) - new Date(a.date)) ;

  return cards;
};

const usePostsQuery = (categorySlug) =>
  useQuery(["CELESTE_POSTS", categorySlug], () => GetPosts(categorySlug), {
    staleTime: 24 * 60 * 60 * 1000,
  });

export default usePostsQuery;


