import { CellContext, ColumnDef, RowData } from '@tanstack/react-table';
import { FindReferendumNode } from './find-referendum-node';
import * as dayjs from 'dayjs';
import { ReferendumStatus } from '@client/gql/generated';
import { useTranslation } from 'react-i18next';
import { Button } from '@client/components/ui';
import { Trash2, Pencil, ChevronRight } from 'lucide-react';

const referendumStatusTranslation = (value: ReferendumStatus): string =>
  `domains.referendum.fields.status.${value}`;

const StatusCell = <TData extends RowData, TValue = unknown>({
  getValue,
}: CellContext<TData, TValue>) => {
  const { t } = useTranslation();
  const value = getValue<ReferendumStatus>();
  const translatedValue = referendumStatusTranslation(value);
  return t(translatedValue);
};

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
    cell: (props) => {
      return <StatusCell {...props} />;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'start date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const formattedValue = dayjs(value).format('DD MMM YYYY HH:mm');
      return formattedValue;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'end date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const formattedValue = dayjs(value).format('DD MMM YYYY HH:mm');
      return formattedValue;
    },
  },
  {
    header: 'actions',
    cell: () => (
      <div>
        <Button className="text-red-500" variant="link">
          <Trash2 size={16} />
        </Button>
        <Button variant="link">
          <Pencil size={16} />
        </Button>
        <Button variant="link">
          <ChevronRight size={16} />
        </Button>
      </div>
    ),
  },
];
