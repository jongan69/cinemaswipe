export const ENV = {
  // ADD Environments Here
  DEV: 'DEV',
  PROD: 'PROD'
}

export const MAGIC_API_KEY: { [key: string]: string } = {
  // ADD API Keys Here
  DEV: 'pk_live_1EF33235BCD30BEA',
  PROD: 'pk_live_1EF33235BCD30BEA'
}

export const OPENAI_API_KEY: { [key: string]: string } = {
   // USE THIS TO ACCESS process.env.OPENAI_API_KEY or use env variables in associated host
  // eas secret:create --scope project --name OPENAI_API_KEY --value YOUR_KEY --type string
  DEV: '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',
  PROD: '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'
}

export const MOVIES_API: { [key: string]: Object } = {
  // ADD API Keys Here
  DEV: {
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    XRapidAPIKey: 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
    XRapidAPIHost: 'moviesdatabase.p.rapidapi.com'
  },
  PROD: {
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    XRapidAPIKey: 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
    XRapidAPIHost: 'moviesdatabase.p.rapidapi.com'
  }
}