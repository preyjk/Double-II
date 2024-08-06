import AuthService from '../../service/AuthService.mjs';

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
};

export const signupHandler = async (event) => {
  const body = JSON.parse(event.body);
  const { username, password } = body;

  try {
    const result = await AuthService.signup({ username, password });
    return {
      statusCode: result.success ? 200 : 400,
      headers,
      body: JSON.stringify(result.message)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};

export const loginHandler = async (event) => {
  const body = JSON.parse(event.body);
  const { username, password } = body;

  try {
    const result = await AuthService.login({ username, password });
    return {
      statusCode: result.success ? 200 : 401,
      headers,
      body: JSON.stringify(result.success ? { token: result.token } : result.message)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};
