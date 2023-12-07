const query = `
  query getSongDataById($nowPlayingId: Int!){
    getSongDataById(nowPlayingId: $nowPlayingId) {
      id
      artist
      title
      largeimage
    }
  }
  `;

export default query;
