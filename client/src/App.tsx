import { useEffect } from 'react';
import './App.css'

function App() {
	const data = async (): Promise<object> => {
    const input: string = encodeURIComponent('first try');
		const response: Response = await fetch(
		`http://localhost:3000/boards/get-board/${input}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log('res111: ', response);
		const data: object = await response.json();
		console.log('data: ', data);
		return data;		
	}

	useEffect(() => {
		data();
	}, []);

  return (
    <>
     <h2>Hello</h2>
    </>
  )
}

export default App
