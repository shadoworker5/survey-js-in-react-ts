import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import SurveyrBuilder from './survey/builder.tsx';
import CreateForm from './survey/surveyJson.tsx';
import ShowData from './pages/show_data.tsx';
import Home from './pages/home.tsx';

const App: React.FC = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/survey_builder" element={<SurveyrBuilder />} />
				<Route path="/form_example" element={<CreateForm />} />
				<Route path="/show_data" element={<ShowData />} />
			</Routes>
		</Router>
	);
}
export default App;