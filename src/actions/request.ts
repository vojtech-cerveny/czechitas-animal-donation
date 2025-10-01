"use server";
import { errorResponse, successResponse } from "@/lib/response";
import axios from "axios";
import _ from "lodash";

export async function getApiKey(baseUrl: string) {
  if (baseUrl.includes("praha")) {
    return process.env.PRAHA_API_KEY || "11";
  } else if (baseUrl.includes("ostrava")) {
    return process.env.OSTRAVA_API_KEY || "22";
  }
  return process.env.PRAHA_API_KEY || "11"; // fallback to Praha
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  createdAt: string;
  from: {
    id: string;
    number: string;
    user: {
      name: string;
    };
  };
  to: {
    id: string;
    number: string;
    user: {
      name: string;
    };
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
  };
  meta: {
    timestamp: string;
    requestId: string;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export async function makeRequest(apiKey: string, baseUrl: string) {
  try {
    const headers = { "x-api-key": apiKey };
    const response = await axios
      .get(`${baseUrl}/transactions?limit=1000`, {
        withCredentials: false,
        headers,
      })
      .then((res) => res.data);

    if (!response.success) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = response;

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch transactions");
    }

    return data.data.transactions;
  } catch (error) {
    // console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function getTOP100Senders(apiKey: string, baseUrl: string) {
  try {
    console.log("Fetching transactions...");
    console.log(apiKey);
    const transactions = await makeRequest(apiKey, baseUrl);

    const grouped = _.groupBy(
      transactions,
      (transaction) => transaction.from.user.name
    );

    // Sum up the amounts for each sender and sort by amount
    const sorted = _.orderBy(
      _.map(grouped, (transactions, sender) => ({
        sender,
        amount: _.sumBy(transactions, "amount"),
      })),
      "amount",
      "desc"
    );
    const totalSum = _.sumBy(sorted, "amount");
    // Get top 100 senders
    const top100 = _.take(sorted, 100);

    console.log({ senders: top100, total: totalSum });
    return successResponse("Success", { senders: top100, total: totalSum });
  } catch (error) {
    console.error("Error in getTOP100Senders:", error);
    return errorResponse("Failed to fetch data");
  }
}
