'use client';
import React, { memo, useState } from 'react';
import styles from './config-renderer.module.scss'; // Ensure you import the CSS styles
import JSONViewer from '../json-viewer/json-viewer';
import FormViewer from '../form-viewer/form-viewer';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { FORM_JSON } from '@/utilis/constant';
import { log } from 'console';

const ConfigRender = memo(() => {
  const [syntaxError, setSyntaxError] = useState<any>('');
  const [formConfig, setFormConfig] = useState(() => {
    const storedFormConfig = localStorage.getItem(FORM_JSON);
    return storedFormConfig ? JSON.parse(storedFormConfig) : {};
  });

  return (
    <div className={styles['container']}>
      <ResizablePanelGroup
        direction='horizontal'
        style={{ width: '100vw' }}
        // className='max-w-md rounded-lg border'
      >
        <ResizablePanel defaultSize={50}>
          <JSONViewer setFormConfig={setFormConfig} setSyntaxError={setSyntaxError}/>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          {syntaxError?.message ? <div className={styles['syntax-error']}>{syntaxError?.message}</div> :  <FormViewer formConfig={formConfig} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
});

ConfigRender.displayName = 'ConfigRender';
// FormRender.displayName = 'FormRender';

export default ConfigRender;
