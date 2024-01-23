export default () => {
  return {
    Auth: {
      region: "us-west-2",
      userPoolId: process.env.COGNITO_USER_POOL || "us-east-1_ITgABQ3nm",
      userPoolWebClientId:
        process.env.COGNITO_WEB_CLIENT || "5oqqtrhr5t6n1m9ik5ejlmfma4",
      authenticationFlowType: "USER_PASSWORD_AUTH",
    }
  };
};
