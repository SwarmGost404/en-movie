import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'
import axios, {AxiosResponse} from 'axios';
import { Link } from "react-router-dom";

interface Video {
    id: number;
    name: string;
    url: string;
}

function Player () {
    const { id } = useParams()
    const [isPlaying, setIsPlaying] = useState(false);

    const [video, setVideo] = useState({
        name: "loading...",
        id: 0,
        url: "/videoLoading",
    });

    const videoURL: string = `http://localhost:8080/video/` + id ;

    const navigateToVideo = (): void => {
        const searchInput = document.querySelector<HTMLInputElement>("#serth");
        
        if (searchInput && searchInput.value) {
          window.location.href = `/video/${encodeURIComponent(searchInput.value)}`;
        } else {
          console.error("Search input not found or empty");
        }
      };

    const fetchVideo = async (videoURL: string): Promise<Video> => {
            try {
                const response: AxiosResponse<Video> = await axios.get<Video>(videoURL, {
                    responseType: 'json'
                });
                setVideo({
                    name: response.data.name,
                    id: response.data.id,
                    url: response.data.url
                })
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(`Failed to fetch video: ${error.message}`);
                } throw new Error('Unknown error occurred while fetching video');
            }
            };

    useEffect(() => {
        fetchVideo(videoURL)
    }, [videoURL])


    return (
        <div className='w-[60%] left-[20%] h-[600px] mt-[20px] relative'>
            <div className="flex h-[55px]">
                <div className="w-[30%] border m-auto text-center py-2 border-[#fff] mt-[5px] bg-gray-500 hover:bg-gray-300 hover:text-black">
                <Link  to={"/video/" + (Number(id) + 1)}>Следующий семинар</Link>
                </div>
                <div className="text-red-500 py-2 m-auto ml-[30%] text-center w-[20%] ">{video.name}</div>
                <div className=" text-black bg-amber-500 m-auto">
                    <input className=" decoration- text-center border border-[#000] w-full" type="text" name="serth" id="serth" placeholder="Поиск Семинара" />
                    <button className="border border-[#000] w-full" onClick={navigateToVideo}>Искать</button>
                </div>
            </div>
            
            <ReactPlayer 
                className="border border-white"
                width="auto"
                height="100%"
                onClick={() => setIsPlaying(!isPlaying)} 
                playing={isPlaying} 
                url={video.url}
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
    )
}
export default Player;