import React from "react";
import GlobalHeader from "./organisms/global-header";

const Layout:React.FC = (props) => {
	
    return(
    	<>
	    	<GlobalHeader />
	    	<div className="main-container">{props.children}</div>
	    </>
    );

}

export default Layout;