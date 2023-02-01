import { useSelector } from "react-redux"
import { AuthSelectors } from "../store/selectors/auth.selectors"


export function useIsAuthenticated() {
    const accessToken = useSelector(AuthSelectors.selectAccessToken)
    const expiration = useSelector(AuthSelectors.selectTokenExpiration)
    return validateToken(accessToken, expiration)
}

function validateToken(token, expiresIn) {
    if (!token || token == "" || !expiresIn) {
        return false;
    }
    const now = new Date().valueOf();
    const expirationTime = new Date(expiresIn).valueOf()
    return expirationTime >= now;
}