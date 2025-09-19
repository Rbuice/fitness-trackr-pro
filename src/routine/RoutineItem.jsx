import { Link, useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import Set from "./Set";
export default function RoutineItem() {
  let { routineid } = useParams();
  const { data: routines, loading: loadrout } = useQuery(
    "/routines",
    "routines"
  );
  const { data: activities, loading: loadact } = useQuery(
    "/activities",
    "activities"
  );

  const {
    mutate: deleteRoutine,
    loading,
    error,
  } = useMutation("DELETE", "/routines/" + routineid, ["routines"]);
  const { token } = useAuth();
  let navi = useNavigate();
  const deletion = () => {
    deleteRoutine();
    navi("/routines");
  };
  const { mutate: add, loading: loadset } = useMutation("POST", "/sets", [
    "routines",
    "activities",
  ]);
  const addSet = (formdata) => {
    const activityId = formdata.get("activity");
    const routineId = routineid;
    const count = formdata.get("count");
    add({ activityId, routineId, count });
  };

  if (loading || loadrout || loadset || loadact || !routines)
    return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  let routine = [];
  routines.map((routin) => {
    if (routin.id === parseInt(routineid)) {
      routine = routin;
    }
  });
  const setlist = routine.sets;
  if (setlist.length === 0) {
    return (
      <div>
        <section>
          <Link to="/routines">Back to all routines</Link>
          <h1>{routine.name}</h1>
          <h2>by {routine.creatorName}</h2>
          {token && (
            <button onClick={deletion}>
              {loading ? "Deleting" : error ? error : "Delete"}
            </button>
          )}
          <h3>Add some sets</h3>
        </section>
        {token && (
          <form action={addSet}>
            Add a Set
            <label>
              Activity
              <select name="activity">
                {activities.map((activity) => {
                  return (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Count
              <input type="number" name="count" />
            </label>
            <button>Add Set</button>
            {error && <output>{error}</output>}
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <section>
          <Link to="/routines">Back to all routines</Link>
          <h1>{routine.name}</h1>
          <h2>by {routine.creatorName}</h2>
          {token && (
            <button onClick={deletion}>
              {loading ? "Deleting" : error ? error : "Delete"}
            </button>
          )}
          <ul>
            Sets
            {setlist.map((set) => {
              return <Set key={set.id} set={set} />;
            })}
          </ul>
        </section>
        {token && (
          <form action={addSet}>
            Add a Set
            <label>
              Activity
              <select name="activity">
                {activities.map((activity) => {
                  return (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Count
              <input type="number" name="count" />
            </label>
            <button>Add Set</button>
            {error && <output>{error}</output>}
          </form>
        )}
      </div>
    );
  }
}
