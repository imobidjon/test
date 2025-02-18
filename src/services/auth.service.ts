import type { LoginFormData } from "../types/auth"

const LOCAL_STORAGE_KEY = "auth_user"

export const authService = {
    async login(data: LoginFormData): Promise<any> {
        try {
            // Simulate API call
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    if (data.login && data.password) {
                        const userData = {
                            id: Date.now(),
                            email: data.login,
                        }
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData))
                        resolve({ success: true, user: userData })
                    } else {
                        throw new Error("Invalid credentials")
                    }
                }, 1000)
            })
            return response
        } catch (error) {
            throw error
        }
    },

    logout(): void {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    },

    getCurrentUser(): any | null {
        const userStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return userStr ? JSON.parse(userStr) : null
    },

    isAuthenticated(): boolean {
        return !!this.getCurrentUser()
    },
}

