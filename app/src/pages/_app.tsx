import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Gayathri } from 'next/font/google'
import Layout from './layout';

const geeki = localFont({
  src: [
    {
      path: './fonts/Geeeki-Regular.ttf',
      weight: '700',
      style: 'normal',
    }, 
  ],
  variable: '--font-general'
})

const generalsans = localFont({
  src: [
    {
      path: './fonts/GeneralSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    
  ],
  variable: '--font-main'
})

const gayathri = Gayathri({
  weight: ['100','400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function App({ Component, pageProps, router }: AppProps) {
  const site = router.route === '/';


  if (site) {
    // Render the login page without the layout
    return <main className={`${geeki.variable} ${generalsans.variable} ${gayathri.variable}`}>
    <Component {...pageProps} /> 
    </main>
  }


  return <main className={`${geeki.variable} ${generalsans.variable} ${gayathri.variable}`}>
    <Layout>
    <Component {...pageProps} /> 
    </Layout>
  </main>
}
