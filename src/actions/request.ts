"use server";
import { errorResponse, successResponse } from "@/lib/response";
import axios from "axios";
import _ from "lodash";

export async function makeRequest(apiKey: string) {
  let config = {
    url: "https://czechibank.ostrava.digital/api/transactions",
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const response = await axios(config);
  const transactions = response.data.data.transactions;

  return transactions;
}

export async function getTOP100Senders(apiKey: string) {
  let config = {
    url: "https://czechibank.ostrava.digital/api/transactions",
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await axios(config);
    const transactions = response.data.data.transactions;

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
    // Get top 10 senders
    const top100 = _.take(sorted, 100);

    console.log({ senders: top100, total: totalSum });
    return successResponse("Success", { senders: top100, total: totalSum });
  } catch (error) {
    return errorResponse("Failed to fetch data");
  }
}
