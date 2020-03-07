document.querySelector('#button').addEventListener('click', getRoster);

document.querySelector('#getText').addEventListener('keyup', event => {
  if(event.key === 'Enter') {
    getRoster();
  }
})

function getRoster(){

  const playerList = document.querySelector("#teams");
  playerList.querySelectorAll("li").forEach(el => el.parentNode.removeChild(el))

  const teamInitials = document.querySelector('#getText').value;

  fetch(`https://nba-players.herokuapp.com/players-stats-teams/${teamInitials}`)
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {

        console.log(response)
        for (let i = 0; i < response.length; i++){
          const playerName = document.createElement('p');
          const teamName = document.createElement('p');
          const playerImage = document.createElement('img');
          playerName.textContent = `Player: ${response[i].name}`;
          teamName.textContent = `Team: ${response[i].team_name}`;
          const firstName = response[i].name.split(' ')[0].toLowerCase();
          const lastName = response[i].name.split(' ')[1].toLowerCase();
          playerImage.src = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
          const teamPlayer = document.createElement('li');
          teamPlayer.appendChild(playerImage);
          teamPlayer.appendChild(playerName);
          teamPlayer.appendChild(teamName);
          playerList.appendChild(teamPlayer);

          const gamesPlayed = response[i].games_played;
          fetch(`https://api.adviceslip.com/advice/${gamesPlayed}`)
          .then(NbaQuotes => NbaQuotes.json())
          .then(quotes => {
            // console.log(pets)
            const quote = document.createElement('p')
            // if ()
            quote.textContent = `Quote: ${quotes.slip.advice}`;

            teamPlayer.appendChild(quote)

          })
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
          alert("sorry, there are no results for your search")
      });
}
