import useMutation from "../api/useMutation";
export default function RoutineForm() {
  const {
    mutate: adder,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);

  const addRoutine = (formData) => {
    const name = formData.get("name");
    const goal = formData.get("goal");
    adder({ name, goal });
  };

  return (
    <>
      <h2>Add a new Routine</h2>
      <form action={addRoutine}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Goal
          <input type="text" name="goal" />
        </label>
        <button>{loading ? "Adding..." : "add routine"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
