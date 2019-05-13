const xmlConverter = require('./XMLtoJSON');

async function comparePlaylists(library, sourcePlaylist, targetPlaylist) {
    const data = await xmlConverter(library);
    const sourceKeys = await getPlaylistSongKeys(sourcePlaylist, data);
    const targetKeys = await getPlaylistSongKeys(targetPlaylist, data);
    let keyDict = [];

    for (const key in targetKeys) {
        if (!sourceKeys[key]) {
            keyDict[key] = key;
        }
    }

    const result = await getSongData(keyDict, data);
    return result;
}

function getPlaylistSongKeys(playlistName, data) {
    let playlistData = {}; //decided to go with an object instead of an array, because lookup speed is much better for large data sets
    const playlists = data.plist.dict[0].array[0].dict;

    playlists.forEach(playlist => {
        if (playlist.string[0] === playlistName) {
            playlist.array[0].dict.map(song => {
                playlistData[song.integer[0]] = song.integer[0];
            });
        }
    });

    return playlistData;
}

function getSongData(songKeys, data) {
    let songData = [];
    const songs = data.plist.dict[0].dict[0].dict;

    songs.forEach(song => {
        if (songKeys[song.integer[0]])
            songData.push({name: song.string[0], artist: song.string[1]});
    });

    return songData.sort(compareSong);
}

function compareSong(a, b){
    const artistA = a.artist.toUpperCase();
    const nameA = a.name.toUpperCase();

    const artistB = b.artist.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (artistA > artistB){
        return 1;
    }
    else if (artistA === artistB && nameA > nameB){
        return 1;
    }

    return -1;
}

module.exports = comparePlaylists;