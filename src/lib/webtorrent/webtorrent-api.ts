import WebTorrent from 'webtorrent';

// Create a worker for this
class WebTorrentAPI {
    private client = new WebTorrent();

    public downloadMagnet(magnet: string) {
        this.client.add(magnet, torrent => {
            // Got torrent metadata!
            console.log('Client is downloading:', torrent.infoHash)
          
            for (const file of torrent.files) {
              document.body.append(file.name)
            }
          })
    }

}

export default WebTorrentAPI;