export const TOKEN_KEY = "@markbase-Token";
export const ID_KEY = "@markbase-Id";
export const NOME_KEY = "@markbase-Nome";
export const LOJA_KEY = "@markbase-Loja";
export const PROFILE_KEY = "@markbase-Profile";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdmin = () => localStorage.getItem(PROFILE_KEY) === "sysAdminMktPlc";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getId = () => localStorage.getItem(ID_KEY);
export const getNome = () => localStorage.getItem(NOME_KEY);
export const getLoja = () => localStorage.getItem(LOJA_KEY);
export const getProfile = () => localStorage.getItem(PROFILE_KEY);

export const setLoja = (loja) => {
  localStorage.setItem(LOJA_KEY, loja);
};
export const login = (token, id, nome, profile) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ID_KEY, id);
  localStorage.setItem(NOME_KEY, nome);
  localStorage.setItem(PROFILE_KEY, profile);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ID_KEY);
  localStorage.removeItem(NOME_KEY);
  localStorage.removeItem(LOJA_KEY);
  localStorage.removeItem(PROFILE_KEY);
};
