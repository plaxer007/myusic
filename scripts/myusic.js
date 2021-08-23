"use strict";

// 1. Loop through top bar icons to make margins
let spans = document.querySelectorAll('.downloads span');
for(let i=0; i < spans.length; i++) {
    spans[i].style.marginRight = '16px';
    spans[0].style.marginLeft = '16px';
}

// 2. Loop through categories images
let categoryImages = [
    'imgs/music-1.png',
    'imgs/music-2.png',
    'imgs/music-3.png',
    'imgs/music-4.png',
    'imgs/music-5.png',
    'imgs/music-6.png',
    'imgs/music-7.png',
    'imgs/music-8.png',
];
let categoryTiles = document.querySelectorAll('.cat-img img');
let i = 0;
for(i; i< categoryImages.length;i++){
    categoryTiles[i].src = categoryImages[i];
}

// 3. Show more category on click 'discover more'
let discoverButton = document.querySelector('.discover-btn');
let moreCategory = document.querySelector('.more-category');
discoverButton.addEventListener('click', function(e){
    e.preventDefault();
    moreCategory.classList.toggle('d-none');
})

// 4. Player toggler
let playerToggler = document.querySelector('.player-toggler');
let playerBox = document.querySelector('.player-box');
let playerIcon = document.querySelector('.player-icon');
let playerMain = document.querySelector('.player-main');
playerToggler.addEventListener('click', function(){
    playerBox.classList.toggle('d-none');
    if(playerBox.classList.contains('d-none')){
        playerIcon.classList.toggle('fa-arrow-up');
        playerMain.style.padding =  0;
    }
    else {
        playerIcon.classList.toggle('fa-arrow-up');
        playerMain.style.padding =  '32px';
    }
})
// +++ 5. Music player +++
const songList = [
    {
        artist: 'First',
        title: 'First Song',
        url: 'songs/1.mp3',
        cover: 'imgs/cover/1.png'
    },
    {
        artist: 'Second',
        title: 'Second Song',
        url: 'songs/2.mp3',
        cover: 'imgs/cover/2.png'
    },
    {
        artist: 'Third',
        title: 'Third Song',
        url: 'songs/3.mp3',
        cover: 'imgs/cover/3.png'
    },
    {
        artist: 'Fourth',
        title: 'Fourth Song',
        url: 'songs/4.mp3',
        cover: 'imgs/cover/4.png'
    },
    {
        artist: 'Fifth',
        title: 'Fifth Song',
        url: 'songs/5.mp3',
        cover: 'imgs/cover/5.png'
    },
    {
        artist: 'Sixth',
        title: 'Sixth Song',
        url: 'songs/6.mp3',
        cover: 'imgs/cover/6.png'
    },
    {
        artist: 'Seventh',
        title: 'Seventh Song',
        url: 'songs/7.mp3',
        cover: 'imgs/cover/7.jpg'
    }
];

const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const actualSong = document.querySelector('.song');
const songProgress = document.querySelector('.song-progress');
const artistName = document.querySelector('.artist-name');
const songTitle = document.querySelector('.song-title');
const songCover = document.querySelector('.song-cover');
const songAnimation = document.querySelector('.circless');
let playerCloseMobile = document.querySelector('.player-close-mobile')
let songIndex = 0;
playBtn.addEventListener('click', handlePlayButton, false);
nextBtn.addEventListener('click', changeMusic, false);
prevBtn.addEventListener('click', changeMusic, false);


function playMusic(){
    actualSong.play();
}
function handlePlayButton(e) {
    e.preventDefault();
    e.stopPropagation();
    startAnimation();
    playBtn.textContent = 'pause'
    if (actualSong.paused) {
      playMusic();
    } else {
        actualSong.pause();
        playBtn.textContent = 'play_arrow';
    } 
  }

//   Next and prev song
function changeMusic(e){
    e.preventDefault();
    e.stopPropagation();
    if(songIndex == songList.length -1){
        songIndex--;
    }
    if(songIndex == 0){
        songIndex++
    }
    if(e.target === prevBtn){
        songIndex--;
        console.log(`clicked ${songIndex}`)
    }
    if(e.target === nextBtn){
        songIndex++;
        console.log(`clicked ${songIndex}`)
    }
    if(e.target === nextBtn || e.target === prevBtn){
        actualSong.pause();
        // Show play btn and stop animation
        for(let i = 0; i < circleSmall.length; i++){
            circleSmall[i].classList.remove('circle');
        }
        for(let i = 0; i < circleLarge.length; i++){
            circleLarge[i].classList.remove('circle2');
        }
        playBtn.textContent = 'play_arrow';
        // Change song information depend on prev || next button
        actualSong.src = songList[songIndex].url;
        songCover.src = songList[songIndex].cover;
        artistName.textContent = songList[songIndex].artist;
        songTitle.textContent = songList[songIndex].title;
    }
   
}
// Volume set
function changeVolume(){
    let volumeBar = document.getElementById('volume');
    volumeBar.addEventListener('change', function(e){
        console.log(this.value);
        let volume = e.target.value;
        actualSong.volume = volume;
    })
}
changeVolume()

// Song animation
const circleSmall = document.querySelectorAll('.circle-small');
const circleLarge = document.querySelectorAll('.circle-large');
function startAnimation(){
    for(let i =0; i < circleSmall.length; i++ ){
        circleSmall[i].classList.toggle('circle');
        circleSmall[i].style.transition = 'all 1s ease';
    }
    for(let i =0; i < circleLarge.length; i++ ){
        circleLarge[i].classList.toggle('circle2');
        circleLarge[i].style.transition = 'all 1s ease';
    }
}

function mobilePlayer(){
    let w = window.innerWidth;
    if(w < 768){
        songAnimation.classList.add('d-none');
        playerBox.addEventListener('click', () => {
            playerMain.classList.add('full');
            playerMain.style.transition = 'all .8s ease-in'
            playerCloseMobile.classList.remove('d-none');
            if(playerMain.classList.contains('full')){
                playerMain.classList.remove('player-main');
                songAnimation.classList.add('d-block');
                songAnimation.classList.toggle('d-none');
            }
        });

        playerCloseMobile.addEventListener('click', () => {
            playerMain.classList.toggle('full');
            playerMain.classList.toggle('player-main');
            if(playerMain.classList.contains('player-main')){
                playerCloseMobile.classList.toggle('d-none');
                songAnimation.classList.toggle('d-none');
            }
        })
    }
}
mobilePlayer()

