import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function useFilterOption() {
  const location = useLocation();
  const navigate = useNavigate();
  const langDefaultOption = 'all';
  const sortDefaultOption = 'latest';
  const employDefaultOption = false;
  const type = location.pathname.split('/')[1];
  const queryParams = new URLSearchParams(location.search);
  const firstRendering = useRef(true);

  const [option, setOption] = useState({
    lang: queryParams.get('lang') || langDefaultOption,
    sort: queryParams.get('sort') || sortDefaultOption,
    employ: queryParams.get('employ') || employDefaultOption,
  });

  const { lang, employ, sort } = option;

  const optionHandler = (name, value) => {
    setOption((prevOption) => ({ ...prevOption, [name]: value }));
  };

  const clearOption = () => {
    setOption({
      lang: langDefaultOption,
      sort: sortDefaultOption,
      employ: employDefaultOption,
    });
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    console.log({ lang, sort, employ });

    if (lang !== langDefaultOption) newParams.set('lang', lang);
    if (sort !== sortDefaultOption) newParams.set('sort', sort);
    if (employ !== employDefaultOption) newParams.set('employ', employ);
    newParams.toString() === ''
      ? navigate(`/${type.toLowerCase()}`)
      : navigate(`/${type.toLowerCase()}?${newParams.toString()}`);
  }, [lang, sort, employ, navigate]);

  useEffect(() => {
    if (firstRendering.current) {
      firstRendering.current = false;
    } else {
      clearOption();
    }
  }, [type]);

  return [option, optionHandler];
}
