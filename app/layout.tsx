import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Havacılar Yatırım - Geleceğe Yatırım, Havacılıkla Başlar',
  description: 'Gayrimenkul ve havacılıkta stratejik danışmanlık hizmetleri. Profesyonel çözümler ve güvenilir yatırım fırsatları.',
  keywords: 'havacılık, gayrimenkul, yatırım, danışmanlık, Antalya',
  openGraph: {
    title: 'Havacılar Yatırım',
    description: 'Gayrimenkul ve havacılıkta stratejik danışmanlık hizmetleri.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}