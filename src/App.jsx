import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logoimg from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

// TVShowAPI.fetchPopulars();
export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recomendationList, setRecomendationList] = useState([]);
  async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0]);
    }
  }

  async function fetchRecomendations(tvShowId) {
    const recomendationListResp = await TVShowAPI.fetchRecomendations(tvShowId);
    if (recomendationListResp.length > 0) {
      setRecomendationList(recomendationListResp.slice(0, 10));
    }
  }
  async function fetchByTitle(title) {
    const searchResponse = await TVShowAPI.fetchByTitle(title);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }
  useEffect(() => {
    fetchPopulars();
  }, []);
  useEffect(() => {
    if (currentTVShow) {
      fetchRecomendations(currentTVShow.id);
    }
  }, [currentTVShow]);
  // console.log(recomendationList);
  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }
  return (
    <div className={s.main_container} style={{ background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black" }}>
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo img={logoimg} title={"Watowatch"} subtitle={"Find a show you may like"} />
            <div>Subtitle</div>
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>{currentTVShow && <TVShowDetail tvShow={currentTVShow} />}</div>
      <div className={s.recommended_tv_shows}>{currentTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recomendationList} />}</div>
    </div>
  );
}
