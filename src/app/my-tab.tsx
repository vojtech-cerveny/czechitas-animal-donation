import { getTOP100Senders } from "@/actions/request";
import { Suspense } from "react";
import { TableView } from "./table";

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

async function SendersContent() {
  try {
    const downloadedSenders = await getTOP100Senders("11");

    if (!downloadedSenders.success) {
      return <ErrorDisplay message={downloadedSenders.message} />;
    }

    return (
      <div className="w-full">
        <TableView senders={downloadedSenders.data} allData={undefined} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching senders:", error);
    return <ErrorDisplay message="Failed to load sender data" />;
  }
}

export async function MyTab() {
  return (
    <Suspense fallback={<Loading />}>
      <SendersContent />
    </Suspense>
  );
}
