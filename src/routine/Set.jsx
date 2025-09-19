import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
export default function Set({ set }) {
  const {
    mutate: deleter,
    loading,
    error,
  } = useMutation("DELETE", "/sets/" + set.id, ["routines", "activities"]);
  const deleteSet = () => {
    deleter();
  };
  const { token } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <li>
      <h2>
        {set.name} X {set.count}
      </h2>
      {token && <button onClick={deleteSet}>Delete set</button>}
      {error && <output>{error}</output>}
    </li>
  );
}
