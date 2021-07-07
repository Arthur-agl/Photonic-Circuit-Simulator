import circuitApi from "./circuit";
import componentApi from "./component";

export const baseURL = "http://localhost:5000";

export async function validateResponse(response, expectedErrorCodes = null) {
  if (response.ok) {
    let body = {};
    try {
      body = await response.text();
      body = body === 'OK' ? {} : JSON.parse(body);
    } catch (error) {
      if (!/SyntaxError: JSON.parse/i.test(error)) {
        throw error;
      }
    }
    return {
      body: body,
      ok: true,
    };
  } else {
    if (expectedErrorCodes !== null) {
      let body = {};
      try {
        body = await response.text();
        body = body === 'OK' ? {} : JSON.parse(body);
      } catch (error) {
        if (!/SyntaxError: JSON.parse/i.test(error)) {
          throw error;
        }
      }

      return {
        ok: expectedErrorCodes.includes(body.code),
      };
    } else {
      const text = await response.text();
      console.log(`API error: ${text}`);
      return {
        ok: false,
      };
    }
  }
}

async function healthCheck() {
  const response = await fetch(baseURL);
  const body = await response.json();
  return body.message;
}

export default { healthCheck, ...componentApi, ...circuitApi };
