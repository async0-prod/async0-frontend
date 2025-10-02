"use client";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Problem, TanstackProblem } from "@/lib/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleRowClick: (slug: string, name: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleRowClick,
}: DataTableProps<TData, TValue>) {
  // const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const uniqueTopics = useMemo(() => {
    if (!data || data.length === 0) return [];

    const topics = new Set<string>();
    (data as TanstackProblem[]).forEach((problem) => {
      problem.topic_names?.forEach((topic) => topics.add(topic));
    });

    return Array.from(topics).sort();
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const topicFilterValue = table
    .getColumn("topic_names")
    ?.getFilterValue() as string;

  const handleTopicFilter = (value: string) => {
    if (value === "all") {
      table.getColumn("topic_names")?.setFilterValue(undefined);
    } else {
      table.getColumn("topic_names")?.setFilterValue(value);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2.5 overflow-auto text-charcoal dark:text-almond">
      <div className="flex items-center pb-2">
        <div>
          <Input
            placeholder="Filter problems..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm dark:border-almond border-almond-darker"
          />
        </div>
        <div className="ml-auto">
          <Select
            value={topicFilterValue || "all"}
            onValueChange={handleTopicFilter}
          >
            <SelectTrigger className="w-[200px] dark:border-almond border-almond-darker cursor-pointer">
              <SelectValue placeholder="Filter by topic" />
            </SelectTrigger>
            <SelectContent className="bg-almond dark:bg-charcoal ">
              <SelectItem
                value="all"
                className="focus:bg-almond-dark cursor-pointer dark:focus:text-charcoal"
              >
                All Topics
              </SelectItem>
              {uniqueTopics.map((topic) => (
                <SelectItem
                  key={topic}
                  value={topic}
                  className="focus:bg-almond-dark cursor-pointer dark:focus:text-charcoal"
                >
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md p-2 border not-dark:border-almond-darker">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent not-dark:border-almond-darker"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    const rowData = row.original as Problem;
                    handleRowClick(rowData.slug, rowData.name);
                  }}
                  className="cursor-pointer dark:bg-charcoal hover:bg-almond-dark border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export function getCommonPinningStyles<TData>({
  column,
  withBorder = false,
}: {
  column: Column<TData>;
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? "-4px 0 4px -4px hsl(var(--border)) inset"
        : isFirstRightPinnedColumn
          ? "4px 0 4px -4px hsl(var(--border)) inset"
          : undefined
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? "sticky" : "relative",
    background: isPinned ? "hsl(var(--background))" : "hsl(var(--background))",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
