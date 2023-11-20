export const ENV = {
  // ADD Environments Here
  DEV: 'DEV',
  PROD: 'PROD'
}

export const MAGIC_API_KEY: { [key: string]: string } = {
  // ADD API Keys Here
  DEV: '',
  PROD: ''
}

export const OPENAI_API_KEY: { [key: string]: string } = {
  // USE THIS TO ACCESS process.env.OPENAI_API_KEY or use env variables in associated host
  // eas secret:create --scope project --name OPENAI_API_KEY --value YOUR_KEY --type string
  DEV: '',
  PROD: ''
}

export const MOVIES_API: { [key: string]: Object } = {
  // ADD API Keys Here
  DEV: {
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    XRapidAPIKey: '',
    XRapidAPIHost: ''
  },
  PROD: {
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    XRapidAPIKey: '',
    XRapidAPIHost: 'moviesdatabase.p.rapidapi.com'
  }
}