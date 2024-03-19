"use client";

import { getTOP10Senders } from "@/actions/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableView } from "./table";
import { useState } from "react";
import useLocalStorage from "@/lib/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

export function MyTab() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "");
  const [senders, setSenders] = useState<{
    senders: { sender: string; amount: number }[];
    total: number;
  }>({
    senders: [],
    total: 0,
  });

  return (
    <div>
      <div className="flex flex-col w-1/2 gap-2 mx-auto">
        <Input
          id="apiKey"
          name={"apiKey"}
          autoComplete="on"
          placeholder="API KEY"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.currentTarget.value)}
        />
        <Button
          onClick={async () => {
            const downloadedSenders = await getTOP10Senders(apiKey);
            if (!downloadedSenders.success) {
              console.error("Error: ", downloadedSenders.message);
              toast({
                title: "Oh no!",
                description:
                  "Are you sure you have the right API key? It returned an error. 🥺",
              });
              return;
            } else {
              setSenders(downloadedSenders.data);
            }
          }}
        >
          Generate stats
        </Button>
      </div>
      <TableView senders={senders} />
    </div>
  );
}
