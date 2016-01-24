# Band Futár Tile

A webservice and a web tile for Microsoft Band to display Budapest public transport information using BKK Futár data service.

> **NOTE:** This is a proof-of-concept, not production code.

## What is this?

The Centre of Budapest Transport (BKK) provides a webservice that anyone can use to get data about lines,
stops and vehicles of public transport. The goal of this project is to display the most important information
from this data feed on a Microsoft Band.

The BKK webservice allows querying vehicles by stops, however the data returned is not optimal for displaying
on a Band. Therefore this project contains a Node.js webservice that calls into the BKK webservice, and
transforms the results to a Band-optimized JSON result. This webservice can be deployed to any host, and can
be called directly from a Band web tile.

## What you can find here?

In this project you can find the following folders:

- The `src` folder contains the Node.js webservice. It is written in EcmaScript 2015 (ES6) using the [Hapi](http://hapijs.com) server.
- The `webtile` folder contains the files required to build a webtile for Microsoft Band. 
- The `typings` folder contains TypeScript type information that [Visual Studio Code](https://code.visualstudio.com) 
can directly use to provide better developer experience.

## How to use this code?

> **Disclaimer:** This is a proof-of-concept sample that I use on my Band, but it is not meant to be a production code.

If you want to create a similar solution for yourself, follow these steps:

1. Fork this repo.
2. Find out the IDs of the stops you are interested in. See the [Acknowledgements](#Acknowledgements) section.
3. Customize the stops in the `src/next-ride/controller.js` file.
4. Deploy this service to a webserver. I use Azure Web Apps for this, and it works perfectly fine.
5. Customize the `url` in the `webtile/manifest.json` file.
6. Create a ZIP package from the content of the `webtile` folder and deploy it to your phone.

## Acknowledgements

Thanks for Kiss McGee to create the Apiary documentation of the [BKK FUTÁR Utazástervező API](http://docs.bkkfutar.apiary.io),
the webservice this solution relies on. The `src/next-ride/service.js` file calls the 
[ArrivalsAndDeparturesForStop API](http://docs.bkkfutar.apiary.io/#reference/0/arrivalsanddeparturesforstop/arrivalsanddeparturesforstop).

Thanks for Gábor Nádai (Mefi) for the [KoviBusz](https://github.com/mefiblogger/KoviBusz) repository here on Github. The hosted version 
of his application helped me (any you too) to easily find the ID of the stops I'm interested in.

## Limitations

- Theoretically the Band udpates the tile in every 15 minutes (see the `refreshIntervalMinutes` value in the `webtile/manifest.json` file), however I've experienced latency in that, sometimes more than 3 hours.
- The code in its current state cannot differentiate between lines that uses the same stop.

## About the author

This project is maintaned by [György Balássy](http://gyorgybalassy.wordpress.com).
