import { music } from "./data/music.js"

window.addEventListener("DOMContentLoaded", e => {
    
    document.querySelector(".fa-bars").addEventListener("click", e => {
        document.querySelector(".container").classList.add("active")
    })

    document.querySelector(".close .fa-x").addEventListener("click", e => {
        document.querySelector(".container").classList.remove("active")
    })

    document.querySelector(".paradox .fa-angles-up").addEventListener("click", e => {
        document.querySelector(".music-list").classList.add("active")
    })

    document.querySelector(".options .fa-x").addEventListener("click", e => {
        document.querySelector(".music-list").classList.remove("active")
    })

    const modal = document.getElementById("modal")
    document.querySelector(".fa-gear").addEventListener("click", e => {
        modal.innerHTML = `
            <div class="modal-close">
                <i class="fa-solid fa-x"></i>
            </div>

            <h1>Choose colour Theme</h1>

            <select name="" id="">
            <option value="">Dark mode</option>
            <option value="">Light mode</option>
            </select>
        `
        modal.showModal()
    })

    document.querySelector("#modal").addEventListener("click", e => {
        if(e.target.className.includes("fa-x")){
            modal.close()
        }

    })

    let index = 0
    const audio = new Audio()
    const progressLength = document.querySelector(".p-length")
    const progressbar = document.querySelector(".progressbar")

    function renderMusicPlay() {
        audio.src = music[index].song
    
        audio.addEventListener("loadedmetadata", e => {
            document.querySelector(".music-end").innerHTML = timePadding(audio.duration)
    
            
            audio.addEventListener("timeupdate", e => {
                document.querySelector(".music-start").innerHTML = timePadding(audio.currentTime)
                const width = (audio.currentTime/audio.duration)*100
                progressLength.style = `width: ${width}%` 
                document.querySelector(".p-status").style = `left: ${width - 1}%`
            })
        })

        // chnages the music view background
        document.querySelector(".music-view").style = `background: linear-gradient(transparent, rgba(0,0,0,0.9) 90%), url("${music[index].images}") no-repeat center/cover;`

        //changes the name of song and artist name
        document.querySelector(".artist").innerHTML = music[index].artist

        document.querySelector(".songName").innerHTML = music[index].name

        if(audio.paused){
            audio.play()
        }
        else{
            audio.pause()
        }
    }

    renderMusicPlay()


    function timePadding(time) {
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60)

        return `${String(min).padStart(2,0)}: ${String(sec).padStart(2,0)}`
    }

    // updates the audio time to real time
    progressbar.addEventListener("click", e => {
        const fullWidth = progressbar.getBoundingClientRect()
        const clickX = e.clientX - fullWidth.left
        const width = (clickX / fullWidth.width) * 100
        audio.currentTime = (width / 100) * audio.duration

    })

    // this part handles the play and pause
    document.querySelector(".play-pause").addEventListener("click", e => {
        if (audio.paused) {
            audio.play()
            document.querySelector(".fa-pause").style = "display: initial"
            document.querySelector(".fa-play").style = "display: none"
        } else {
            audio.pause()
            document.querySelector(".fa-pause").style = "display: none"
            document.querySelector(".fa-play").style = "display: initial"
        }
    })

    // plays the previous song
   document.querySelector(".fa-angle-left").addEventListener("click", e => {
    index = (index - 1 + music.length) % music.length
    renderMusicPlay()
    disMusicList()
   })

//    plays the next song
   document.querySelector(".fa-angle-right").addEventListener("click", e => {
    index = (index + 1 + music.length) % music.length
    renderMusicPlay()
    disMusicList()
   })

//    finds which song is currently playing
   function isPlaying(index, currentIndex) {
    return index === currentIndex ? `<img src="./images/sound.GIF" alt="" />` : "" 
   }


//    renders all the music in the array
   function disMusicList(){
       let musicListHtml = ""
       music.forEach((item, currentIndex) => {
           musicListHtml +=   `
               <div class="m-block" data-id="${currentIndex}">
               <div class="casette">
                   <img src="${item.images}" />
               </div>
               <p class="name">${item.artist}</p>
               <div class="play-status">
                 ${isPlaying(index, currentIndex)}
               </div>
               <i class="fa-solid fa-ellipsis-vertical"></i>
             </div>
           `
       })
   
       document.querySelector(".m-list").innerHTML = musicListHtml
   }

   disMusicList()


//    handles a change in song when clicked
   document.querySelector(".m-list").addEventListener("click", e => {
    if(e.target.parentNode.className === "m-block"){
        const {id} = e.target.parentNode.dataset
        if(Number(id) === index) {
            return
        }else {
            index = Number(id)
            renderMusicPlay()
            disMusicList()
        }
    }
   })


//    handles filtering on songs
   document.querySelector(".fa-filter").addEventListener("click", e => {
       modal.innerHTML = `
       <div class="modal-close">
          <i class="fa-solid fa-x"></i>
       </div>

       <h1>Filter by:</h1>
        
        <ul class="filter">
            <li>Ascending order  (A -> B)</li>
            <li>Descending order (B -> A)</li>
            <li>Unorganized order</li>
        </ul>
       `
       modal.showModal()
   })

   modal.addEventListener("click", e => {
        if(e.target.textContent.toLowerCase().includes("ascending")){
            let asc = music.sort((a, b) => a.name.localeCompare(b.name))
            music = asc
            disMusicList()
        }
        if(e.target.textContent.toLowerCase().includes("descending")){
            let desc = music.sort((a, b) => b.name.localeCompare(a.name))
            music = desc
            disMusicList()
        }
        if(e.target.textContent.toLowerCase().includes("unorganized")){
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1)); // Get a random index
                    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
                }
                return array;
            }
            let unord = shuffleArray(music)
            music = unord
            disMusicList()
        }
   })


})