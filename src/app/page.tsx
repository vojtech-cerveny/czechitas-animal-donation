import { getTOP100Senders, makeRequest } from "@/actions/request";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableView } from "./table";
import { MyTab } from "./my-tab";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home() {
  unstable_noStore();
  const response = await getTOP100Senders("clui5feml00019mtueytn5zh4");
  const allData = await makeRequest("clui5feml00019mtueytn5zh4");

  if (!response.success) {
    return <div>Error: {response.message}</div>;
  }
  return (
    <main className="flex flex-col min-h-screen p-24 ">
      <div className="z-10 max-w-5xl w-full font-mono text-sm lg:flex flex-col container">
        <h1 className="text-5xl font-bold max-w-5xl flex items-center gap-4">
          <Image src={"parrot.svg"} width={100} height={100} alt="Parrot" />
          ANIMAL DONATION
        </h1>
        <h2 className="text-3xl font-bold max-w-5xl text-gray-600">
          TOP 100 donators
        </h2>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex container">
        <Tabs defaultValue="animal-donation" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="animal-donation">Animail donations</TabsTrigger>
            <TabsTrigger value="my">My statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="animal-donation">
            <TableView senders={response.data} allData={allData} />
          </TabsContent>
          <TabsContent value="my">
            <MyTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
