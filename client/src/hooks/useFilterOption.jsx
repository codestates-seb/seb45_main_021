import { useLocation, useNavigate } from 'react-router';
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
  const options = {
    lang: queryParams.get('lang') || DEFAULT_OPTIONS.lang,
    sort: queryParams.get('sort') || DEFAULT_OPTIONS.sort,
    employ: queryParams.get('employ') === 'true' || false,
    keyword: queryParams.get('keyword') || DEFAULT_OPTIONS.keyword,
    searchType: queryParams.get('searchType') || DEFAULT_OPTIONS.searchType,
  };

  const { searchType, lang, sort, employ, keyword } = options;

  const optionHandler = (name, value) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set(name, value);
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    navigate(newUrl);
  };

  const getApiUrl = (pageNum) => {
    const type = pageType === 'search' ? searchType : pageType;
    let newUrl = `${type}/search`;
    if (employ && type === 'portfolios') newUrl += '/employ';
    const params = [];

    if (keyword !== DEFAULT_OPTIONS.keyword) {
      const encodedKeyword = encodeURIComponent(keyword);
      params.push(`tags=${encodedKeyword}`);
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
