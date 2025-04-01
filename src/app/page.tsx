import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";
import { MyTab } from "./my-tab";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default async function Home() {
  unstable_noStore();

  return (
    <main className="flex flex-col min-h-screen p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm lg:flex flex-col container">
        <h1 className="text-5xl font-bold max-w-5xl flex items-center gap-4">
          <Image
            src="/parrot.svg"
            width={100}
            height={100}
            alt="Parrot"
            priority
          />
          TOP DONATORS 🤑
        </h1>
        <h2 className="text-3xl font-bold max-w-5xl text-gray-600">
          TOP 100 senders
        </h2>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex container pt-10">
        <Suspense fallback={<Loading />}>
          <MyTab />
        </Suspense>
      </div>
    </main>
  );
}
