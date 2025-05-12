import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player'

function Player() {

  const navigate = useNavigate()

  const { id } = useParams<string>()

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);// 
  const [progress, setProgress] = useState<number>(0);// %
  const [duration, setDuration] = useState<number>(0);// sec
  const [viser, setViser] = useState<boolean>(true)
  
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const toggleFullscreen = async () => {
    if (!playerContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerContainerRef.current.requestFullscreen();
        
        if (playerRef.current) {
          const internalPlayer = playerRef.current.getInternalPlayer();
          if (internalPlayer && typeof internalPlayer.requestFullscreen === 'function') {
            internalPlayer.requestFullscreen();
          }
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const formatTime = (seconds: number):string => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100);
  };

  const useInactivity = (timeout = 3000) => {
    useEffect(() => {
      let inactivityTimer: NodeJS.Timeout;
  
      const resetTimer = () => {
        setViser(true)
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          setViser(!viser)
        }, timeout);
      };
      resetTimer();
      const events = ['mousemove', 'mousedown', 'keydown', 'touchmove', 'scroll'];
      events.forEach(event => {
        window.addEventListener(event, resetTimer);
      });
  
      return () => {
        clearTimeout(inactivityTimer);
        events.forEach(event => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }, [timeout]);
  };
  
  useInactivity();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setProgress(seekTo);
    playerRef.current?.seekTo(seekTo / 100);
  };

  const handlePressKeys = (e: KeyboardEvent) => {
    switch(e.key) {
      case ' ':
        setIsPlaying(!isPlaying)
        break;
      case 'ArrowLeft':
        handleSeekBtn(10, false)
        break;
      case 'ArrowRight':
        handleSeekBtn(10, true)
        break;
      case "Spacebar":
        setIsPlaying(!isPlaying)
        break;
        case "f":
          toggleFullscreen()
          break;
      default:
        return;
    }
  };



  const handleSeekBtn = (seconds: number, forward: boolean) => {
    if (!playerRef.current || !duration) return;
    
    const currentTime = (progress / 100) * duration;
    const newTime = forward ? Math.min(currentTime + seconds, duration) : Math.max(currentTime - seconds, 0);
  
    playerRef.current.seekTo(newTime);
    setProgress((newTime / duration) * 100);
  };


  useEffect(() => {
    window.addEventListener('keydown', handlePressKeys);
    
    return () => {
      window.removeEventListener('keydown', handlePressKeys);
    };
  }, [progress, duration]);

  return (
    <main ref={playerContainerRef} className="h-screen overflow-hidden bg-black absolute top-0 left-0 w-full justify-center items-center ">
      
      <div
        className="relative top-0 left-0 h-full w-full"          
        onClick={handlePlayPause}
        
      >
        <ReactPlayer
          className="relative top-0 left-0 w-full h-full"
          width="100%"
          ref={playerRef}
          height="90%"
          playing={isPlaying}
          url={`http://localhost:8080/static/${id}.mp4`}
          volume={volume}
          onProgress={handleProgress}
          controls={false}
          onDuration={(duration) => setDuration(duration)}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />
      </div>
      <div
        className={` absolute w-full h-[10px] ${viser ? "flex" : "hidden"} bottom-[80px] `}
      >
        <div className="w-[10%] h-[10px] text-center ">{formatTime(duration * (progress / 100))}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="
            h-[10px] w-[80%] 
            appearance-none bg-transparent
            [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-md
            rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-2
            cursor-pointer
          "

          style={{
            background: `linear-gradient(to right, #f97316 ${progress}%, #e5e7eb ${progress}%)`
          }}
        />
        <div className="w-[10%] text-center ">{formatTime(duration)}</div>
      </div>
      <div
        className={`absolute w-full h-[70px] ${viser ? "flex" : "hidden"} bottom-[0px] `}
      >
        <div
          className="w-[100%] h-full "
        >
          <button
            className="h-[70px] w-[20%] text-4xl"
            onClick={handlePlayPause}>
            {isPlaying ? "II" : ">"}
          </button>
          <button
            onClick={() => {
              handleSeekBtn(10, false)
            }}
            className="h-[70px] w-[20%] text-4xl "
          >
            -
          </button>
          <button
            onClick={() => {
              handleSeekBtn(10, true)
            }}
            className="h-[70px] w-[20%] text-4xl "
          >
            +
          </button>
          <button
            className="h-[70px] w-[20%] text-4xl "
            onClick={() => {
              navigate("/video/" + (Number(id) + 1))
            }}
          >
            {">I"}
          </button>
          
        </div>
        
        <div
          className="w-[100%] h-full ml-[60%] text-4xl"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="
              w-[50%] h-1.5
              appearance-none bg-transparent
              [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3
              cursor-pointer
            "
            style={{
              background: `linear-gradient(to right, #f97316 ${volume * 100}%, #d1d5db ${volume * 100}%)`
            }}
            
          />
          <button
        onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
        </div>
        
      </div>
      <div 
        className={`  text-3xl absolute w-full h-[55px] ${viser ? "flex" : "hidden"} top-[0px] `}
      >
        <button
        className=" w-[55px] h-[55px]  "
          onClick={() => {
            navigate("/")
          }}
        >
          X
        </button>
      </div>
    </main>
  )
}

export default Player;