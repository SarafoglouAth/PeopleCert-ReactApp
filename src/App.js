import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Questions from './Questions/Questions';
//import ProductShowcase from './Products/ProductShowcase'
        
export default function MyApp({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            {/* <ProductShowcase  /> */}
            <Questions {...pageProps}/>
        </PrimeReactProvider>
    );
}