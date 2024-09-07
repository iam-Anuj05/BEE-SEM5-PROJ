const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params = {}) => {
  if (!endpoint) {
    throw new Error('Endpoint is required to build the URL');
  }

  if (!baseUrl || !key) {
    throw new Error('Base URL or API key is missing');
  }

  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
