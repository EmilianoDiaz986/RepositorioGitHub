document.addEventListener('DOMContentLoaded', () => {
  const getCharactersBtn = document.getElementById('getCharactersBtn');
  const charactersContainer = document.getElementById('charactersContainer');
  
  getCharactersBtn.addEventListener('click', () => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        showCharacters(data.results, charactersContainer);
      })
      .catch(error => {
        showError('Error retrieving characters.', charactersContainer);
      });
  });

  const filterCharactersBtn = document.getElementById('filterCharactersBtn');
  const filteredCharactersContainer = document.getElementById('filteredCharactersContainer');

  filterCharactersBtn.addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    const status = document.getElementById('statusInput').value;
    const species = document.getElementById('speciesInput').value;
    const type = document.getElementById('typeInput').value;
    const gender = document.getElementById('genderInput').value;

    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);
    if (status) queryParams.append('status', status);
    if (species) queryParams.append('species', species);
    if (type) queryParams.append('type', type);
    if (gender) queryParams.append('gender', gender);

    fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => {
        showCharacters(data.results, filteredCharactersContainer);
      })
      .catch(error => {
        showError('Error filtering characters.', filteredCharactersContainer);
      });
  });

  function showCharacters(characters, container) {
    if (characters.length === 0) {
      container.innerHTML = '<p>No characters found.</p>';
      return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Status', 'Species', 'Type', 'Gender'];

    headers.forEach(headerText => {
      const header = document.createElement('th');
      header.textContent = headerText;
      headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    characters.forEach(character => {
      const row = document.createElement('tr');
      const { name, status, species, type, gender } = character;

      const nameCell = document.createElement('td');
      nameCell.textContent = name;
      row.appendChild(nameCell);

      const statusCell = document.createElement('td');
      statusCell.textContent = status;
      row.appendChild(statusCell);

      const speciesCell = document.createElement('td');
      speciesCell.textContent = species;
      row.appendChild(speciesCell);

      const typeCell = document.createElement('td');
      typeCell.textContent = type;
      row.appendChild(typeCell);

      const genderCell = document.createElement('td');
      genderCell.textContent = gender;
      row.appendChild(genderCell);

      table.appendChild(row);
    });

    container.innerHTML = '';
    container.appendChild(table);
  }

  function showError(message, container) {
    container.innerHTML = `<p>${message}</p>`;
  }
});
