import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'

function Player() {
  const { id } = useParams<string>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <main className="relative sm:mt-[20px] flex justify-center items-center ">
      <div className="relative top-0 left-0 w-full max-w-4xl">
        <ReactPlayer
          className="relative top-0 left-0 w-full h-full"
          width="100%"
          height="100%"
          onClick={() => setIsPlaying(!isPlaying)}
          playing={isPlaying}
          url={`http://localhost:8080/static/movie/${id}.mp4`}
          controls
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />
      </div>
    </main>
  )
}

export default Player;