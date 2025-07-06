const urlParams = new URLSearchParams(window.location.search);
const pathwayName = urlParams.get('name');
const pathwayTitle = document.getElementById('pathwayTitle');
const seqList = document.getElementById('sequenceList');

pathwayTitle.textContent = pathwayName + " Pathway";

fetch('pathways.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const seqs = data[pathwayName];
    if (seqs) {
      seqs.forEach(s => {
        const item = document.createElement('div');
        item.className = 'sequence-item';
        item.innerHTML = `<span class="seq-title">Sequence ${s.seq}: ${s.name}</span>
          <div class="tooltip">${s.desc}</div>`;
        seqList.appendChild(item);
      });
    } else {
      seqList.innerHTML = `<p>Pathway data not found.</p>`;
    }
  })
  .catch(err => {
    seqList.innerHTML = `<p>Error loading pathway data: ${err.message}</p>`;
  });
