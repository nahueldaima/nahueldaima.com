import Script from 'next/script'
import { CONSENT_STORAGE_KEY } from '@/lib/site'

/**
 * Google Analytics, as nuxt-gtag ran it: consent defaults to granted (wait_for_update 500).
 * New: a stored "denied" choice is applied before the first hit, so Deny sticks across visits.
 */
export function Analytics({ id }: { id?: string }) {
  if (!id)
    return null
  const init = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var denied = false;
try { denied = localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}) === 'denied'; } catch (e) {}
var state = denied ? 'denied' : 'granted';
gtag('consent', 'default', { ad_user_data: state, ad_personalization: state, ad_storage: state, analytics_storage: state, wait_for_update: 500 });
if (denied) window['ga-disable-${id}'] = true;
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});
`
  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">{init}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
    </>
  )
}
