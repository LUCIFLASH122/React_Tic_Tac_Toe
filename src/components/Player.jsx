import { useState } from "react";
export default function Player({ name, symbol, isactive, onChangeName }) {
  const [newname, Setnewname] = useState(name);
  const [edit, Setedit] = useState(false);
  function handleClick() {
    Setedit((edit) => !edit);
    if (edit) {
      onChangeName(symbol, newname);
    }
  }
  function handlechange(evant) {
    Setnewname(event.target.value);
  }
  let playerName = <span className="player-name">{newname}</span>;
  if (edit) {
    playerName = (
      <input type="text" required value={newname} onChange={handlechange} />
    );
  }
  return (
    <li className={isactive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{edit ? <p>save</p> : <p>edit</p>}</button>
    </li>
  );
}
