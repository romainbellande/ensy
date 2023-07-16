import { ColumnDef } from '@tanstack/react-table';
import { FindReferendumNode } from './find-referendum-node';
//
export const columns: ColumnDef<FindReferendumNode>[] = [
  {
    accessorKey: 'name',
    header: 'name',
  },
  {
    accessorKey: 'finalVote',
    header: 'vote',
  },
  {
    accessorKey: 'status',
    header: 'status',
  },
  {
    accessorKey: 'startDate',
    header: 'start date',
  },
  {
    accessorKey: 'endDate',
    header: 'end date',
  },
];
