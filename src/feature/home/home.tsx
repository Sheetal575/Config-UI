'use client';
import React, { memo, useState } from 'react';
import styles from './home.module.scss'; // Ensure you import the CSS styles
import JSONViewer from '../json-viewer/json-viewer';
import ConfigRender from "../config-renderer/config-renderer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { FORM_JSON } from '@/utilis/constant';

const Home = memo(() => {
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
          {syntaxError?.message ? <div className={styles['syntax-error']}>{syntaxError?.message}</div> :  <ConfigRender config={formConfig} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
