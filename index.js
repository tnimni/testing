if (process.env.ENVIRONMENT) {
  // eslint-disable-next-line
  require('elastic-apm-node').start({
    serviceName: process.env.SERVICE_NAME,
    serverUrl: process.env.KIBANA_APM_SERVER_URL,
  });
}

const express = require('express');
const api = require('service-common-node').api;
const Server = require('service-common-node').server;
const log = require('service-common-node').log;
const healthy = require('service-common-node').healthy;
const context = require('service-common-node').context;
const queueSubscriber = require('./queue/subscriber');
const reservationsServices = require('./services/tripAdvisorReservations');

const tripAdvisorRoute = require('./routes/tripAdvisor');
const citiesDbService = require('./services/db/cities');
const redis = require('./redis');

//set up the app
const app = express();
app.use(express.json());
app.use(context.httpMiddleware);
app.use(context.requestIdMiddleware);
app.use(log.loggerMiddleware);
app.use(healthy);

app.use('/internal-api/v1/tripAdvisor', tripAdvisorRoute);

app.use(api.serviceErrorHandling.notFoundMiddleware);
app.use(api.serviceErrorHandling.generalErrorMiddleware);

//required to get the currency into redis
(async () => {
  const cities = await citiesDbService.getCitiesCurrency();
  const cityCurrency = cities.map((x) => {
    const currenciesMap = {};
    Object.assign(currenciesMap, { [x.resourceKey]: x.currencyCode });
    return currenciesMap;
  });
  const currenciesMap = cityCurrency.reduce(
    (acc, currentValue) => Object.assign(acc, currentValue));
  redis.set(redis.keys.cityCurrency, currenciesMap);
  const cityMarkup = cities.map((x) => {
    const values = {};
    Object.assign(values, { [x.resourceKey]: x.markup });
    return values;
  });
  const markup = cityMarkup.reduce((acc, currenctValue) => Object.assign(acc, currenctValue));
  redis.set(redis.keys.cityMarkup, markup);
})();

//required to avoid error
(async () => {
  await reservationsServices.initStartUpdatedTime();
})();

queueSubscriber.start();

const server = Server(app, '3016');

module.exports = server;
