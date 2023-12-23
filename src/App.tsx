import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '@/components/mainPage/mainPage';
import StepOne from '@/components/steps/stepOne';
import StepTwo from '@/components/steps/stepTwo';
import StepThree from '@/components/steps/stepThree';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/step-one" element={<StepOne />} />
          <Route path="/step-two" element={<StepTwo />} />
          <Route path="/step-three" element={<StepThree />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
