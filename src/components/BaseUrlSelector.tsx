"use client";

import { useState } from "react";

const baseUrls = [
  "https://ostrava.czechibank.ostrava.digital/api/v1",
  "https://praha.czechibank.ostrava.digital/api/v1",
];

interface BaseUrlSelectorProps {
  onBaseUrlChange: (baseUrl: string) => void;
}

export function BaseUrlSelector({ onBaseUrlChange }: BaseUrlSelectorProps) {
  const [selectedBaseUrl, setSelectedBaseUrl] = useState(baseUrls[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBaseUrl = event.target.value;
    setSelectedBaseUrl(newBaseUrl);
    onBaseUrlChange(newBaseUrl);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="baseUrl-selector"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select API Endpoint:
      </label>
      <select
        id="baseUrl-selector"
        value={selectedBaseUrl}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
      >
        {baseUrls.map((url, index) => (
          <option key={index} value={url}>
            {url.includes("praha") ? "Praha API" : "Ostrava API"} - {url}
          </option>
        ))}
      </select>
    </div>
  );
}
