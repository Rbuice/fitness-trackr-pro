import { useAuth } from "../auth/AuthContext";
import RoutineList from "./RoutineList";
import RoutineForm from "./RoutineForm";

export default function RoutinePage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {token && <RoutineForm />}
    </>
  );
}
