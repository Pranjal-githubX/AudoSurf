// Get the elements
const playButton = document.querySelector('.playback-btns img:nth-child(3)');  // Play/Pause button
const skipBackButton = document.querySelector('.playback-btns img:nth-child(2)'); // Skip Back (Previous Song)
const skipForwardButton = document.querySelector('.playback-btns img:nth-child(4)'); // Skip Forward (Next Song)
const shuffleButton = document.querySelector('.playback-btns img:nth-child(1)'); // Shuffle button
const repeatButton = document.querySelector('.playback-btns img:nth-child(5)'); // Repeat button


const progressBar = document.querySelector('.dur-bar'); // Progress bar
const currentTimeSpan = document.querySelector('.durations span:first-child'); // Current time
const durationTimeSpan = document.querySelector('.durations span:last-child'); // Total duration time

// Song details elements
const songNameElement = document.getElementById('song-name');
const songArtistElement = document.getElementById('song-artist');
const songThumbnailElement = document.getElementById('song-thumbnail');

// Get the additional elements
const currentSongNameDiv = document.querySelector('.cuname'); // For the current song name
const totalDurationDiv = document.querySelector('.hh'); // For the total duration of the song

// Set up the audio player
const audio = new Audio();
let isPlaying = false;
let isShuffle = false;
let isRepeating = false;
let isCurrFav = false

allSongs = playlist = [
    {
        name: 'Khuda Jaane',
        artist: 'Vishal-Shekhar | KK | Shipa Rao',
        thumbnail: './More/Bachna ae hasino.jpg',
        audioPath: 'Audio/KJ.mp3'
    }, 
    {
        name: 'Kya Mujhe Pyar Hain',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/KMPH.mp3'
    }, 
    {
        name: 'Pee Loon',
        artist: 'Pritam Irshad Kamil | Mohit Chauhan',
        thumbnail: './More/Mumbai.jpeg',
        audioPath: 'Audio/PL.mp3'
    },
    {
        name: 'Dil Ibadat',
        artist: 'KK | Pritam',
        thumbnail: './More/DI.jpg',
        audioPath: 'Audio/DI.mp3'
    }
    , {
        name: 'I AM IN LOVE',
        artist: 'Pritam | KK | Dominique | Nilesh Mishra',
        thumbnail: './More/Mumbai.jpeg',
        audioPath: 'Audio/IAIL.mp3'
    }, {
        name: 'O Meri Laila',
        artist: 'Joi Barua | Atif Aslam | Jyoti Tangri',
        thumbnail: './More/laila majnu.jpg',
        audioPath: 'Audio/laila.mp3'
    }, {
        name: 'Sajde Kiye Hain Lakho',
        artist: 'Pritam | KK | Sunidhi Chauhan',
        thumbnail: './More/S.png',
        audioPath: 'Audio/S.mp3'
    }, {
        name: 'Tum Jo Aye',
        artist: 'Pritam | Rahat Fateh Ali Khan | Tulsi Kumar',
        thumbnail: './More/Mumbai.jpeg',
        audioPath: 'Audio/TJA.mp3'
    }, {
        name: 'Zara Sa',
        artist: 'Pritam | KK',
        thumbnail: './More/Zara sa.jpeg',
        audioPath: 'Audio/ZS.mp3'
    }, {
        name: 'Soniye (Heartless)',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/soniye.mp3'
    }, {
        name: 'Mere Yaara',
        artist: 'Arijit S | Neeti M | Rashmi V',
        thumbnail: './More/MY.jpeg',
        audioPath: 'Audio/MY.mp3'
    }
];


playlist = allSongs



let favoriteSongs = []

