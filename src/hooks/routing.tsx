import { useLocation, useNavigate } from 'react-router-dom';

export function useRouting() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const param = params.get('switch');

  function getParamUrl(url: string) {
    return params.get(url);
  }

  function goTo(path: string) {
    navigate(path);
  }
  function switchUrl(url: string, path: string = location.pathname) {
    navigate(`${path}?switch=${url}`);
  }

  return {
    switchUrl,
    param,
    getParamUrl,
    goTo,
  };
}
