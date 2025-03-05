import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import  './styles/index.scss';
import { Provider } from 'react-redux';
import store from './store';
import { TourProvider } from '@reactour/tour';


const root = ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
);

export const steps = [
	{
		selector: '.user-code',
		content: 'You have code which you can give to your friend or you can get a code from your friend'
	},
	{
		selector: '.chat__flex-new',
		content: 'This button is responsible for creating chat with your friend. Press it to see next instructions'
	}
]

root.render(
	<Provider store={store}>
		<TourProvider steps={steps}>
					<App />
		</TourProvider>
	</Provider>
);





