import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import ExamQuestions from './Questions/ExamQuestions';
//import ProductShowcase from './Products/ProductShowcase'
        
export default function MyApp({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            {/* <ProductShowcase  /> */}
            <ExamQuestions {...pageProps}/>
        </PrimeReactProvider>
    );
}