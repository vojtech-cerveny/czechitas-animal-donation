"use client";

import { getTOP100Senders } from "@/actions/request";
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
        <div>
          You can add your own Bearer token here to generate your own statistics. Check who are the top 100 donators and how much they donated to you.
        </div>
        <Input
          id="apiKey"
          name={"apiKey"}
          autoComplete="on"
          placeholder="Bearer token"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.currentTarget.value)}
        />
        <Button
          onClick={async () => {
            const downloadedSenders = await getTOP100Senders(apiKey);
            if (!downloadedSenders.success) {
              console.error("Error: ", downloadedSenders.message);
              toast({
                title: "Oh no!",
                description:
                  "Are you sure you have the right Bearer token? It returned an error. 🥺",
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
      <TableView senders={senders} allData={undefined} />
    </div>
  );
}
