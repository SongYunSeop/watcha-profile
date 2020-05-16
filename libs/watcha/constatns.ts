const API_WATCHA_COM: string = "https://api.watcha.com"
const API_USERS: string = `${API_WATCHA_COM}/api/users`
const WATCHA_HEADER: Record<string, string> = {
    "x-watcha-client": "watcha-WebApp",
    "x-watcha-client-language": "ko",
    "x-watcha-client-region": "KR",
    "x-watcha-client-version": "1.0.0"
}

export { API_USERS, WATCHA_HEADER}