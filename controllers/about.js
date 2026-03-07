'use strict'

const playlist = [
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

const about = {
  createView(request, response) {
    response.json(playlist);   
  }
}

export default about