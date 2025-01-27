import axios from 'axios';

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return;

  try {
    const response = await axios.post('http://localhost:3000/auth/refresh-token', { token: refreshToken });
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    return response.data.access_token;
  } catch (error: any) { 
      throw new Error('Falha ao renovar o token');
  }
}