function favSongs() {
    const heartIcon = document.querySelector("img.heart");
    if (!heartIcon) {
        console.error("Heart icon not found!");
        return;
    }

    heartIcon.addEventListener("click", () => {
        playlist = isCurrFav ? playlist : favoriteSongs; // Switch playlists
        if (!isCurrFav) {
            playlist = favoriteSongs

            isCurrFav = !isCurrFav
            generatePlaylist()
        }
        else if (isCurrFav) {
            playlist = allSongs

            isCurrFav = !isCurrFav
            generatePlaylist()
        }
        console.log(`Playlist length: ${playlist.length}`);
        generatePlaylist()
    });
    // shufflePlaylist()

}

favSongs()


function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]]; // Swap elements
    }
    updatePlaylistUI(); // Update the UI after shuffling
}

// Function to clear and regenerate the playlist in the UI
function updatePlaylistUI() {
    const section = document.querySelector("section");
    section.innerHTML = ""; // Clear the existing playlist
    generatePlaylist(); // Regenerate the playlist with the updated order
}

// Load the first song
shufflePlaylist()
let currentSongIndex = 0;

// Load the first song
loadSong(currentSongIndex);

// Play/Pause functionality
playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playButton.src = 'Assets/slice 8.png'; // Update to play button
    } else {
        audio.play();
        playButton.src = 'Assets/slice 3.png'; // Update to pause button
    }
    isPlaying = !isPlaying;
});

// Skip forward functionality (Next song)
skipForwardButton.addEventListener('click', () => {
    nextSong();
});

// Skip back functionality (Previous song)
skipBackButton.addEventListener('click', () => {
    prevSong();
});

// Shuffle functionality
shuffleButton.addEventListener('click', () => {
    shufflePlaylist()
});

// Repeat functionality
repeatButton.addEventListener('click', () => {
    // Listener for the repeat button to reset the song duration

    audio.currentTime = 0; // Reset the audio's playback time to 0
    currentTimeSpan.textContent = '0:00'; // Update the current time display to 0:00
    progressBar.style.width = '0%'; // Reset the progress bar to 0%


});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Update current time display  
    currentTimeSpan.textContent = formatTime(currentTime);

    // Update progress bar width
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Update the total duration when the song's metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    const totalDuration = audio.duration;
    durationTimeSpan.textContent = formatTime(totalDuration); // Update total duration span
    totalDurationDiv.textContent = `${formatTime(totalDuration)}`; // Update .hh div
});

// Format time (helper function for displaying time in MM:SS format)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load the song details (name, artist, thumbnail)
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.audioPath;
    songNameElement.textContent = song.name;
    songArtistElement.textContent = song.artist;
    songThumbnailElement.src = song.thumbnail;


    // document.querySelectorAll("i.ri-play-circle-line").forEach(e => {
    //     e.addEventListener("click", () => {
    //         songThumbnailElement.src
    //     })
    // })
    document.querySelector("main > img.bg").src = song.thumbnail

    // Update the "cuname" div with the current song name
    currentSongNameDiv.textContent = `Now Playing: ${song.name}`;

    // Reset progress bar and durations
    progressBar.style.width = '0%';
    currentTimeSpan.textContent = '0:00';
    durationTimeSpan.textContent = '0:00';

    // Play the song once it is loaded
    audio.play();
    isPlaying = true;
    playButton.src = 'Assets/slice 8.png'; // Update button to pause
}

// Play next song
function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
    }
    loadSong(currentSongIndex);
}

// Play previous song
function prevSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    }
    loadSong(currentSongIndex);
}

// Audio ended event (play next song)
audio.addEventListener('ended', () => {
    if (isRepeating) {
        audio.play(); // Loop the current song
    } else {
        nextSong(); // Play the next song in the playlist
    }
});

audio.pause()

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
        console.log('Service Worker Registered');
    });
}

