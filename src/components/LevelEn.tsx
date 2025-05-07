import { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";

enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  None = "none"
}

interface Movie {
  id: number;
  title: string;
  difficulty: Difficulty;
  topics: string[];
}

const LevelEn = ({ level }: { level: Difficulty }) => {
  const URL = "http://localhost:8080/api/movies";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: AxiosResponse<Movie[]> = await axios.get(URL); 
      setMovies(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
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

  const filteredMovies = movies.filter(movie => movie.difficulty === level);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Movies for {level} level:</h2>
      
      {filteredMovies.length > 0 ? (
        <ul className="space-y-4">
          {filteredMovies.map(movie => (
            <li key={movie.id} className="border p-4 rounded-lg ">
              <Link to={`/video/${movie.id}`} className="block">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <div className="mt-2">
                  <span className="font-medium">Topics:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.topics.map(topic => (
                      <span 
                        key={topic} 
                        className="px-2 py-1  rounded text-sm"
                      >
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