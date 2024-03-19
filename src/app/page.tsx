import { getTOP10Senders } from "@/actions/request";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableView } from "./table";
import { MyTab } from "./my-tab";

export default async function Home() {
  const response = await getTOP10Senders("g00dsic9bw4");
  if(!response.success) {
    return <div>Error: {response.message}</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex container">
        <Tabs defaultValue="animal-donation" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="animal-donation">Animail donations</TabsTrigger>
            <TabsTrigger value="my">My statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="animal-donation">
            <TableView senders={response.data} />
          </TabsContent>
          <TabsContent value="my">
            <MyTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
