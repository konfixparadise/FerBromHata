'use strict'

import logger from "../utils/logger.js"

const cataloges = [
  {
    id: 1,
    title: "Piano Sonata No. 3",
    artist: "Beethoven"
  },
  {
    id: 2,
    title: "Piano Sonata No. 7",
    artist: "Beethoven"
  },
  {
    id: 3,
    title: "Piano Sonata No. 10",
    artist: "Beethoven"
  }
];

const catalog = {
  createView(request, response) {
    logger.info("Catalog page loading!")
    logger.debug("Loading the catalog", cataloges)
    response.json(cataloges);   
  }
}

export default catalog
