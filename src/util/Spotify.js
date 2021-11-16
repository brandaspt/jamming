let accessToken

const getParams = () => {
    const hash = window.location.hash.substr(1)

    const result = hash.split("&").reduce((res, item) => {
        const parts = item.split("=")
        res[parts[0]] = parts[1]
        return res
    }, {})
    return result
}

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken
        const params = getParams()
        if (params.access_token && params.expires_in) {
            accessToken = params.access_token
            const expiresIn = Number(params.expires_in)
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000)
            window.history.pushState("Access Token", null, "/")
            return accessToken
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URL}`
        }
    },
    async search(query) {
        const token = Spotify.getAccessToken()
        try {
            const resp = await fetch(
                `${process.env.REACT_APP_SPOTIFY_BASE_URL}/search?type=track&q=${query}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            const { tracks } = await resp.json()
            if (!tracks) return []
            else
                return tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
        } catch (error) {
            console.log(error)
        }
    },
    async savePlaylist(name, tracks) {
        if (!name || !tracks) return
        const token = Spotify.getAccessToken()
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        try {
            const userInfo = await fetch(`${process.env.REACT_APP_SPOTIFY_BASE_URL}/me`, {
                headers
            })
            const userInfoJSON = await userInfo.json()
            const userId = userInfoJSON.id
            const newPlaylist = await fetch(
                `${process.env.REACT_APP_SPOTIFY_BASE_URL}/users/${userId}/playlists`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ name })
                }
            )
            const newPlaylistJSON = await newPlaylist.json()
            const playlistId = newPlaylistJSON.id
            await fetch(
                `${process.env.REACT_APP_SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ uris: tracks })
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export default Spotify
