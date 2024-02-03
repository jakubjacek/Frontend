// Przełączenie na video po kliknieciu na zdjęcie
function changeVideo(name){
    const bgVideoList = document.querySelectorAll('.bg-video');
    const models = document.querySelectorAll('.model');

    bgVideoList.forEach(video => {
        video.classList.remove('active');
        if(video.classList.contains(name))
        {
            video.classList.add('active');
        }
    })

    models.forEach(model => {
        model.classList.remove('active');
        if(model.classList.contains(name))
        {
            model.classList.add('active');
        }
    })
}

let currentMusic = 0;
const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const disk = document.querySelector ('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');


// zmiana przycisku na pauze oraz obracania się dysku
playBtn.addEventListener('click', () => {
    if( playBtn.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

// konfiguracja muzyki
const setMusic = (i) => 
{
    seekBar.value = 0; //range side value to 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },300);
}

setMusic(0);
// Formatowanie czasu trwania piosenki z milisekund na minuty i sekundy
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if ( sec < 10 ) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}
//dodawanie informacji ile piosenka juz trwa
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    //do ciagłego odtwarzania muzyki bez przerwy
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max))
    {
        forwardBtn.click();
    }
}, 500)

// przemieszczanie sie po piosence
seekBar.addEventListener('change', ()=>{
    music.currentTime = seekBar.value;
})

//funkcja dzieki ktorej po przełączeniu piosenki z automatu sie odpali 
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}
// następna i poprzednia piosenka
forwardBtn.addEventListener('click', ()=>{
    if( currentMusic >= songs.length -1 ){
        currentMusic = 0;
    }
    else {
        currentMusic ++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', ()=>{
    if( currentMusic <= 0){
        currentMusic = songs.length -1;
    }
    else {
        currentMusic --;
    }
    setMusic(currentMusic);
    playMusic();
})