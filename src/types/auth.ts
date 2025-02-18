export interface LoginFormData {
    login: string
    password: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: any | null
    loading: boolean
    error: string | null
}