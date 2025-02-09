"use client";
import { withAuth } from "../../../../components/hoc/withAuth";
import GoalQuiz from "../../../../components/CommonComponents/Quiz/GoalQuiz"
const profile = () => {
  return (
    <div>
     <GoalQuiz/>
    </div>
  );
};

// Pass an array of allowed roles
export default withAuth(profile, ["Student", "Working Professional"]);
