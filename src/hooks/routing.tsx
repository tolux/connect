import { useLocation, useNavigate } from 'react-router-dom';

export function useRouting() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const param = params.get('switch');

  function switchUrl(url: string) {
    navigate(`${location.pathname}?switch=${url}`);
  }

  return {
    switchUrl,
    param,
  };
}
