import React from "react";

const Episode: React.FC = ({
  id,
  episode,
  name,
  air_date,
}: any) => {
  return (
    <div key={id}>
      <h5>{episode}: {name} ({air_date})</h5>
    </div>
  );
};

export default Episode;
