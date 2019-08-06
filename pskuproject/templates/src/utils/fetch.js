/* global fetch:true */
import "whatwg-fetch";

function getBaseUrl() {
  if (process.env.NODE_ENV === "dev" && process.env.ENDPOINT === "be") {
    return "";
  }
  if (process.env.NODE_ENV === "dev" && process.env.PROD_DEPLOY !== "prod") {
    return "";
  }
  return "";
}

const baseUrl = getBaseUrl();

function wrappedFetch(url, options = {}) {
  return fetch(`${url}`, options).then(response => {
    // return fetch(`${baseUrl}/${url}`).then(response => {
    if (response.status >= 400) {
      throw new Error(`Error while getting data from:  ${url}`);
    }
    // try {
    //   JSON.parse(response);
    // } catch (e) {
    //   throw new Error("Error while parsing response", response);
    // }
    return response;
  });
}

export default wrappedFetch;
