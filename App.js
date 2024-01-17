import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import AppController from "./AppController";
import { AppProvider } from "./src/context/AppContext";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws.config";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreAllLogs()
Amplify.configure(awsconfig());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
    },
  },
});

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppController />
      </AppProvider>
    </QueryClientProvider>
  );
};