import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';

export default function CodeBlock({ code, language }) {
    const [hasCopied, setHasCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    return (
        <div className="bg-gray-900 text-white rounded-md my-4 relative group">
            <div className="absolute top-2 right-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={copyToClipboard}
                >
                    {hasCopied ? <Check className="w-4 h-4 text-green-400" /> : <Clipboard className="w-4 h-4" />}
                </Button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
}