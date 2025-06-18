import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import Filter from '../components/JobFilter';



export default function Dashboard() {
  
  

  return (
   <>
   <Header/>
   {/* <Filter onFilter={(filters) => console.log(filters)}/> */}
   <Outlet/>
   <Footer/>
   </>
  );
}
