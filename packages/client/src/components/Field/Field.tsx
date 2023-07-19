import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@client/components/ui/form';
import { Input } from '@client/components/ui/input';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { Textarea } from '../ui/textarea';

type FieldType = 'text' | 'date' | 'datetime-local' | 'textarea';

interface FieldRendererProps<TFieldValues extends FieldValues = FieldValues> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  type?: FieldType;
}

const FieldRenderer = <TFieldValues extends FieldValues = FieldValues>({
  field,
  type,
}: FieldRendererProps<TFieldValues>) => {
  if (type === 'textarea') {
    return <Textarea {...field} />;
  }

  return <Input {...field} type={type} />;
};

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> {
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  label?: string;
  required?: boolean;
  type?: FieldType;
}

export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>({
  control,
  name,
  label,
  required = false,
  type = 'text',
}: Props<TFieldValues, TContext>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required={required}>{label || name}</FormLabel>
          <FormControl>
            <FieldRenderer field={field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
