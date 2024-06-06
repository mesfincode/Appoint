/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication 
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/api/test"
  
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings 
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

/**
 * The prefix for API authentication routes
 * routes that are with this prefix are used for API authentication
 * purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"