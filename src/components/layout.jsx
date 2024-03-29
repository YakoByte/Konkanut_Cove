import Navbar from "./navbar"
import { buttonList } from '../constants/navbar'
import LocationPanel from "./location-panel"
import Footer from "./footer"
import Header from "./navbar"


function Layout({children,top}) {
  return (
    <main className="w-full">
        <div className="fixed inset-0 z-50 h-min">
            <Header buttonList={buttonList}/>
        </div>
        <div className="flex flex-col">
          {children}
          <Footer top={top}/>
        </div>
    </main>
  )
}

export default Layout