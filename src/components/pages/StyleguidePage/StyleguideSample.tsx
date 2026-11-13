import type { PropsWithChildren } from 'react';

interface StyleguideSampleProps extends PropsWithChildren {
    code: string;
}

export default function StyleguideSample({
    code,
    children,
}: StyleguideSampleProps) {
    return (
        <div className="mb-5">
            {children}
            <code className="text-taupe mt-2 block font-mono text-xs break-all">
                {code}
            </code>
        </div>
    );
}
