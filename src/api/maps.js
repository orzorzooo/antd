import { request, api, BASEURL } from "@/utils/request";
import axios from "axios";
export const URL = `${BASEURL}/map`;

const SEARCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
const ACCESS_TOKEN =
  "pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg";

export const findAll = (locate) =>
  request(`${SEARCH_URL}${locate}.json?access_token=${ACCESS_TOKEN}`, "get");
// https://api.mapbox.com/geocoding/v5/mapbox.places23.json?access_token=pk.eyJ1Ijoib3J6b3J6b29vIiwiYSI6ImNsOWh1dXpjdTVxeDgzdm9pa2cweG1raHUifQ.WEEOxYk0SqsysjOuOjUTmg

export const nominatim = (locate) =>
  axios.get("https://nominatim.openstreetmap.org/search", {
    params: { q: locate, format: "json" },
  });

// export const nisc_bus = ({ lon = 120, lat = 20, radius = 100 }) =>
//   axios.get(
//     `https://api.nlsc.gov.tw/other/MarkBufferAnlys/bus/${lon}/${lat}/${radius}`
//   );
export const nisc_bus = ({ lon = 120, lat = 20, radius = 100 }) =>
  api.get(`${URL}/nisc/bus`, { lon, lat, radius });
