import { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";

enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  None = "none"
}

type Level =  "easy" | "medium" | "hard" | "none";

interface Topics {
  vocabulary: string[];
  dialogue_style: string[];
  cultural_context: string[];
  specialized: string[];
}

interface Movie {
  id: number;
  title: string;
  difficulty: Difficulty;
  topics: string[];
}

interface MovieData {
  movies: Movie[];
  topics: Topics;
}

interface LevelEnProps {
  level: Level;
}

const LevelEn: React.FC<LevelEnProps> = ({ level }) => {
  const URL: string = "http://localhost:8080/back.json";
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: AxiosResponse<MovieData> = await axios.get(URL);
      setMovieData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [level]);

  if (isLoading) return <div className="p-4 text-center">Loading movies...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const filteredMovies = movieData?.movies.filter(movie => movie.difficulty === level) || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Movies for {level} level:</h2>
      
      {filteredMovies.length > 0 ? (
        <ul className="  space-y-4">
          {filteredMovies.map(movie => (
            <li key={movie.id} className="border  p-4 rounded-lg">
                <Link to={"/video/" + movie.id}>
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <div className="mt-2">
                        <span className="font-medium">Topics:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                        {movie.topics.map(topic => (
                            <span key={topic} className="px-2 py-1 rounded text-sm">
                            {topic}
                            </span>
                        ))}
                        </div>
                    </div>
                </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No movies found for this level</p>
      )}
    </div>
  );
};

export default LevelEn;