function generatePlaylist() {
    document.querySelector("section").innerHTML = ""
    let y = document.createElement("h1")
    y.classList.add("playlist-heading")
    y.style.fontSize = "20px"
    y.innerText = "Playlist: "
    document.querySelector("section").append(y)
    for (let i = 0; i < playlist.length; i++) {
        const container = document.createElement("div");
        container.classList.add("container");

        const h1 = document.createElement("h1")
        h1.innerHTML = (i + 1)// + '<i class="ri-heart-fill"></i>'
        h1.classList.add("h")


        container.appendChild(h1)

        const img = document.createElement("img")
        img.src = playlist[i].thumbnail
        img.classList.add("tnail")
        container.append(img)
        const durElem = document.createElement("p")
        const audioElement = new Audio(playlist[i].audioPath);
        audioElement.addEventListener("loadedmetadata", () => {
            var totalSeconds = Math.floor(audioElement.duration);
            var minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            var seconds = (totalSeconds % 60).toString().padStart(2, '0');
            // console.log(`Song: ${playlist[i].name}, Duration: ${minutes}:${seconds}`);
            durElem.innerText = `${minutes}:${seconds}`
            durElem.classList.add("durElem")
            container.appendChild(durElem)

            console.log(durElem);
        });
        const lft = document.createElement("div");
        lft.classList.add("lft");

        const songName = document.createElement("h4");
        songName.setAttribute("id", "song-name");
        songName.innerText = playlist[i].name;

        const songArtist = document.createElement("h5");
        songArtist.setAttribute("id", "song-artist");
        songArtist.innerText = playlist[i].artist;

        lft.appendChild(songName);
        lft.appendChild(songArtist);

        container.appendChild(lft);

        // Add play icon
        const playIcon = document.createElement("i");
        playIcon.classList.add("ri-play-circle-line");
        playIcon.setAttribute("data-index", i); // Use a data attribute to store the index
        container.appendChild(playIcon);

        const moreIcon = document.createElement("i")
        moreIcon.classList.add("ri-play-list-add-fill", "more")
        moreIcon.setAttribute("data-index", i)
        container.appendChild(moreIcon)






        // Append to the section
        document.querySelector("section").append(container);
    }

    // Add click event listeners for all play icons
    document.querySelectorAll(".ri-play-circle-line").forEach((icon) => {
        icon.addEventListener("click", () => {
            // Reset styling for all songs
            document.querySelectorAll(".container").forEach((container) => {
                const songNameElement = container.querySelector("h4#song-name");
                songNameElement.style.textDecoration = "none";
                songNameElement.style.fontWeight = "400";
                songNameElement.style.color = "#fff";
            });

            // Get the index and selected song
            const index = icon.getAttribute("data-index"); // Get the index from the data attribute
            const selectedSong = playlist[index]; // Retrieve the song object from the playlist
            loadSong(index)
            audio.pause(); // Pause current audio if playing
            audio.src = selectedSong.audioPath; // Update audio source to the selected song
            audio.play(); // Play the new song

            // Update UI elements
            songThumbnailElement.src = "./" + selectedSong.thumbnail;
            songNameElement.innerText = selectedSong.name;
            songArtistElement.innerText = selectedSong.artist;

            currentSongIndex = index; // Update the current song index

            // Apply styling to the selected song
            const selectedContainer = icon.parentElement;
            const selectedSongNameElement = selectedContainer.querySelector("h4#song-name");
            selectedSongNameElement.style.textDecoration = "underline";
            selectedSongNameElement.style.fontWeight = "600";
            selectedSongNameElement.style.color = "#70ffe1";
            document.querySelector(".cuname").innerText = selectedSong.name
        });
    });


}

// Songs playlist as defined earlier


// Function to rearrange the playlist
function moveSongToFirst(index) {
    // Check if index is valid
    if (index < 0 || index >= playlist.length) {
        console.error("Invalid index");
        return;
    }

    // Extract the selected song
    const selectedSong = playlist.splice(index, 1)[0];

    // Add the selected song to the beginning of the array
    playlist.unshift(selectedSong);

    console.log("Updated playlist:");
}

// Example usage
// Assuming the "more" icon of the second song (index 1) is clicked

function addMoreButtonListeners() {
    document.querySelectorAll(".more").forEach(e => {
        // Remove any existing event listener to avoid duplication
        e.removeEventListener('click', handleMoreClick);

        // Add a single event listener
        e.addEventListener('click', handleMoreClick);
    });
}

