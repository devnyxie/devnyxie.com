import React from 'react';

// Alert component for different notification types
export const Alert = ({ children, variant = 'info', title }: { 
  children: React.ReactNode; 
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
}) => (
  <div className={`alert alert-${variant} relative w-full rounded-lg border p-4 my-4 ${
    variant === 'info' ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100' :
    variant === 'warning' ? 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100' :
    variant === 'error' ? 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100' :
    variant === 'success' ? 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100' :
    'border-gray-500 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100'
  }`}>
    {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
    <div className="text-sm">{children}</div>
  </div>
);

// Callout component for highlighted content blocks
export const Callout = ({ children, icon, title, variant = 'default' }: {
  children: React.ReactNode;
  icon?: string;
  title?: string; 
  variant?: 'default' | 'info' | 'warning' | 'error' | 'success';
}) => (
  <div className={`callout-${variant} relative w-full rounded-lg border-l-4 p-4 my-6 ${
    variant === 'info' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-950' :
    variant === 'warning' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950' :
    variant === 'error' ? 'border-l-red-500 bg-red-50 dark:bg-red-950' :
    variant === 'success' ? 'border-l-green-500 bg-green-50 dark:bg-green-950' :
    'border-l-gray-500 bg-card/50'
  }`}>
    <div className="flex items-start gap-3">
      {icon && <span className="text-lg leading-none mt-0.5 shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        {title && <h5 className="mb-2 font-medium leading-none tracking-tight">{title}</h5>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  </div>
);

// Code block with copy functionality
export const CodeBlock = ({ children, language = 'text', title }: {
  children: React.ReactNode;
  language?: string;
  title?: string;
}) => (
  <div className="relative my-4">
    {title && (
      <div className="bg-muted px-4 py-2 text-sm font-medium rounded-t-lg border-b">
        {title}
      </div>
    )}
    <pre className={`p-4 overflow-x-auto rounded-lg ${title ? 'rounded-t-none' : ''} bg-muted/50`}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  </div>
);

// Feature card component
export const FeatureCard = ({ title, description, icon }: {
  title: string;
  description: string;
  icon?: string;
}) => (
  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3">
      {icon && <span className="text-2xl mt-1">{icon}</span>}
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

// Default components export
export const mdxComponents = {
  Alert,
  Callout,
  CodeBlock,
  FeatureCard,
};