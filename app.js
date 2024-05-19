

document.getElementById("btn").addEventListener('click', () => {
    const user = document.getElementById("userInput").value
    console.log(user)
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${user}`)
        .then(res => res.json())
        .then(data => showPlayer(data.player))
        .catch(error => console.error(error))

})

const showPlayer = (players) => {
    console.log(players)

    
    let data = '';

    players.forEach(p => {

        data += `
        <div class="col-md-4 mt-3 ">
        <div class="card " style="width: 18rem;">
          <img src="${p.strCutout || 'https://via.placeholder.com/150'}" class="card-img-top" alt="Placeholder image">
         <div class="card-body">
          <a href="${p.strTwitter}"><i class="fa-brands fa-twitter"></i></a>
          <a href="${p.strYoutube}"><i class="fa-brands fa-youtube"></i></a>
          <h5 class="card-title">Description</h5>
         <p class="card-text fw-bold">${p.strDescriptionEN.slice(0,50)}</p>
         </div>
          <ul class="list-group list-group-flush fw-bold">
            <li class="list-group-item">Name: ${p.strPlayer}</li>
            <li class="list-group-item">Nationality: ${p.strNationality}</li>
            <li class="list-group-item">Wage: ${p.strWage}</li>
            <li class="list-group-item">Team: ${p.strTeam}</li>
            <li class="list-group-item">Sport: ${p.strSport}</li>
           <li class="list-group-item"> Gender: ${p.strGender}</li>
          
          </ul>
             <div class="card-body">
             <button type="button" class="btn btn-primary btn-sm" onclick="handleAddToTeam('${p.strPlayer}')">Add to group</button>
             <button type="button" class="btn btn-secondary btn-sm" onclick="singleId(${p.idPlayer})">Details</button>
            </div>
          </div>
          </div>
        `
        appendData.innerHTML = data;
        

    })


}


const singleId = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.players[0]))
        .catch(error => console.error(error))


}

const showDetails = (data) => {

    const modalBody = document.getElementById("modal-body")
    const div = document.createElement("div")
    modalBody.innerHTML = '';

    div.innerHTML = `
    <p>Name: ${data.strPlayer}</p>
    <p>Nationality: ${data.strNationality}</p>
    <p>Team: ${data.strTeam}</p>
    <p>Sport: ${data.strSport}</p>
    <p>Wage: ${data.strWage}</p>
    <p>Gender: ${data.strGender}</p>
    <p>Description: ${data.strDescriptionEN.slice(0, 400)}</p>
    `
    modalBody.appendChild(div)
    const playerModal = new bootstrap.Modal(document.getElementById('modal'));
    playerModal.show();


}

const handleAddToTeam = (name) => {
    const cartCount = document.getElementById('count').innerText
    let convertedCount = parseFloat(cartCount)
    convertedCount += 1
    if (document.getElementById('count').innerText >= 10 ){
        alert("More than 11 member is not applicable");
    }
    else{
        document.getElementById('count').innerText = convertedCount;

    }

    const container = document.getElementById("cart-main-container")

    const div = document.createElement("div")
    div.classList.add('carttd')

    div.innerHTML = `
    <h5 class="name">${name}</h5>
    `
    container.appendChild(div)
    document.getElementById("total").innerHTML = convertedCount 
    

}



























