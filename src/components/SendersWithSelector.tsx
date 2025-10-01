"use client";

import { getTOP100Senders, getApiKey } from "@/actions/request";
import { TableView } from "@/app/table";
import { useEffect, useState } from "react";
import { BaseUrlSelector } from "./BaseUrlSelector";

const baseUrls = [
  "https://praha.czechibank.ostrava.digital/api/v1",
  "https://ostrava.czechibank.ostrava.digital/api/v1",
];

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center w-full h-64 text-red-600">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Error</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export function SendersWithSelector() {
  const [selectedBaseUrl, setSelectedBaseUrl] = useState(baseUrls[0]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (baseUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = await getApiKey(baseUrl);
      const result = await getTOP100Senders(apiKey, baseUrl);
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error fetching senders:", err);
      setError("Failed to load sender data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedBaseUrl);
  }, [selectedBaseUrl]);

  const handleBaseUrlChange = (newBaseUrl: string) => {
    setSelectedBaseUrl(newBaseUrl);
  };

  return (
    <div className="w-full">
      <BaseUrlSelector onBaseUrlChange={handleBaseUrlChange} />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : data ? (
        <TableView senders={data} allData={undefined} />
      ) : null}
    </div>
  );
}
