import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui';

export interface SelectFieldItemProps {
  value: string;
  text: string;
}

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> {
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  label?: string;
  items: SelectFieldItemProps[];
  placeholder?: string;
}

export const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>({
  control,
  name,
  label,
  items,
  placeholder,
}: Props<TFieldValues, TContext>) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange as never}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder ? t(placeholder) : undefined}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={uuidv4()} value={item.value}>
                  {t(item.text)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
