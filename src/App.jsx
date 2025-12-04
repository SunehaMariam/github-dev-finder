 import { useState } from "react";
import "./App.css"
function App(){
 const [username, setUsername] = useState('');
const [user, setUser] = useState(null);

  function Users() {
  if (!username) return;

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => setUser(data))
    .catch(() => setUser("error"));
}



  return(
<div className="container">
<h1>GITHUB DEV FINDER</h1>
<input type="text"  className='tag' placeholder='Enter your github profile' value={username}
onChange={e => setUsername(e.target.value)}/>
<button className='tag' onClick={Users}>Click here</button>
<div>
{user === 'error' && <p>User not found or error fetching data.</p>}
        {user && user !== 'error' && (
          <div className="profile">
            <img src={user.avatar_url} alt={user.login} width="100" />
          {/* <h2>{user.name || 'No Name'}</h2> */}
<p>{user.bio}</p>
            <p>Followers: {user.followers} | Following: {user.following}</p>
            <p>Public Repositories: {user.public_repos}</p>

            <a href={user.html_url} target="_blank">Visit Profile</a>
</div>
)}
</div>
</div>
  );
}
export default App;
