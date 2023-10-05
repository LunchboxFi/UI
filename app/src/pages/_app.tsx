import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Gayathri } from 'next/font/google'
import Layout from './layout';

const generalsans = localFont({
  src: [
    {
      path: './fonts/Geeeki-Regular.ttf',
      weight: '700',
      style: 'normal',
    }, 
  ],
  variable: '--font-general'
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
    return <main className={`${generalsans.variable} ${gayathri.variable}`}>
    <Component {...pageProps} /> 
    </main>
  }


  return <main className={`${generalsans.variable} ${gayathri.variable}`}>
    <Layout>
    <Component {...pageProps} /> 
    </Layout>
  </main>
}