function handleMoreClick(event) {
    const e = event.target;
    const num = parseInt(e.getAttribute("data-index"));
    const song = playlist[num];
    const songIndex = favoriteSongs.indexOf(song);

    if (songIndex !== -1) {
        // If the song exists in favoriteSongs, remove it
        favoriteSongs.splice(songIndex, 1);
        alert(`Removed: ${song.name}`);
        e.style.color = "white"; // Set icon color to white
    } else {
        // If the song doesn't exist, add it to favoriteSongs
        favoriteSongs.push(song);
        alert(`Added: ${song.name}`);
        e.style.color = "lightseagreen"; // Set icon color to lightseagreen
    }

    // Update the playlist UI (optional if you need to refresh the display)
    generatePlaylist();

    // Re-attach event listeners to the updated DOM
    addMoreButtonListeners();
}


const captions = {
    "DI.mp3": [
        { time: 13.6, text: "DIL Ibadat Kar Raha Hain" },
        { time: 16.6, text: "Dhadkane Meri Sunn" },
        { time: 19.2, text: "Tujhko Main Kar Loon Haasil" },
        { time: 21.4, text: "Lagi Hain Yahi Dhunn" },
        { time: 26.4, text: "Zindagi Ki Shaakh Se Loon" },
        { time: 29.6, text: "Kuch Haseen Pal Main Chun" },
        { time: 32, text: "TujhKo Main Kar Loon Haasil" },
        { time: 34.26, text: "Lagi Hain Yahi Dhunn" },

        { time: 39.24, text: "Seyo Leyo Sama Leyo Seyo Leyo Haa" },
        { time: 51.4, text: "Oh Yeah" },

        { time: 52, text: "DIL Ibadat Kar Raha Hain" },
        { time: 55.2, text: "Dhadkane Meri Sunn" },
        { time: 57., text: "Tujhko Main Kar Loon Haasil" },
        { time: 59.8, text: "Lagi Hain Yahi Dhun" },
        { time: 64.8, text: "Zindagi Ki Shaakh Se Loon" },
        { time: 68, text: "Kuch Haseen Pal Main Chun" },
        { time: 70.4, text: "TujhKo Main Kar Loon Haasil" },
        { time: 72.37, text: "Lagi Hain Yahi Dhunn" },


        { time: 77.2, text: "Jo Bhi Jitne Pal Jiyu" },
        { time: 80.5, text: "Unhe Tere Sang Jiyu" },
        { time: 83.72, text: "Jo Bhi Kal Ho Ab Mera" },
        { time: 86.8, text: "Use Tere Sang Jiyu" },
        { time: 90.1, text: "Jo Bhi Sansein Main Bharu" },
        { time: 93.3, text: "Unhe Tere Sang Bharu" },
        { time: 96.5, text: "Chaahe Jo Ho Raasta" },
        { time: 99.7, text: "Use Tere Sang Chalu" },
        { time: 103.3, text: "DIL Ibadat Kar Raha Hain" },
        { time: 106.5, text: "Dhadkane Meri Sunn" },
        { time: 108.8, text: "Tujhko Main Kar loon Haasil" },
        { time: 111.24, text: "Lagi Hain Yahi Dhunn" },
        { time: 115, text: "Na Na Na Na Na Na Na Na Na Na Na " },
        { time: 119.31, text: "Na Na Na Na Na" },
        { time: 121.31, text: "Na Na Na Na Na Na Na Na Na Na Na" },
        { time: 125.31, text: "Na Na Na Na Na" },
        { time: 127.31, text: "~~~🎵 🎶~~~" },
        { time: 154.3, text: "Mujhko De Tuu Mitt Jaane" },
        { time: 158, text: "Ab Khud Se Dil Mil Jaane" },
        { time: 161.15, text: "Kyun Hain Yeh Itna Faasla" },
        { time: 167.2, text: "Lamhein Yeh Fir Na Aane" },
        { time: 170.8, text: "Inko Tu Na De Jaane" },
        { time: 173.9, text: "Tu Mujh Pe Khud Ko De Luta" },
        { time: 179.6, text: "Tujhe Tujhse Todh Loon" },
        { time: 182.9, text: "Kahin Khud Se Jodh Loon" },
        { time: 186, text: "Mere Jismo-Jaan Pe Aaa" },
        { time: 189.26, text: "Teri Khushbu Odh Loon" },
        { time: 192.4, text: "Jo Bhi Sansein Main Bharu" },
        { time: 195.76, text: "Unhe Tere Sang Bharu" },
        { time: 198.92, text: "Chaahe Jo Ho Raasta" },
        { time: 202.1, text: "Use Tere Sang Chalu" },
        { time: 205.6, text: "Dil Ibadat Kar Raha Hain" },
        { time: 208.9, text: "Dhadhkane Meri Sunn" },
        { time: 211.3, text: "Tujhko Main Kar loon Haasil" },
        { time: 213.5, text: "Lagi Hain Yahi Dhunn" },
        { time: 219, text: "Aaaaaa" },

        { time: 244.1, text: "Baahon Mein De Bas Jaane" },
        { time: 247.7, text: "Seenein Mein De Chup Jaane" },
        { time: 250.7, text: "Tujh Bin Main Jauu To Kahaa" },

        { time: 257, text: "Tujhse Hain Mujhko Paane" },
        { time: 260.4, text: "Yaadon Ke Voh Nazraane" },
        { time: 263.8, text: "Ik Jinpe Hak Ho Bas Mera" },
        { time: 269.3, text: "Teri Yaadon Mein Rahun" },
        { time: 272.4, text: "Tere Khwabon Mein Jagoon" },
        { time: 275.7, text: "Mujhe Dhoonde Jab Koi" },
        { time: 278.9, text: "Teri Ankhon Mein Milu" },

        { time: 282.2, text: "Jo Bhi Saansein Main Bharu" },
        { time: 285.39, text: "Unhe Tere Sang Bharu" },
        { time: 288.4, text: "Chaahe Jo Ho Raasta" },
        { time: 291.7, text: "Use Tere Sang Chalu" },

        { time: 295.4, text: "Dil Ibadat Kar Raha Hain" },
        { time: 298.55, text: "Dhadkane Meri Sunn" },
        { time: 301, text: "Tujhko Main Kar Loon Haasil" },
        { time: 303.2, text: "Lagi Hain Yahi Dhun" },
        { time: 308, text: "Lyrics by Sayeed Quadri" },

    ],
};

