import { Route, Routes } from "react-router-dom";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";
import PersonList from "./components/PersonList";

function Router() {
	return (
			<Routes>
					<Route path="/" element={<PersonList />}></Route>
					<Route path="/add_person" element={<AddPerson />}></Route>
					<Route path="/person" element={<Person />}></Route>
			</Routes>
	);
}

export default Router;