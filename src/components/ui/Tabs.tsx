import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs?: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'underline' | 'pill' | 'segmented';
  className?: string;
  children?: React.ReactNode;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({
  tabs,
  activeTab,
  onChange,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  variant = 'underline',
  className,
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentTab = controlledValue !== undefined ? controlledValue : (activeTab !== undefined ? activeTab : uncontrolledValue);

  const handleTabChange = (val: string) => {
    if (onValueChange) onValueChange(val);
    if (onChange) onChange(val);
    setUncontrolledValue(val);
  };

  // If used as compound component with children
  if (children) {
    return (
      <TabsContext.Provider value={{ value: currentTab, onValueChange: handleTabChange }}>
        <div className={cn('w-full', className)}>{children}</div>
      </TabsContext.Provider>
    );
  }

  // If used with tabs array
  if (!tabs) return null;

  return (
    <div className={cn('w-full overflow-x-auto no-scrollbar', className)}>
      <div
        className={cn(
          'flex',
          variant === 'segmented' ? 'p-1 space-x-1 bg-muted/20 rounded-lg' : 'space-x-4 border-b border-border',
          variant === 'pill' ? 'border-none space-x-2' : ''
        )}
      >
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'whitespace-nowrap py-2 px-4 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                variant === 'underline' && [
                  'border-b-2',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground',
                ],
                variant === 'pill' && [
                  'rounded-full',
                  isActive ? 'bg-primary text-white' : 'bg-transparent text-muted-foreground hover:bg-muted/30',
                ],
                variant === 'segmented' && [
                  'flex-1 rounded-md',
                  isActive ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/10',
                ]
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <Badge
                    variant={isActive && variant !== 'pill' ? 'default' : 'inactive'}
                    className={cn(
                      'ml-2',
                      variant === 'pill' && isActive ? 'bg-white/20 text-white' : ''
                    )}
                  >
                    {tab.count}
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-muted/20 p-1 text-muted-foreground border border-border/50',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        isActive
          ? 'bg-surface text-foreground shadow-sm font-semibold'
          : 'hover:bg-surface/50 hover:text-foreground',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (context?.value !== value) return null;

  return <div className={cn('mt-2 ring-offset-background focus-visible:outline-none', className)}>{children}</div>;
}
