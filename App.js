import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import AppController from "./AppController";
import { AppProvider } from "./src/context/AppContext";
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws.config";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreAllLogs();

//Amplify.configure(awsconfig());

Amplify.configure({
  Auth: {
    Cognito:{
      userPoolId: process.env.COGNITO_USER_POOL || "us-east-1_ITgABQ3nm",
      userPoolClientId: process.env.COGNITO_WEB_CLIENT || "5oqqtrhr5t6n1m9ik5ejlmfma4",
      //authenticationFlowType: "USER_PASSWORD_AUTH",
    }   
  },
});

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

