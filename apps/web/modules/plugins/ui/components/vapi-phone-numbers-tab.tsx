"use client";

import { Badge } from "@workspace/ui/components/badge";
import { useVapiPhoneNumbers } from "../../hooks/use-vapi-data";
import { CheckCircle, Phone, XCircle } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

export const VapiPhoneNumbersTab = () => {
  const { data: phoneNumbers, isLoading } = useVapiPhoneNumbers();

  return (
    <div className="border-t bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4">Phone Number</TableHead>
            <TableHead className="px-6 py-4">Name</TableHead>
            <TableHead className="px-6 py-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Loading phone numbers..
                  </TableCell>
                </TableRow>
              );
            }
            if (phoneNumbers.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No phone numbers configured
                  </TableCell>
                </TableRow>
              );
            }
            return phoneNumbers.map((phone) => (
              <TableRow className="hover:bg-muted/50" key={phone.id}>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="font-mono">
                      {phone.number || "Not configured"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {phone.name || "Unnamed"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    className="capitalize"
                    variant={
                      phone.status === "active" ? "default" : "destructive"
                    }
                  >
                    {phone.status === "active" && (
                      <CheckCircle className="mr-1 size-3" />
                    )}
                    {phone.status !== "active" && (
                      <XCircle className="mr-1 size-3" />
                    )}
                    {phone.status || "Unknown"}
                  </Badge>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
