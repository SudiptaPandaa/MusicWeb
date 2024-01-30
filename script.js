document.addEventListener('DOMContentLoaded', function () {
    let now_playing = document.querySelector('.now-playing');
    let track_art = document.querySelector('.track-art');
    let track_name = document.querySelector('.track-name');
    let track_artist = document.querySelector('.track-artist');

    let playpause_btn = document.querySelector('.playpause-track');
    let next_btn = document.querySelector('.next-track');
    let prev_btn = document.querySelector('.prev-track');

    let seek_slider = document.querySelector('.seek_slider');
    let volume_slider = document.querySelector('.volume_slider');
    let curr_time = document.querySelector('.current-time');
    let total_duration = document.querySelector('.total-duration');
    let wave = document.getElementById('wave');
    let randomIcon = document.querySelector('.fa-random');
    let curr_track = new Audio();

    let track_index = 0;
    let isPlaying = false;
    let isRandom = false;
    let updateTimer;

    const music_list = [
        {
            img: 'images/0.png',
            name: 'Sunflower',
            artist: 'by Post Malone',
            music: 'musics/0.mp3'
        },
        {
            img: 'images/01.png',
            name: 'Your Man',
            artist: 'by Josh Turner',
            music: 'musics/01.mp3'
        },
        {
            img: 'images/02.png',
            name: 'What a Wonderful World',
            artist: 'by Louis Armstrong',
            music: 'musics/02.mp3'
        },
        {
            img: 'images/1.png',
            name: 'Alag Aasman',
            artist: 'by Anuv Jain',
            music: 'musics/AlagAasmaan.mp3'
        },
        {
            img: 'images/2.png',
            name: 'Raat Akeli Thi',
            artist: 'by Arijit Singh, Antara Mitra',
            music: 'musics/RaatAkeliThi.mp3'
        },
        {
            img: 'images/3.png',
            name: 'O Maahi',
            artist: 'by Pritam, Arijit Singh, Irshad Kamil',
            music: 'musics/O-Maahi.mp3'
        },
        {
            img: 'images/4.png',
            name: 'Husn',
            artist: 'by Anuv Jain',
            music: 'musics/Husn.mp3'
        },
        {
            img: 'images/5.png',
            name: 'Ek Ladki Ko Dekha Toh Aisa Laga',
            artist: 'by Sanam Puri',
            music: 'musics/EkLadki.mp3'
        },
        {
            img: 'images/6.png',
            name: 'Chupana Bhi Nahi Aata',
            artist: 'by Stebin Ben',
            music: 'musics/6.mp3'
        },
        {
            img: 'images/7.png',
            name: 'Pehle Bhi Main',
            artist: 'by Vishal Mishra',
            music: 'musics/7.mp3'
        },
        {
            img: 'images/8.png',
            name: 'Piya Aaye Naa',
            artist: 'by KK, Tulsi Kumar',
            music: 'musics/8.mp3'
        },
        {
            img: 'images/9.png',
            name: 'Dhadkan',
            artist: 'by Jubin Nautiyal,Palak Muchhal. ',
            music: 'musics/9.mp3'
        },
        {
            img: 'images/10.png',
            name: 'Ranjha',
            artist: 'by B Praak and Jasleen Royal',
            music: 'musics/10.mp3'
        },
    ];

    function loadTrack(track_index) {
        clearInterval(updateTimer);
        reset();

        curr_track.src = music_list[track_index].music;
        curr_track.load();

        track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
        track_name.textContent = music_list[track_index].name;
        track_artist.textContent = music_list[track_index].artist;
        now_playing.textContent = `Playing music ${track_index + 1} of ${music_list.length}`;

        updateTimer = setInterval(setUpdate, 1000);

        curr_track.addEventListener('ended', nextTrack);
        random_bg_color();
    }

    function random_bg_color() {
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        wave.style.backgroundColor = randomColor;
        }

    function reset() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }

    function randomTrack() {
        isRandom ? pauseRandom() : playRandom();
    }

    function playRandom() {
        isRandom = true;
        randomIcon.classList.add('randomActive');
    }

    function pauseRandom() {
        isRandom = false;
        randomIcon.classList.remove('randomActive');
    }

    function repeatTrack() {
        let current_index = track_index;
        loadTrack(current_index);
        playTrack();
    }

    function playpauseTrack() {
        isPlaying ? pauseTrack() : playTrack();
    }

    function playTrack() {
        curr_track.play()
            .then(() => {
                isPlaying = true;
                track_art.classList.add('rotate');
                wave.classList.add('loader');
                playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
            })
            .catch(error => {
                console.error('Error playing track:', error);
            });
    }

    function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        track_art.classList.remove('rotate');
        wave.classList.remove('loader');
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }

    function nextTrack() {
        if (track_index < music_list.length - 1 && isRandom === false) {
            track_index += 1;
        } else if (isRandom === true) {
            let random_index = Math.floor(Math.random() * music_list.length);
            track_index = random_index;
        } else {
            track_index = 0;
        }
        loadTrack(track_index);
        playTrack();
    }

    function prevTrack() {
        if (track_index > 0) {
            track_index -= 1;
        } else {
            track_index = music_list.length - 1;
        }
        loadTrack(track_index);
        playTrack();
    }

    function seekTo() {
        let seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
    }

    function setVolume() {
        curr_track.volume = volume_slider.value / 100;
    }

    function setUpdate() {
        if (!isNaN(curr_track.duration)) {
            let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;

            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime % 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration % 60);

            currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
            currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
            durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
            durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

            curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
            total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }

    playpause_btn.addEventListener('click', playpauseTrack);
    next_btn.addEventListener('click', nextTrack);
    prev_btn.addEventListener('click', prevTrack);
    seek_slider.addEventListener('input', seekTo);
    volume_slider.addEventListener('input', setVolume);
    randomIcon.addEventListener('click', randomTrack);
    loadTrack(track_index);
});
