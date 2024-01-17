import { useFocusEffect } from "@react-navigation/core";
import { useCallback } from "react";
import { useQuery } from "react-query";

// export function useReactNavigationQuery(queryKey, queryFn, options) {
//   const useQueryReturn = useQuery(queryKey, queryFn, options);

//   useFocusEffect(
//     useCallback(() => {
//       if (
//         ((options?.refetchOnWindowFocus && useQueryReturn.isStale) ||
//           options?.refetchOnWindowFocus === "always") &&
//         options.enabled !== false
//       ) {
//         console.log(queryKey);
//         useQueryReturn.refetch();
//       }

//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [options?.enabled, options?.refetchOnWindowFocus])
//   );
export function useReactNavigationQuery(queryKey, queryFn, options) {
  const useQueryReturn = useQuery(queryKey, queryFn, options);

  useFocusEffect(
    useCallback(() => {
      if (options?.enabled !== false) {
        useQueryReturn.refetch(); // Always trigger a refetch when the screen is focused
      }
    }, [options?.enabled])
  );

  return useQueryReturn;
}
