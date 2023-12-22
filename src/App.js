import Exams from './Exams/Exams';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Questions from './Questions/Questions';
        
export default function MyApp({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Questions {...pageProps} />
        </PrimeReactProvider>
    );
}