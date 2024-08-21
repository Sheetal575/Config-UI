import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
// import other components as needed

interface FieldProps {
  [key: string]: any;
}
interface Option {
  label: string;
  value: string;
}

export function SelectDemo(props: any) {
  return (
    <Select name={props.name}>
      <SelectTrigger>
        <SelectValue placeholder='Select your gender' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{props?.options?.map((option: Option) => <SelectItem value={option?.value}>{option?.label}</SelectItem>)}</SelectGroup>
      </SelectContent>
    </Select>
  );
}

const FormUI = (key: string, props: FieldProps) => {
  const component: Record<string, any> = {
    input: <Input {...props} />,
    select: <SelectDemo {...props} />,
    textArea: <Textarea {...props} />,
    submitButton: <Button {...props} onClick={()=>props.onSubmit()}>{props.label}</Button>,
  };

  return component[key] || null;
};

export default FormUI;
