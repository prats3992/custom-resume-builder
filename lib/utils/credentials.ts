export function generateCredentials() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let username = ""
  let password = ""

  // Generate random 8-character username
  for (let i = 0; i < 8; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  // Generate random 8-character password
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return { username, password }
}

