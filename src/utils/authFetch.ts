const authFetch = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("railsetu_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

export default authFetch;
