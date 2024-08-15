// components/GoogleAnalytics.tsx
import Script from 'next/script';

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${ga_id}');
      `}
    </Script>
  </>
);

export default GoogleAnalytics;
