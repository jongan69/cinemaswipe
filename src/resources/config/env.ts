export const ENV = {
  // ADD Environments Here
  DEV: 'DEV',
  PROD: 'PROD'
}

export const MAGIC_API_KEY: { [key: string]: string } = {
  DEV: 'pk_live_1EF33235BCD30BEA',
  PROD: 'pk_live_1EF33235BCD30BEA'
}

export const OPENAI_API: { [key: string]: string } = {
  DEV: 'https://api.openai.com/v1/chat/completions',
  PROD: 'https://api.openai.com/v1/chat/completions'
}

export const MOVIES_API: { [key: string]: Object } = {
  DEV: 'https://moviesdatabase.p.rapidapi.com/titles/random',
  PROD: 'https://moviesdatabase.p.rapidapi.com/titles/random'
}