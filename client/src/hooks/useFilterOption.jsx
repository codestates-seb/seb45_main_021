import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

const DEFAULT_OPTIONS = {
  lang: 'all',
  sort: 'latest',
  employ: false,
  keyword: '',
  type: 'project',
};

export default function useFilterOption() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageType = location.pathname.split('/')[1];
  const firstRendering = useRef(true);

  const initialOptions = {
    lang: queryParams.get('lang') || DEFAULT_OPTIONS.lang,
    sort: queryParams.get('sort') || DEFAULT_OPTIONS.sort,
    employ: queryParams.get('employ') === 'true' || false,
    keyword: queryParams.get('keyword') || DEFAULT_OPTIONS.keyword,
    type: queryParams.get('type') || DEFAULT_OPTIONS.type,
  };

  const [options, setOptions] = useState(initialOptions);

  const optionHandler = (name, value) => {
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const clearOptions = () => {
    setOptions(DEFAULT_OPTIONS);
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== DEFAULT_OPTIONS[key]) {
        newParams.set(key, value);
      }
    });

    if (pageType === 'search') {
      newParams.set('type', options.type);
    }
    const newPath =
      newParams.toString() === ''
        ? `/${pageType.toLowerCase()}`
        : `/${pageType.toLowerCase()}?${newParams.toString()}`;
    navigate(newPath);
  }, [options, pageType, navigate]);

  useEffect(() => {
    if (!firstRendering.current) {
      clearOptions();
    } else {
      firstRendering.current = false;
    }
  }, [pageType]);

  useEffect(() => optionHandler('employ', false), [options.type]);

  return [options, optionHandler];
}
