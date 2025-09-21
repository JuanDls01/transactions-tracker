'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';

interface TooltipTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const TooltipText = ({ text, maxLength = 30, className = '' }: TooltipTextProps) => {
  const shouldTruncate = text && text.length > maxLength;
  const displayText = shouldTruncate ? `${text.slice(0, maxLength)}...` : text;

  if (!shouldTruncate || !text) {
    return <span className={className}>{text || '-'}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`cursor-help ${className}`}>{displayText}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs break-words">{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipText;