import { Form } from "./components/Form";
import paidyLogo from './assets/images/paidy-logo.svg'
import backIcon from './assets/images/back-icon.svg'
import closeIcon from './assets/images/close-icon.svg'
import './styles/app.scss';

export const App = () => {
  return (
    <div className='app'>
      <div className='modal-container'>
        <div className='modal'>
          <header className='header'>
            <nav className='navigation'>
              <button>
                <img src={backIcon} alt="Go Back" />
              </button>
              <img src={paidyLogo} alt='Paidy logo' />
              <button>
                <img src={closeIcon} alt='Close' />
              </button>
            </nav>
            <div className='info'>
              <h1 className='info-heading'>
                ラルフ ローレン松武オンラインストア
              </h1>
              <h2 className='info-price'>
                ¥15,400
              </h2>
            </div>
          </header>
          <main className='main'>
            <Form />
          </main>
          <footer className='footer'>
            <a href="/help" target='_blank' rel='noopener noreferrer' className='footer-link'>
              ヘルプ
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
