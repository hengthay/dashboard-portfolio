export const getTokenExpiry = (token) => {
  try {
    // get the payload signature
    const base64Payload = token.split('.')[1];

    // Decoded to readble JSON string
    const jsonString = atob(base64Payload);

    const payload = JSON.parse(jsonString);

    return payload.exp * 1000;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const isTokenExpired = (token) => {
  
  const expiry = getTokenExpiry(token);

  if(!expiry) return true;

  return Date.now() >= expiry; // true if expired
}