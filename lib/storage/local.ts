// Local storage utilities for AzMedical
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

// Auth functions
export const getAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null, token: null }
  }

  const token = localStorage.getItem("authToken")
  const user = localStorage.getItem("user")

  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
    token,
  }
}

export const setAuthState = (user: User, token: string) => {
  localStorage.setItem("authToken", token)
  localStorage.setItem("user", JSON.stringify(user))
}

export const clearAuthState = () => {
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
}

// Cart functions
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export const addToCart = (item: Omit<CartItem, "quantity">) => {
  const cart = getCart()
  const existingItem = cart.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

export const removeFromCart = (id: number) => {
  const cart = getCart().filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const updateCartQuantity = (id: number, quantity: number) => {
  const cart = getCart()
  const item = cart.find((cartItem) => cartItem.id === id)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      item.quantity = quantity
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }
}

export const clearCart = () => {
  localStorage.removeItem("cart")
}

export const getCartTotal = (): number => {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export const getCartItemCount = (): number => {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

// Favorites functions
export const getFavorites = (): number[] => {
  if (typeof window === "undefined") return []
  const favorites = localStorage.getItem("favorites")
  return favorites ? JSON.parse(favorites) : []
}

export const toggleFavorite = (id: number) => {
  const favorites = getFavorites()
  const index = favorites.indexOf(id)

  if (index > -1) {
    favorites.splice(index, 1)
  } else {
    favorites.push(id)
  }

  localStorage.setItem("favorites", JSON.stringify(favorites))
}

// Theme and language
export const getTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark"
  return (localStorage.getItem("theme") as "light" | "dark") || "dark"
}

export const setTheme = (theme: "light" | "dark") => {
  localStorage.setItem("theme", theme)
}

export const getLanguage = (): "az" | "en" => {
  if (typeof window === "undefined") return "az"
  return (localStorage.getItem("language") as "az" | "en") || "az"
}

export const setLanguage = (language: "az" | "en") => {
  localStorage.setItem("language", language)
}
