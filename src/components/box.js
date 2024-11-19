import React, { useState } from "react";

function Box({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setOpen((open) => !open)}>
        {open ? "-" : "+"}
      </button>
      {open && children}
    </div>
  );
}

export default Box;
