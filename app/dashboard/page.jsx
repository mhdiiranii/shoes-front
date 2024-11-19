import DashboardMine from "./(block)/dashboardMine";
import Filter from "./(block)/filter";
import DashboardHeader from "./(block)/header";

const Dashboard = () => {
    return ( 
        <div className="">
            <Filter/>
            <div className="flex gap-3 justify-center md:justify-end items-end w-full">
                <DashboardMine/>
            </div>
        </div>
     );
}
 
export default Dashboard;