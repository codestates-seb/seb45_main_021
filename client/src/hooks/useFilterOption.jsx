import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearPage } from '../redux/usePage/pageSlice';
import { useEffect } from 'react';
const DEFAULT_OPTIONS = {
  lang: 'all',
  sort: 'latest',
  employ: false,
  keyword: '',
  searchType: 'project',
};

export default function useFilterOption() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageType = location.pathname.split('/')[1];
  const dispatch = useDispatch();
  const options = {
    lang: queryParams.get('lang') || DEFAULT_OPTIONS.lang,
    sort: queryParams.get('sort') || DEFAULT_OPTIONS.sort,
    employ: queryParams.get('employ') === 'true' || false,
    keyword: queryParams.get('keyword') || DEFAULT_OPTIONS.keyword,
    searchType: queryParams.get('searchType') || DEFAULT_OPTIONS.searchType,
  };

  const { searchType, lang, sort, employ, keyword } = options;

  // useEffect(() => {
  //   dispatch(clearPage());
  // }, [options, pageType, searchType]);

  const optionHandler = (name, value) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set(name, value);
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    navigate(newUrl);
  };

  const getApiUrl = (pageNum) => {
    const type = pageType === 'search' ? searchType : pageType;
    if (employ && type === 'portfolios') return 'employ 트루 리스트';
    let newUrl = `${type}/search`;
    const params = [];

    if (keyword !== DEFAULT_OPTIONS.keyword) {
      params.push(`tags=${keyword}`);
    }
    if (lang !== DEFAULT_OPTIONS.lang) {
      params.push(`lang=${lang}`);
    }
    if (sort !== DEFAULT_OPTIONS.sort) {
      params.push(`sort=heartCount,DESC`);
    }
    if (pageNum !== 0) {
      params.push(`page=${pageNum}`);
    }
    params.forEach((el, i) => (newUrl += `${i === 0 ? '?' : '&'}${el}`));
    return newUrl;
  };

  return {
    options,
    pageType,
    searchType,
    optionHandler,
    getApiUrl,
  };
}
