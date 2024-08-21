import React, { memo, useCallback, useEffect, useState } from 'react';
import styles from './json-viewer.module.scss';
import jsonData from '../form.json';
import { Button } from '@/components/ui/button';
import { FORM_JSON } from '@/utilis/constant';

const JSONViewer = memo(({ setFormConfig , setSyntaxError}: any) => {
  const jsonString = JSON.stringify(jsonData, null, 8);
  const storedFormConfig = localStorage.getItem(FORM_JSON);

  const [jsonValue, setJsonValue] = useState<any>(() => {
    return storedFormConfig ? storedFormConfig : jsonString;
  });

  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState({
    reset: false,
    saveAndContinue: false,
  });

  const onChangeJson = (e: any) => {
    const { value } = e.target;
    setJsonValue(value);
  };

  const onReset = () => {
    setJsonValue(storedFormConfig);
  };

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonValue);
      const formattedJson = JSON.stringify(parsedJson, null, 8);
      setJsonValue(formattedJson);
      setSyntaxError({})
      return{message:"ok"};
    } catch (error) {
      console.log(error, 'asdsadsad');
      setIsLoading((loading) => ({ ...loading, saveAndContinue: false }));
      setSyntaxError(error);
    }
  };

  const onSaveAndContinue = async() => {
    const res =  formatJson();
    if(res?.message === "ok"){
      setIsLoading((loading) => ({ ...loading, saveAndContinue: true }));
      setFormConfig(JSON.parse(jsonValue));
      window.localStorage.setItem(FORM_JSON, jsonValue);
      setTimeout(() => {
        setIsLoading((loading) => ({ ...loading, saveAndContinue: false }));
      }, 1000);
    }
  };

  const updateLineNumbers = (json: any) => {
    if (json) {
      const lines = json.split('\n');
      const numbers = lines.map((_: any, index: number) => index + 1);
      setLineNumbers(numbers);
    } else {
      setLineNumbers([1]);
    }
  };

  useEffect(() => {
    updateLineNumbers(jsonValue);
  }, [jsonValue]);



  const renderJson = (
    <textarea
      className={styles['json-textArea']}
      value={jsonValue}
      onChange={onChangeJson}
    />
  );

  const actions = (
    <div className={styles['action-button']}>
      <Button variant='outline' onClick={onReset}>
        {isLoading.reset ? 'Loading...' : 'Reset'}
      </Button>
      <Button onClick={onSaveAndContinue}>
        {isLoading.saveAndContinue ? 'Processing...' : 'Save & Compile'}
      </Button>
    </div>
  );

  return (
    <div className={styles['json-viewer']}>
      <div className={styles['json-viewer--count']}>
        <div>
          {lineNumbers.map((lineNumber) => (
            <div key={lineNumber}>{lineNumber}</div>
          ))}
        </div>
      </div>
      <div className={styles['json-viewer--json']} >{renderJson}</div>
      {actions}
    </div>
  );
});

JSONViewer.displayName = 'JSONViewer';
export default JSONViewer;
