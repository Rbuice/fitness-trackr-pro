import { Link, useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function ActivityItem() {
  let { activityid } = useParams();
  const { data: activity } = useQuery(
    "/activities/" + activityid,
    "activities"
  );
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + activityid, ["activities"]);
  const { token } = useAuth();
  let navi = useNavigate();
  const deletion = () => {
    deleteActivity();
    navi("/activities");
  };
  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  return (
    <div>
      <section>
        <Link to="/activities">Back to all activities</Link>
        <h1>{activity.name}</h1>
        <h1>{activity.description}</h1>
        <h1>{activity.creatorName}</h1>
        {token && (
          <button onClick={() => deletion()}>
            {loading ? "Deleting" : error ? error : "Delete"}
          </button>
        )}
      </section>
    </div>
  );
}
