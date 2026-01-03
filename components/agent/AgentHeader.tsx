
import React from 'react';
import IconButton from '../common/IconButton';

const AgentHeader: React.FC = () => {
  return (
    <div className="px-8 pt-8 pb-3 flex items-center justify-end gap-1">
      <IconButton 
        rounded="10"
        icon={
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m-7-7h14" />
          </svg>
        }
      />
      <IconButton 
        rounded="10"
        icon={
          <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      />
      <IconButton 
        rounded="10"
        icon={
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        }
      />
      <IconButton 
        rounded="10"
        icon={
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
          </svg>
        }
      />
    </div>
  );
};

export default AgentHeader;
