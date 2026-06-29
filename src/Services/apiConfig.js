const normalizeBaseUrl = (baseUrl) => {
    if (!baseUrl) return "";
    return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
};

export const getApiBaseUrl = () => normalizeBaseUrl((process.env.REACT_APP_BASE_URL || "").trim());

export const buildApiUrl = (path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const baseUrl = getApiBaseUrl();

    return baseUrl ? `${baseUrl}${normalizedPath.replace(/^\/+/, "")}` : normalizedPath;
};
