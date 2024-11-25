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

// Playlist with song objects containing name, artist, thumbnail, and audio path
//https://drive.google.com/file/d/1EsIorasX7kdfXUG9o2j_SlJ08LtH5JND/view?usp=sharing

const playlist = [
    {
        name: 'Afreen Afreen',
        artist: 'Rahat F | Momina M',
        thumbnail: './More/Afreen.jpeg',
        audioPath: 'Audio/Afreen.mp3'
    },
    {
        name: 'Bela Ciao',
        artist: 'Money Heist Crew',
        thumbnail: './More/one last time.jpg',
        audioPath: 'Audio/Bela Ciao.mp3'
    }, {
        name: 'Fix You',
        artist: 'Coldplay',
        thumbnail: './More/Fix You.webp',
        audioPath: 'Audio/Fix You.mp3'
    }, {
        name: 'Beetein Lamhein',
        artist: 'KK | Mithoon | Sayeed Quadri',
        thumbnail: './More/BL.jpeg',
        audioPath: 'Audio/beetein.mp3'
    }, {
        name: 'Dil Ibadat',
        artist: 'KK | Pritam',
        thumbnail: './More/DI.jpg',
        audioPath: 'Audio/DI.mp3'
    }, {
        name: 'Haan Tu Hain',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/HTH.mp3'
    }, {
        name: 'I AM IN LOVE',
        artist: 'Pritam | KK | Dominique | Nilesh Mishra',
        thumbnail: './More/Mumbai.jpeg',
        audioPath: 'Audio/IAIL.mp3'
    }, {
        name: 'Khuda Jaane',
        artist: 'Vishal-Shekhar | KK | Shipa Rao',
        thumbnail: './More/Bachna ae hasino.jpg',
        audioPath: 'Audio/KJ.mp3'
    }, {
        name: 'Kal ki hi Baat Hain',
        artist: 'Pritam | KK',
        thumbnail: './More/Chichhore.jpg',
        audioPath: 'Audio/KKHBH.mp3'
    }, {
        name: 'Kya Mujhe Pyar Hain',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/KMPH.mp3'
    }, {
        name: 'O Meri Laila',
        artist: 'Joi Barua | Atif Aslam | Jyoti Tangri',
        thumbnail: './More/laila majnu.jpg',
        audioPath: 'Audio/laila.mp3'
    }, {
        name: 'Labon Ko',
        artist: 'Pritam | KK',
        thumbnail: './More/Labon Ko.jpeg',
        audioPath: 'Audio/LK.mp3'
    }, {
        name: 'O Sanam',
        artist: 'Lucky Ali | Syed Aslam Noor',
        thumbnail: './More/o sanam.jpeg',
        audioPath: 'Audio/o sanam.mp3'
    }, {
        name: 'O Meri Jaan',
        artist: 'KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/omj.mp3'
    }, {
        name: 'Parda Parda',
        artist: 'Pritam | Sunidhi Chauhan | Rana Mazumder',
        thumbnail: './More/mumbai.jpeg',
        audioPath: 'Audio/parda.mp3'
    }, {
        name: 'Pee Loon',
        artist: 'Pritam Irshad Kamil | Mohit Chauhan',
        thumbnail: './More/Mumbai.jpeg',
        audioPath: 'Audio/PL.mp3'
    }, {
        name: 'Sajde Kiye Hain Lakho',
        artist: 'Pritam | KK | Sunidhi Chauhan',
        thumbnail: './More/S.png',
        audioPath: 'Audio/S.mp3'
    }, {
        name: 'Tu Hi Meri Shab Hain',
        artist: 'Pritam | KK | Sayeed Quadri',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/THMSH.mp3'
    }, {
        name: 'Tum Jo Aye',
        artist: 'Pritam | Rahat Fateh Ali Khan | Tulsi Kumar',
        thumbnail: './More/Mumbai.jpeg',
        audioPath: 'Audio/TJA.mp3'
    }, {
        name: 'Tu Jo Mila',
        artist: 'Pritam | KK',
        thumbnail: './More/TJM.jpeg',
        audioPath: 'Audio/TJM.mp3'
    }, {
        name: 'Tujhe Sochta Hoon',
        artist: 'Pritam | KK ',
        thumbnail: './More/TSH.jpeg',
        audioPath: 'Audio/TSH.mp3'
    }, {
        name: 'Zindagi Do Pal Ki',
        artist: 'Rajesh Roshan | Hrithik Roshan',
        thumbnail: './More/Woh Lamhe.jpeg',
        audioPath: 'Audio/ZDPK.mp3'
    }, {
        name: 'Zara Sa',
        artist: 'Pritam | KK',
        thumbnail: './More/Zara sa.jpeg',
        audioPath: 'Audio/ZS.mp3'
    }, {
        name: 'O Meri Jaan',
        artist: 'Pritam | KK',
        thumbnail: './More/DI.jpg',
        audioPath: 'Audio/Tum Mile OMJ.mp3'
    }, {
        name: 'Aankhon Mein Teri',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/AMT.mp3'
    }, {
        name: 'Dil Kyun Yeh Mera',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/DK.mp3'
    }, {
        name: 'KK Mashup',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/KK M.mp3'
    }, {
        name: 'Soniye (Heartless)',
        artist: 'Pritam | KK',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/soniye.mp3'
    }, {
        name: 'Yeh Tune Kya Kiya',
        artist: 'Javed B | Rajat Arora',
        thumbnail: './More/KK.jpg',
        audioPath: 'Audio/YTKK.mp3'
    }
];

function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[randomIndex]] = [playlist[randomIndex], playlist[i]];
    }
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
