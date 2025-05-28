function getNatureRemoData(endpoint) {
  const REMO_ACCESS_TOKEN = 'ory_at_k2uMSQMwv7daNdw6Psu2pCt64g0i13pnix99qi4p3F8.jjLwlc-l7J9Fzei4KAQPgVYuKwO3rFY_NdQSXY_nS-g'
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };

  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}