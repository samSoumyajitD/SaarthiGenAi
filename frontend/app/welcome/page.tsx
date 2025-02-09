"use client";
import { withAuth } from "../../components/hoc/withAuth";
import StuNavBar from "../../components/CommonComponents/WelcomePageNav";
import { AuroraBackgroundDemo } from "../../components/CommonComponents/WelcomePage";

const Welcome = () => {
  return (
    <div>
      <StuNavBar />
      <AuroraBackgroundDemo />
    </div>
  );
};

// Pass an array of allowed roles
export default withAuth(Welcome, ["Student", "Working Professional"]);
