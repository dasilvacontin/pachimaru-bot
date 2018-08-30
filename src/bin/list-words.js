#!/usr/bin/env node
// @flow
const Twit = require('promised-twit')
const rp = require('request-promise')
const cheerio = require('cheerio')
const pick = require('object.pick')

const config = pick(process.env, ['consumer_key', 'consumer_secret', 'access_token', 'access_token_secret'])
const twit = new Twit(config)

// amazon product i'm tracking
const targetURL = 'https://www.amazon.es/SEGA-Sonic-Mania-Edici%C3%B3n-Coleccionista/dp/B01M2WLI14'

async function isProductAvailable () {
  const body = await rp(targetURL)
  const $ = cheerio.load(body)
  const availabilityText = $('#availability').text().trim()
  console.log('text:', availabilityText)
  let available = availabilityText.indexOf('No disponible') === -1
  if (availabilityText === '') {
    console.log('captcha\'ed, lol')
    available = false
  }
  return available
}

function delay (ms) { return new Promise((resolve) => setTimeout(resolve, ms)) }

async function main () {
  while ((await isProductAvailable()) === false) {
    console.log(`${new Date()} ~ not yet available :'(`)
    await delay(60 * 1000)
  }

  /*
  await twit.post('statuses/update', {
    status: `Try n2.. Sonic Mania: Collector's Edition is now available in Spain! 🤘 ~ ${targetURL}`
  })
  */
}

main()
.catch(console.error.bind(console))
