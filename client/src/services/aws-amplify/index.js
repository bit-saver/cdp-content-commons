import Amplify from 'aws-amplify';

Amplify.configure( {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_COGNITO_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID
  }
} );
