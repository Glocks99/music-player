export let music = [
    {
        name: "Kwaku the traveller",
        artist: "Black Sherif",
        song: "./music/m1.mp3",
        images: "images/trav.jpg"
    },
    {
        name: "Mood",
        artist: "Mr Drew",
        song: "./music/m2.mp3",
        images: "images/mood.jpg"
    },
    {
        name: "Rising Youth",
        artist: "Shatta Wale",
        song: "./music/m3.mp3",
        images: "images/rising.jpg"
    },
    {
        name: "Koliko",
        artist: "VVIP ft Miyaki",
        song: "./music/m4.mp3",
        images: "images/koliko.jpg"
    },
    {
        name: "Redemption song",
        artist: "Bob Marley & The Wailers",
        song: "./music/m5.mp3",
        images: "../images/redemption.jpg"
    },
    {
        name: "Simmer Down",
        artist: "Black Sherif",
        song: "./music/m6.mp3",
        images: "../images/simmer.jpg"
    },
    
]

export function moveup(id){
    const updateIndex = music
    if(id > 0){
        [updateIndex[id], updateIndex[id - 1]] = [updateIndex[id - 1], updateIndex[id]]
        music = updateIndex
       
    }
}

export function movedown(id){
    const updateIndex = music
    if(id < music.length - 1){
        [updateIndex[id], updateIndex[id + 1]] = [updateIndex[id + 1], updateIndex[id]]
        music = updateIndex
       
    }
}

const temp = music
export function filteredMusic(input){
    let filteredmusic;
    if(input){
        filteredmusic = music.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        music = filteredmusic
    }else{
        music = temp
    }
    
    return music
}

