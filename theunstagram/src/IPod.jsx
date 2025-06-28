import { useState, useRef, useEffect } from 'react';
import './App.css';
import './IPod.css';
import cover from './assets/vozmememos.jpg'
import pause from './assets/pause-play.png'
import forward from './assets/forward.png'
import Container from 'react-bootstrap/esm/Container';

// <div> Icons made by <a href="https://www.flaticon.com/authors/andreas666" title="Andreas666"> Andreas666 </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>

function IPod({episodes}) 

{
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    const [number, changeNumber] = useState(0);

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value)
    };

    const handleTimeUpdate = () => {
        const audioCheck = audioRef.current;
        if (!audioCheck) {
            return;
        }

        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    };

    useEffect(()=> {

        console.log("in use Effect")
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const updateMetadata = () => {
            setDuration(audio.duration || 0); // fallback to 0 if still NaN
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", updateMetadata);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateMetadata);
        };
    }, [number]);

    const handlePlay = () => {
        console.log("in handle play")
        audioRef.current.play();
        setIsPlaying(true);
    }

    const handlePause = () => {
        console.log("in handle pause")
        audioRef.current.pause();
        setIsPlaying(false);
    }
    const handlePlayPause = () => {
       if (isPlaying) {
        handlePause();
       }
       else {
        handlePlay();
       }
    }

    function formatDuration(durationSeconds){
        if (!durationSeconds || isNaN(durationSeconds)) return "0:00";
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    function handleForward (){
        changeNumber((number+1)%5)
        setIsPlaying(false)
    }

    function handleBack () {
        changeNumber(((5 + (number-1))%5))
        setIsPlaying(false)
    }

    return (
       <Container>
        <div className='iPod'>
            <div className='iPodScreen'>
                <div className='screenRow1'>
                    <h2>Now Playing</h2>
                </div>
                <div className='screenRow2'>
                    <div className='screenContent'>
                        <p style={{textAlign:"center", padding:"0px", marginBottom:"-5px"}}>{number+1} of 5</p>
                        <img src={cover} alt="Angela sitting on bed with microphone. Text reads Voz Memos A Gen-Z Podcast" className='cover' />
                    </div>
                    <div className='screenContent'>
                        {episodes[0] && (
                            <a href={episodes[number].link}>
                                <p style={{marginTop:"20px"}} dangerouslySetInnerHTML={{ __html: episodes[number].title.rendered }}/>
                            </a>
                        )}
                    </div>
                </div>
                <div className='screenRow3'>
                    {/* Audio */}
                     <audio ref={audioRef} src={episodes[number].meta.audio_file}></audio>
                    
                    <p>{formatDuration(currentTime)}</p>

                    {/* the audio track */}
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                    />
                    {/* track duration */}
                    
                    <p>{formatDuration(duration)}</p>
                    {/* <p>{duration}</p> */}
                </div>
            </div>
            <div className='iPodScroll'>
                <div className='scrollRow1'>
                    <a href="https://angelageorge.com/voz-memos" className='menuLink'>
                    <h3>menu</h3>
                    </a>
                </div>
                <div className='scrollRow2'>
                        <img width="32px" height="32px" src={forward} alt="end" style={{transform: "rotate(180deg)", cursor:"pointer"}} onClick={handleBack}/>                
                    <div className='scrollButton'></div>
                        <img width="32px" height="32px" src={forward} alt="end" onClick={handleForward} style={{cursor:"pointer"}}/>                
                    </div>
                <div className='scrollRow3' >
                    <button onClick={handlePlayPause} style={{border:"none", backgroundColor:"transparent"}}>
                        <img src={pause} width="32px" height="32px" style={{marginTop:"10px"}}/>
                    </button>
                </div>
                
            </div>
        </div>
        </Container> 
    )
}

export default IPod