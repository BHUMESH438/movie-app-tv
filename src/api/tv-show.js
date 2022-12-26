import axios from "axios";
import { FAKE_POPULARS } from "./fake_data";
import { BASE_URL, API_KEY_PARAM } from "../config";
export class TVShowAPI {
  static async fetchPopulars() {
    const res = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
    return res.data.results;
    // return FAKE_POPULARS;
  }
  static async fetchRecomendations(tvShowId) {
    const res = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`);
    return res.data.results;
  }
  static async fetchByTitle(title) {
    const res = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`);
    return res.data.results;
    // return FAKE_POPULARS;
  }
}
