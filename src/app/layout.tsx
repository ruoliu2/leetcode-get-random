import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Container} from '@mui/material';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'leetcode-top-150',
  description: 'random questiosn from leetcode top 150',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
