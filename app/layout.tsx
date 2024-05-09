import { ReactNode } from 'react';
import '@/assets/styles/global.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'PropertyPulse | Find The Prefect Rental',
  desciption: 'Find your dream rental propterty',
  keywords: 'rental, find rental, find properties',
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
