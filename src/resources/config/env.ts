export const ENV = {
  // ADD Environments Here
  DEV: 'DEV',
  PROD: 'PROD'
}

export const MAGIC_API_KEY: { [key: string]: string } = {
  DEV: process.env.EXPO_PUBLIC_DEV_MAGIC_API_KEY,
  PROD: process.env.EXPO_PUBLIC_PROD_MAGIC_API_KEY
}

export const OPENAI_API: { [key: string]: string } = {
  DEV: 'https://api.openai.com/v1/chat/completions',
  PROD: 'https://api.openai.com/v1/chat/completions'
}

export const MOVIES_API: { [key: string]: Object } = {
  DEV: 'https://moviesdatabase.p.rapidapi.com/titles/random',
  PROD: 'https://moviesdatabase.p.rapidapi.com/titles/random'
}