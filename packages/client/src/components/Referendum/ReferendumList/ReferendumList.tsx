import { FC } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@client/components/ui/table';
import { columns } from './columns';
import { FindReferendumNode } from './find-referendum-node';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@client/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useColumns } from '@client/lib/use-columns';

interface Props {
  data: FindReferendumNode[];
  onAdd?: () => void;
}

export const ReferendumList: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const formColumns = useColumns(columns);

  const table = useReactTable({
    data,
    columns: formColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="flex flex-col justify-center flex-grow p-8">
      <h3 className="text-left text-2xl py-4 flex space-x-4 items-center">
        <span className="capitalize-first ">
          {t('domains.referendum.referendums')}
        </span>
        <Link to="/referendums/create">
          <PlusCircle className="text-blue-600 cursor-pointer" size={16} />
        </Link>
      </h3>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center capitalize-first"
              >
                {t('shared.noResults')}.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
