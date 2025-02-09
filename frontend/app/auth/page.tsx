"use client";
import AuthPageNavbar from "../../components/AuthPageComponents/AuthPageNavBar"
import  AuthPage from "../../components/AuthPageComponents/AuthPage"

export default function Auth(){
    return <div>

<AuthPageNavbar/>
<div className="bg-white dark:bg-gray-900 h-[90vh] p-6">
<AuthPage/>
</div>

    </div>;
}