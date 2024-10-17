import "dotenv/config";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { MyTab } from "./my-tab";

export default async function Home() {
  unstable_noStore();

  return (
    <main className="flex flex-col min-h-screen p-24 ">
      <div className="z-10 max-w-5xl w-full font-mono text-sm lg:flex flex-col container">
        <h1 className="text-5xl font-bold max-w-5xl flex items-center gap-4">
          <Image src={"parrot.svg"} width={100} height={100} alt="Parrot" />
          PERSONAL STATISTICS
        </h1>
        <h2 className="text-3xl font-bold max-w-5xl text-gray-600">
          TOP 100 senders (including you)
        </h2>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex container pt-10">
        <MyTab />
      </div>
    </main>
  );
}
