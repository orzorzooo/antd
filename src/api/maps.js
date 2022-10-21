import { request, api, BASEURL } from "@/utils/request";

const SEARCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";

export const findAll = (locate) =>
  request(`${SEARCH_URL}${locate}.json?access_token=${ACCESS_TOKEN}`, "get");
// https://api.mapbox.com/geocoding/v5/mapbox.places23.json?access_token=pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg
