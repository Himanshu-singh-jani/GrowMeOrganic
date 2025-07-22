import React from "react";

interface Props {
  value: number | "";
  onChange: (val: number | "") => void;
  onSubmit: () => void;
}

const TitleFilter: React.FC<Props> = ({ value, onChange, onSubmit }) => (
  <div className="absolute bg-white border rounded shadow-md p-2 mt-1 z-10 w-56">
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : "")}
      className="border p-1 rounded mb-2 w-full"
      placeholder="Enter number"
      min={1}
    />
    <button
      className="border px-4 py-1 rounded w-full bg-gray-100 hover:bg-gray-200"
      onClick={onSubmit}
    >
      Submit
    </button>
  </div>
);

export default TitleFilter;
