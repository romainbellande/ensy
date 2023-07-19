import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface RadioGroupItemProps {
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
  items: RadioGroupItemProps[];
}

export const RadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>({
  control,
  name,
  label,
  items,
}: Props<TFieldValues, TContext>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}:</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange as never}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {items.map(({ value, text }) => (
                <FormItem
                  key={value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel htmlFor="option-two">{text}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
