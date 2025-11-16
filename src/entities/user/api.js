import { apiFetch } from "../../shared/api/client"

export function getMe(token) {
    console.log("eu estive aqui")
    return apiFetch('/users/me', { token })
}