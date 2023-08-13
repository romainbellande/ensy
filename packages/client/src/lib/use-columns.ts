import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useColumns = <T>(columns: ColumnDef<T>[]) => {
  const { t } = useTranslation();

  return useMemo((): ColumnDef<T>[] => {
    return columns.map((item) => ({
      ...item,
      header: t(item.header as string),
    }));
  }, [t, columns]);
};
