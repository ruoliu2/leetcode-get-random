import type {Metadata} from 'next';
import {Container} from '@mui/material';

export const metadata: Metadata = {
  title: 'leetcode-get-random',
  description: 'random questiosn from leetcode lists',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
