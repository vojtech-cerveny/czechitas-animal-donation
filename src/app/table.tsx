import { Charts } from "@/components/app/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableView({
  senders,
  allData,
}: {
  senders: { senders: { sender: string; amount: number }[]; total: number };
  allData: any;
}) {
  return (
    <div>
      <Table>
        <TableCaption>A list TOP10 donators and their SUM</TableCaption>
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="">Person</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {senders.senders.map((sender, key) => (
            <TableRow className="w-full" key={key}>
              <TableCell className="font-medium">{sender.sender}</TableCell>
              <TableCell className="text-right">{sender.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{senders.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {allData && <Charts data={allData} />}
    </div>
  );
}