const captionsDiv = document.querySelector(".captions")
// Get audio element and captions div
function updateCaptions() {
    const currentSong = audio.getAttribute("src").split("/").pop(); // Get current song file name
    const currentTime = audio.currentTime; // Get current play time of song

    if (captions[currentSong]) {
        // Find the caption that matches the current time
        const currentCaption = captions[currentSong].find(
            (caption, index, array) => {
                const nextCaptionTime = array[index + 1]?.time || Infinity; // Get the next caption's start time or Infinity
                return currentTime >= caption.time && currentTime < nextCaptionTime; // Caption is valid until the next one starts
            }
        );

        // Update the captions div with the current caption or clear it if none found
        captionsDiv.textContent = currentCaption ? currentCaption.text : "";
    } else {
        captionsDiv.textContent = "No captions available"; // Default message for songs without captions
    }
}

// Attach the function to the `timeupdate` event of the audio element
audio.addEventListener("timeupdate", updateCaptions);

audio.play()

let d = 'play'
document.querySelector("body").addEventListener("keyup", (e) => {
    // if (e.key === "d") {
    if (d === "play") {
        audio.pause()
        console.log((audio.currentTime).toFixed(2));
        d = "pause"
    }
    else if (d === "pause") {
        audio.play()
        d = "play"
    }
    // }
})
