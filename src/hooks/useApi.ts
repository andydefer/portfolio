// hooks/useApi.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const useApi = <T>(baseUrl: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Fonction pour effectuer des requêtes GET
  const fetchData = async (endpoint: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<T> = await axios.get(
        `${baseUrl}/${endpoint}`
      );
      setData(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour effectuer des requêtes POST
  const sendData = async (endpoint: string, data: T): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<T> = await axios.post(
        `${baseUrl}/${endpoint}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data); // Vous pouvez également gérer la réponse ici
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    fetchData,
    sendData,
  };
};

export default useApi;
