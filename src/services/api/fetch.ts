// import { toast } from 'react-toastify';

// modular pattern
export const fetchRequest = (function fetchFn() {
  const publicAPI = { fetchInstance, getRequest, postRequest, abortRequest };
  // check this late because of closure
  const controller = new AbortController();
  const signal = controller.signal;
  //   let AUTH_TOKEN = cookieStore.get(TCookieKeys['AUTH_TOKEN']) || '';
  const defaultConfig: RequestInit = {
    signal,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: process.env.NEXT_PUBLIC_ORIGIN_API_URL || '',
    },
  };

  async function fetchInstance(url: string, config?: Partial<RequestInit>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, {
      ...defaultConfig,
      ...config,
    });
    // const mess = {
    //   description: 'oops',
    // };

    // toast.success();

    return res.json();
  }

  function abortRequest() {
    controller.abort();
  }

  async function getRequest(url: string) {
    return await fetchInstance(url);
  }

  async function postRequest(
    url: string,
    data: object,
    passConfig?: Partial<RequestInit>
  ) {
    const config = passConfig || defaultConfig;
    config.method = 'POST';
    config.body = JSON.stringify(data);
    return await fetchInstance(url, config);
  }
  return publicAPI;
})();
