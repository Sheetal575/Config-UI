import React, { memo, useRef, useState } from 'react';
import styles from './form-viewer.module.scss';
import FormUI from './form-ui-resolver';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/utilis/constant';

interface FormViewerInterface {
  formConfig: Record<string, any>;

}

const FormViewer = memo(({ formConfig }: FormViewerInterface) => {
  const formRef = useRef<any>(null);
  const [validationErrors,setValidationErrros] = useState<Record<string,any>>({});
  const formField:Array<any> = formConfig?.form;

  const checkValidation : (formResponse:Record<string,any>) => boolean = (formResponse) => {
    for (const element of formField) {
      if (element?.required) {
        if (formResponse[element?.name] === '') {
          setValidationErrros((message)=> ({...message, [element?.name]: REQUIRED_FIELD_ERROR_MESSAGE}));
          alert(`please ${element?.placeholder}`)
          return false;
        }
      }
    }
    return true;
  }

  const handleSubmit =  (e:any) => {
    // e.preventDefault();
    // this should be dynamic
    let formResponse:Record<string,any> = {};
    formField.forEach((element:any) => {
      const val = formRef.current.querySelector(`[name="${element.name}"]`);
      formResponse = {...formResponse, [element.name] : val?.value}
    });

    const res:boolean = checkValidation(formResponse);

    console.log(res, 'res');
    

    if(res){
      console.log(formResponse, 'formResponse')
    }
   
  }

  return <div className={styles['form-viewer']} ref={formRef}>{formConfig?.form?.map((val: any) => FormUI(val?.field, {...val, onSubmit:handleSubmit}, ))}</div>;
});

FormViewer.displayName = 'FormViewer';
export default FormViewer;
